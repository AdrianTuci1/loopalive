import { useState, useEffect, useRef } from 'react';

const useBehringerRd6 = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState(Array(16).fill(false));
  const [params, setParams] = useState({
    tempo: 0.5,
    swing: 0.5,
    accent: 0.5,
    volume: 0.5,
    bassDrum: 0.5,
    snareDrum: 0.5,
    lowTom: 0.5,
    cymbal: 0.5,
    hiHat: 0.5,
    distortion: false,
    tone: 0.5,
    level: 0.5,
    mode: 'pattern',
    select: false,
    track: 0.5,
    measure: 1
  });

  const audioContextRef = useRef(null);
  const stepIntervalRef = useRef(null);
  const masterGainRef = useRef(null);

  // Initialize audio context
  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    masterGainRef.current = audioContextRef.current.createGain();
    masterGainRef.current.connect(audioContextRef.current.destination);
    masterGainRef.current.gain.value = params.volume;

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Update master volume when volume param changes
  useEffect(() => {
    if (masterGainRef.current) {
      masterGainRef.current.gain.value = params.volume;
    }
  }, [params.volume]);

  // Handle play/stop
  useEffect(() => {
    if (isPlaying) {
      const bpm = 60 + (params.tempo * 180); // Map tempo to 60-240 BPM
      const stepDuration = (60 / bpm) * 4; // Duration of one step in seconds
      
      stepIntervalRef.current = setInterval(() => {
        setCurrentStep(prev => {
          const nextStep = (prev + 1) % 16;
          if (steps[nextStep]) {
            playDrumSound(nextStep);
          }
          return nextStep;
        });
      }, stepDuration * 1000);
    } else {
      clearInterval(stepIntervalRef.current);
      setCurrentStep(0);
    }

    return () => {
      clearInterval(stepIntervalRef.current);
    };
  }, [isPlaying, params.tempo, steps]);

  const playDrumSound = (step) => {
    if (!audioContextRef.current) return;

    const oscillator = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();
    
    // Connect nodes
    oscillator.connect(gainNode);
    gainNode.connect(masterGainRef.current);

    // Set drum sound parameters based on step
    switch (step % 6) {
      case 0: // Bass drum
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(60, audioContextRef.current.currentTime);
        gainNode.gain.setValueAtTime(params.bassDrum, audioContextRef.current.currentTime);
        break;
      case 1: // Snare
        oscillator.type = 'noise';
        gainNode.gain.setValueAtTime(params.snareDrum, audioContextRef.current.currentTime);
        break;
      case 2: // Low tom
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(100, audioContextRef.current.currentTime);
        gainNode.gain.setValueAtTime(params.lowTom, audioContextRef.current.currentTime);
        break;
      case 3: // Cymbal
        oscillator.type = 'noise';
        gainNode.gain.setValueAtTime(params.cymbal, audioContextRef.current.currentTime);
        break;
      case 4: // Hi-hat
        oscillator.type = 'noise';
        gainNode.gain.setValueAtTime(params.hiHat, audioContextRef.current.currentTime);
        break;
      case 5: // Clap
        oscillator.type = 'noise';
        gainNode.gain.setValueAtTime(params.cymbal, audioContextRef.current.currentTime);
        break;
    }

    // Apply distortion if enabled
    if (params.distortion) {
      const distortion = audioContextRef.current.createWaveShaper();
      distortion.curve = makeDistortionCurve(params.tone * 100);
      gainNode.connect(distortion);
      distortion.connect(masterGainRef.current);
    }

    // Start and stop the sound
    oscillator.start();
    oscillator.stop(audioContextRef.current.currentTime + 0.1);
  };

  const makeDistortionCurve = (amount) => {
    const samples = 44100;
    const curve = new Float32Array(samples);
    for (let i = 0; i < samples; i++) {
      const x = (i * 2) / samples - 1;
      curve[i] = (Math.PI + amount) * x / (Math.PI + amount * Math.abs(x));
    }
    return curve;
  };

  const handleStepClick = (index) => {
    setSteps(prev => {
      const newSteps = [...prev];
      newSteps[index] = !newSteps[index];
      return newSteps;
    });
  };

  const handleKnobChange = (param, value) => {
    setParams(prev => ({
      ...prev,
      [param]: value
    }));
  };

  const togglePlay = () => {
    setIsPlaying(prev => !prev);
  };

  const clearSteps = () => {
    setSteps(Array(16).fill(false));
  };

  return {
    isPlaying,
    currentStep,
    steps,
    params,
    handleStepClick,
    handleKnobChange,
    togglePlay,
    clearSteps
  };
};

export default useBehringerRd6; 