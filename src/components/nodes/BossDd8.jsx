import React from 'react';
import '../Node.css';
import './BossDd8.css';
import useBossDd8 from '../../hooks/useBossDd8';

const Knob = ({ label, value, onChange }) => (
  <div className="dd8-knob">
    <svg width="40" height="40" viewBox="0 0 40 40">
      <circle cx="20" cy="20" r="18" fill="#2c2c2c" stroke="#666" strokeWidth="2" />
      <rect 
        x="19" 
        y="5" 
        width="2" 
        height="10" 
        rx="1" 
        fill="#666"
        style={{ transform: `rotate(${value * 270}deg)`, transformOrigin: '20px 20px' }}
      />
    </svg>
    <span className="dd8-knob-label">{label}</span>
  </div>
);

const ModeButton = ({ label, isActive, onClick }) => (
  <div 
    className={`dd8-mode-button ${isActive ? 'active' : ''}`}
    onClick={onClick}
  >
    {label}
  </div>
);

const BossDd8 = () => {
  const { params, handleKnobChange, handleModeChange } = useBossDd8();

  return (
    <div className="node effect-node dd8-mockup">
      <div className="dd8-header">
        <h3>BOSS DD-8</h3>
      </div>
      
      <div className="dd8-controls">
        <div className="dd8-section">
          <Knob label="TIME" value={params.time} onChange={(v) => handleKnobChange('time', v)} />
          <Knob label="FEEDBACK" value={params.feedback} onChange={(v) => handleKnobChange('feedback', v)} />
          <Knob label="LEVEL" value={params.level} onChange={(v) => handleKnobChange('level', v)} />
        </div>

        <div className="dd8-modes">
          <ModeButton 
            label="STANDARD" 
            isActive={params.mode === 'standard'} 
            onClick={() => handleModeChange('standard')} 
          />
          <ModeButton 
            label="TAPE" 
            isActive={params.mode === 'tape'} 
            onClick={() => handleModeChange('tape')} 
          />
          <ModeButton 
            label="WARP" 
            isActive={params.mode === 'warp'} 
            onClick={() => handleModeChange('warp')} 
          />
        </div>
      </div>

    </div>
  );
};

export default BossDd8; 