import { useState, useEffect } from 'react';
import * as Tone from 'tone';

const useTd3Synth = () => {
  const [synth, setSynth] = useState(null);
  const [lfo, setLfo] = useState(null);
  const [params, setParams] = useState({
    tune: 50,
    cutoff: 50,
    resonance: 50,
    envMod: 50,
    decay: 50,
    accent: 50,
    lfoRate: 50,
    lfoDelay: 50,
    lfoWave: 50,
    write: false,
    track: false,
    pattern: false
  });

  useEffect(() => {
    // Initialize Tone.js synth and LFO
    const newLfo = new Tone.LFO({
      frequency: 5,
      min: 400,
      max: 4000,
      type: 'sine'
    }).start();

    const newSynth = new Tone.MonoSynth({
      oscillator: {
        type: 'sawtooth'
      },
      envelope: {
        attack: 0.01,
        decay: 0.2,
        sustain: 0.2,
        release: 0.1
      },
      filter: {
        frequency: 1000,
        Q: 1
      }
    }).toDestination();

    // Connect LFO to filter frequency
    newLfo.connect(newSynth.filter.frequency);

    setLfo(newLfo);
    setSynth(newSynth);

    return () => {
      newSynth.dispose();
      newLfo.dispose();
    };
  }, []);

  const handleKnobChange = (param, value) => {
    setParams(prev => {
      const newParams = { ...prev, [param]: value };
      
      if (synth && lfo) {
        switch(param) {
          case 'tune':
            // Map 0-100 to -12 to +12 semitones
            const semitones = (value - 50) * 24 / 50;
            synth.oscillator.frequency.value = 440 * Math.pow(2, semitones / 12);
            break;
          case 'cutoff':
            // Map 0-100 to 20Hz-20kHz (logarithmic)
            const cutoffFreq = 20 * Math.pow(1000, value / 100);
            synth.filter.frequency.value = cutoffFreq;
            lfo.min = cutoffFreq * 0.5;
            lfo.max = cutoffFreq * 2;
            break;
          case 'resonance':
            // Map 0-100 to Q 0-20
            synth.filter.Q.value = value * 0.2;
            break;
          case 'envMod':
            // Map 0-100 to envelope modulation amount
            synth.envelope.attack = 0.01 + (value / 100) * 0.5;
            break;
          case 'decay':
            // Map 0-100 to decay time 0-2s
            synth.envelope.decay = value * 0.02;
            break;
          case 'accent':
            // Map 0-100 to velocity 0.5-1.5
            synth.volume.value = Tone.gainToDb(value * 0.01 + 0.5);
            break;
          case 'lfoRate':
            // Map 0-100 to LFO rate 0.1-20Hz
            lfo.frequency.value = 0.1 * Math.pow(200, value / 100);
            break;
          case 'lfoDelay':
            // Map 0-100 to LFO delay 0-2s
            lfo.delayTime = value * 0.02;
            break;
          case 'lfoWave':
            // Map 0-100 to LFO wave type (sine, triangle, square)
            const waveTypes = ['sine', 'triangle', 'square'];
            const waveIndex = Math.floor((value / 100) * waveTypes.length);
            lfo.type = waveTypes[Math.min(waveIndex, waveTypes.length - 1)];
            break;
        }
      }
      
      return newParams;
    });
  };

  const handleSwitchChange = (param, value) => {
    setParams(prev => ({ ...prev, [param]: value }));
  };

  const playNote = () => {
    if (synth) {
      synth.triggerAttackRelease('C4', '8n');
    }
  };

  return {
    params,
    handleKnobChange,
    handleSwitchChange,
    playNote
  };
};

export default useTd3Synth; 