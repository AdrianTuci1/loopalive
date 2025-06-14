import { useState, useEffect, useRef } from 'react';
import { createDrumSounds } from './sounds/drumSounds';
import { stepSequencerState } from './StepSequencerState';

// Groovebox control logic
const useBehringerRd6 = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const currentStepRef = useRef(0);
  const [selectedTrack, setSelectedTrack] = useState(1);
  const [tempo, setTempo] = useState(120);
  const [swing, setSwing] = useState(0);
  const [accent, setAccent] = useState(0);
  const [volume, setVolume] = useState(0.7);

  const audioContextRef = useRef(null);
  const stepIntervalRef = useRef(null);
  const masterGainRef = useRef(null);
  const nextStepTimeRef = useRef(0);
  const isPlayingRef = useRef(false);
  const drumSoundsRef = useRef(null);

  // Initialize audio context and drum sounds
  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    masterGainRef.current = audioContextRef.current.createGain();
    masterGainRef.current.connect(audioContextRef.current.destination);
    masterGainRef.current.gain.value = volume;

    drumSoundsRef.current = createDrumSounds(audioContextRef.current);

    // Initialize step sequencer state
    stepSequencerState.setSelectedTrack(1);
    stepSequencerState.updateActiveLEDs();

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Update master volume
  useEffect(() => {
    if (masterGainRef.current) {
      masterGainRef.current.gain.value = volume;
    }
  }, [volume]);

  // Play drum sound with accent
  const playDrumSound = (drumType, now) => {
    if (!audioContextRef.current || !drumSoundsRef.current) return;

    const accentAmount = accent * 1.5;
    const accentGain = audioContextRef.current.createGain();
    accentGain.gain.value = 1;
    accentGain.gain.setTargetAtTime(1 + accentAmount, now, 0.01);
    accentGain.gain.setTargetAtTime(1, now + 0.1, 0.01);
    accentGain.connect(masterGainRef.current);

    let output;
    switch (drumType) {
      case 'kick':
        output = drumSoundsRef.current.create808Kick(now);
        break;
      case 'snare':
        output = drumSoundsRef.current.create808Snare(now);
        break;
      case 'bass':
        output = drumSoundsRef.current.create808Bass(now);
        break;
      case 'clap':
        output = drumSoundsRef.current.create808Clap(now);
        break;
      case 'hihat':
        output = drumSoundsRef.current.create808HiHat(now);
        break;
    }

    if (output) {
      output.connect(accentGain);
    }
  };

  // Handle play/stop with improved timing
  useEffect(() => {
    isPlayingRef.current = isPlaying;
    stepSequencerState.setPlaying(isPlaying);

    if (isPlaying) {
      const scheduleNextStep = () => {
        if (!isPlayingRef.current) return;

        const ctx = audioContextRef.current;
        const now = ctx.currentTime;
        const bpm = 40 + (tempo * 120);
        const baseStepDuration = (60 / bpm) * 4;

        const swingAmount = swing * 0.3;
        const isEvenStep = currentStepRef.current % 2 === 0;
        const stepDuration = baseStepDuration * (1 + (isEvenStep ? swingAmount : -swingAmount));

        nextStepTimeRef.current = Math.max(now, nextStepTimeRef.current) + stepDuration;

        // Play all active drums for this step
        const state = stepSequencerState.getState();
        Object.entries(state.steps).forEach(([drumType, drumSteps]) => {
          if (drumSteps[currentStepRef.current]) {
            playDrumSound(drumType, now);
          }
        });

        currentStepRef.current = (currentStepRef.current + 1) % 16;
        setCurrentStep(currentStepRef.current);
        stepSequencerState.setCurrentStep(currentStepRef.current);
        stepSequencerState.updateActiveLEDs();

        const timeUntilNext = (nextStepTimeRef.current - now) * 1000;
        stepIntervalRef.current = setTimeout(scheduleNextStep, timeUntilNext);
      };

      nextStepTimeRef.current = audioContextRef.current.currentTime;
      scheduleNextStep();
    } else {
      clearTimeout(stepIntervalRef.current);
      currentStepRef.current = 0;
      setCurrentStep(0);
      nextStepTimeRef.current = 0;
      stepSequencerState.setCurrentStep(0);
      stepSequencerState.updateActiveLEDs();
    }

    return () => {
      clearTimeout(stepIntervalRef.current);
    };
  }, [isPlaying, tempo, swing]);

  const handleStepClick = (stepIndex, track) => {
    stepSequencerState.toggleStep(stepIndex, track);
  };

  const handleKnobChange = (param, value) => {
    switch(param) {
      case 'tempo':
        setTempo(value);
        break;
      case 'swing':
        setSwing(value);
        break;
      case 'accent':
        setAccent(value);
        break;
      case 'volume':
        setVolume(value);
        break;
      case 'track':
        // Convert value to integer track number (1-5)
        const trackNumber = Math.round(value * 4) + 1;
        setSelectedTrack(trackNumber);
        stepSequencerState.setSelectedTrack(trackNumber);
        stepSequencerState.updateActiveLEDs();
        break;
      case 'bassDrum':
      case 'snareDrum':
      case 'lowTom':
      case 'cymbal':
      case 'hiHat':
      case 'distortion':
      case 'tone':
      case 'level':
      case 'measure':
      case 'mode':
      case 'select':
        // These parameters are handled by the params object
        break;
    }
  };

  const togglePlay = () => {
    setIsPlaying(prev => !prev);
  };

  const clearSteps = () => {
    const state = stepSequencerState.getState();
    Object.keys(state.steps).forEach(track => {
      state.steps[track] = Array(16).fill(false);
    });
    stepSequencerState.notify();
  };

  return {
    isPlaying,
    currentStep,
    selectedTrack,
    setSelectedTrack,
    steps: stepSequencerState.getState().steps,
    params: {
      accent,
      bassDrum: 0.5,
      snareDrum: 0.5,
      lowTom: 0.5,
      cymbal: 0.5,
      hiHat: 0.5,
      distortion: 0,
      tone: 0.5,
      level: 0.5,
      volume,
      measure: 1,
      tempo,
      mode: 'pattern',
      select: false,
      track: selectedTrack
    },
    handleStepClick,
    handleKnobChange,
    togglePlay,
    clearSteps
  };
};

export default useBehringerRd6; 