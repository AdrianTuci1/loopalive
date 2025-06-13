import { useState, useEffect } from 'react';
import * as Tone from 'tone';

const useTd3Synth = () => {
  const [synth, setSynth] = useState(null);
  const [params, setParams] = useState({
    tune: 0.5,
    cutoff: 0.5,
    resonance: 0.5,
    envMod: 0.5,
    decay: 0.5,
    accent: 0.5,
    lfoRate: 0.5,
    lfoDelay: 0.5,
    lfoWave: 0.5,
    write: false,
    track: false,
    pattern: false
  });

  useEffect(() => {
    // Initialize Tone.js synth
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

    setSynth(newSynth);

    return () => {
      newSynth.dispose();
    };
  }, []);

  const handleKnobChange = (param, value) => {
    setParams(prev => {
      const newParams = { ...prev, [param]: value };
      
      if (synth) {
        switch(param) {
          case 'tune':
            synth.oscillator.frequency.value = 440 * Math.pow(2, (value - 0.5) * 24);
            break;
          case 'cutoff':
            synth.filter.frequency.value = 20 + Math.pow(value, 2) * 20000;
            break;
          case 'resonance':
            synth.filter.Q.value = value * 20;
            break;
          case 'decay':
            synth.envelope.decay = value * 2;
            break;
          case 'lfoRate':
            synth.lfo.frequency.value = value * 20;
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