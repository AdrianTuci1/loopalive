import React, { useState } from 'react';
import './StepSequencer.css';
import { StepButton } from './common/Buttons';

const StepSequencer = ({ steps, onStepClick, onTopButtonClick }) => {
  const [pressedButtons, setPressedButtons] = useState(Array(16).fill(false));

  const handleStepClick = (index) => {
    onStepClick(index);
  };

  const handleStepPress = (index) => {
    setPressedButtons(prev => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });
  };

  const handleStepRelease = (index) => {
    setPressedButtons(prev => {
      const newState = [...prev];
      newState[index] = false;
      return newState;
    });
  };

  return (
    <div className="step-sequencer">
      <div className="step-grid">
        {steps.map((isActive, i) => (
          <div key={i} className="step-column">
            <div className="led-slot">
              <div className={`led-button ${isActive ? 'active' : ''}`} />
            </div>
            <div className="button-slot">
              <StepButton
                isActive={isActive}
                isPressed={pressedButtons[i]}
                onClick={() => handleStepClick(i)}
                onMouseDown={() => handleStepPress(i)}
                onMouseUp={() => handleStepRelease(i)}
                onMouseLeave={() => handleStepRelease(i)}
              />
            </div>
            <div className="number-slot">
              <span className="step-number">{i + 1}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepSequencer; 