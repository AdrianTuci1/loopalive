import { useState, useEffect } from 'react';
import * as Tone from 'tone';

const useBossDd8 = () => {
  const [delay, setDelay] = useState(null);
  const [params, setParams] = useState({
    time: 0.5,      // Delay time
    feedback: 0.5,  // Feedback amount
    level: 0.5,     // Effect level
    mode: 'standard' // Delay mode
  });

  useEffect(() => {
    // Initialize Tone.js delay
    const newDelay = new Tone.FeedbackDelay({
      delayTime: 0.5,
      feedback: 0.5,
      wet: 0.5
    }).toDestination();

    setDelay(newDelay);

    return () => {
      newDelay.dispose();
    };
  }, []);

  const handleKnobChange = (param, value) => {
    setParams(prev => {
      const newParams = { ...prev, [param]: value };
      
      if (delay) {
        switch(param) {
          case 'time':
            delay.delayTime.value = value * 2; // 0-2 seconds range
            break;
          case 'feedback':
            delay.feedback.value = value;
            break;
          case 'level':
            delay.wet.value = value;
            break;
        }
      }
      
      return newParams;
    });
  };

  const handleModeChange = (mode) => {
    setParams(prev => ({ ...prev, mode }));
    // Here you can add specific mode settings if needed
  };

  return {
    params,
    handleKnobChange,
    handleModeChange
  };
};

export default useBossDd8; 