import React, { useState } from 'react';
import '../Node.css';
import './BehringerRd6.css';
import Knob from '../common/Knob';

const StepButton = ({ label, isActive, onClick }) => (
  <div 
    className={`rd6-step-button ${isActive ? 'active' : ''}`}
    onClick={onClick}
  >
    {label}
  </div>
);

const FunctionButton = ({ label, isActive, onClick }) => (
  <div 
    className={`rd6-function-button ${isActive ? 'active' : ''}`}
    onClick={onClick}
  >
    {label}
  </div>
);

const BehringerRd6 = () => {
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
    distortion: 0.5,
    mode: 'pattern'
  });

  const [steps, setSteps] = useState(Array(16).fill(false));
  const [isPlaying, setIsPlaying] = useState(false);

  const handleKnobChange = (param, value) => {
    setParams(prev => ({
      ...prev,
      [param]: value
    }));
  };

  const handleStepClick = (index) => {
    setSteps(prev => {
      const newSteps = [...prev];
      newSteps[index] = !newSteps[index];
      return newSteps;
    });
  };

  const handleFunctionClick = (action) => {
    switch(action) {
      case 'startStop':
        setIsPlaying(prev => !prev);
        break;
      case 'clear':
        setSteps(Array(16).fill(false));
        break;
      case 'reset':
        // Implement reset logic
        break;
      // Add other function handlers
    }
  };

  return (
    <div className="node drum-node rd6-mockup">
      <div className="rd6-header">
        <h3>BEHRINGER RD-6</h3>
      </div>
      
      {/* Top row: Knobs */}
      <div className="rd6-controls">
        <div className="rd6-section">
          <Knob 
            label="ACCENT" 
            value={params.accent} 
            onChange={(v) => handleKnobChange('accent', v)}
            steps={10}
            color="#FFD600"
          />
          <Knob 
            label="BASS DRUM" 
            value={params.bassDrum} 
            onChange={(v) => handleKnobChange('bassDrum', v)}
            steps={10}
            color="#FFD600"
          />
          <Knob 
            label="SNARE DRUM" 
            value={params.snareDrum} 
            onChange={(v) => handleKnobChange('snareDrum', v)}
            steps={10}
            color="#FFD600"
          />
          <Knob 
            label="L.H. TOM" 
            value={params.lowTom} 
            onChange={(v) => handleKnobChange('lowTom', v)}
            steps={10}
            color="#FFD600"
          />
          <Knob 
            label="CYMBAL/CLAP" 
            value={params.cymbal} 
            onChange={(v) => handleKnobChange('cymbal', v)}
            steps={10}
            color="#FFD600"
          />
          <Knob 
            label="O.C. HI HAT" 
            value={params.hiHat} 
            onChange={(v) => handleKnobChange('hiHat', v)}
            steps={10}
            color="#FFD600"
          />
        </div>

        {/* Center row: Mode, Smiley, Distortion/Volume */}
        <div className="rd6-center-row">
          <div className="rd6-mode">
            <Knob 
              label="MODE" 
              value={params.mode === 'pattern' ? 0.5 : 0} 
              onChange={(v) => handleKnobChange('mode', v > 0.25 ? 'pattern' : 'write')}
              steps={2}
              color="#FFD600"
            />
          </div>
          <div className="rd6-smiley">
            <svg width="70" height="70" viewBox="0 0 70 70">
              <circle cx="35" cy="35" r="32" fill="#FFD600" stroke="#000" strokeWidth="2"/>
              <circle cx="24" cy="30" r="4" fill="#000"/>
              <circle cx="46" cy="30" r="4" fill="#000"/>
              <path d="M24 46 Q35 56 46 46" stroke="#000" strokeWidth="2.5" fill="none"/>
            </svg>
          </div>
          <div className="rd6-distortion-volume">
            <Knob 
              label="DISTORTION" 
              value={params.distortion} 
              onChange={(v) => handleKnobChange('distortion', v)}
              steps={10}
              color="#FFD600"
            />
            <Knob 
              label="VOLUME" 
              value={params.volume} 
              onChange={(v) => handleKnobChange('volume', v)}
              steps={10}
              color="#FFD600"
            />
          </div>
        </div>

        {/* Step sequencer */}
        <div className="rd6-sequencer">
          <div className="rd6-step-buttons">
            {steps.map((isActive, i) => (
              <StepButton 
                key={i} 
                label={i + 1} 
                isActive={isActive}
                onClick={() => handleStepClick(i)}
              />
            ))}
          </div>
        </div>

        {/* Function buttons */}
        <div className="rd6-function-buttons">
          <FunctionButton 
            label="BAR RESET" 
            onClick={() => handleFunctionClick('reset')}
          />
          <FunctionButton 
            label="CLEAR" 
            onClick={() => handleFunctionClick('clear')}
          />
          <FunctionButton 
            label="START/STOP" 
            isActive={isPlaying}
            onClick={() => handleFunctionClick('startStop')}
          />
          <FunctionButton 
            label="COPY" 
            onClick={() => handleFunctionClick('copy')}
          />
          <FunctionButton 
            label="PASTE" 
            onClick={() => handleFunctionClick('paste')}
          />
          <FunctionButton 
            label="DEL" 
            onClick={() => handleFunctionClick('delete')}
          />
          <FunctionButton 
            label="INS" 
            onClick={() => handleFunctionClick('insert')}
          />
        </div>
      </div>
    </div>
  );
};

export default BehringerRd6; 