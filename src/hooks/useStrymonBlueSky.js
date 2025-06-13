import { useState, useEffect } from 'react';
import * as Tone from 'tone';

const useStrymonBlueSky = () => {
  const [reverb, setReverb] = useState(null);
  const [params, setParams] = useState({
    decay: 0.5,     // Reverb decay time
    mix: 0.5,       // Wet/dry mix
    tone: 0.5,      // Tone control
    mode: 'room',   // Reverb mode (room, hall, spring)
    shimmer: 0,     // Shimmer effect amount
    mod: 0.5        // Modulation amount
  });

  useEffect(() => {
    // Initialize Tone.js reverb
    const newReverb = new Tone.Reverb({
      decay: 2.5,
      wet: 0.5,
      preDelay: 0.01
    }).toDestination();

    setReverb(newReverb);

    return () => {
      newReverb.dispose();
    };
  }, []);

  const handleKnobChange = (param, value) => {
    setParams(prev => {
      const newParams = { ...prev, [param]: value };
      
      if (reverb) {
        switch(param) {
          case 'decay':
            reverb.decay = value * 5; // 0-5 seconds range
            break;
          case 'mix':
            reverb.wet.value = value;
            break;
          case 'tone':
            // Implement tone control using a filter
            break;
          case 'shimmer':
            // Implement shimmer effect
            break;
          case 'mod':
            // Implement modulation
            break;
        }
      }
      
      return newParams;
    });
  };

  const handleModeChange = (mode) => {
    setParams(prev => ({ ...prev, mode }));
    // Here you can add specific mode settings
    if (reverb) {
      switch(mode) {
        case 'room':
          reverb.decay = 1.5;
          break;
        case 'hall':
          reverb.decay = 3.0;
          break;
        case 'spring':
          reverb.decay = 1.0;
          break;
      }
    }
  };

  return {
    params,
    handleKnobChange,
    handleModeChange
  };
};

export default useStrymonBlueSky; 