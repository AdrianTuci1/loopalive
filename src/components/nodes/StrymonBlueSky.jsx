import React from 'react';
import '../Node.css';
import './StrymonBlueSky.css';
import useStrymonBlueSky from '../../hooks/useStrymonBlueSky';

const Knob = ({ label, value, onChange }) => (
  <div className="bluesky-knob">
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
    <span className="bluesky-knob-label">{label}</span>
  </div>
);

const ModeButton = ({ label, isActive, onClick }) => (
  <div 
    className={`bluesky-mode-button ${isActive ? 'active' : ''}`}
    onClick={onClick}
  >
    {label}
  </div>
);

const StrymonBlueSky = () => {
  const { params, handleKnobChange, handleModeChange } = useStrymonBlueSky();

  return (
    <div className="node effect-node bluesky-mockup">
      <div className="bluesky-header">
        <h3>STRYMON BLUESKY</h3>
      </div>
      
      <div className="bluesky-controls">
        <div className="bluesky-section">
          <Knob label="DECAY" value={params.decay} onChange={(v) => handleKnobChange('decay', v)} />
          <Knob label="MIX" value={params.mix} onChange={(v) => handleKnobChange('mix', v)} />
          <Knob label="TONE" value={params.tone} onChange={(v) => handleKnobChange('tone', v)} />
        </div>

        <div className="bluesky-section">
          <Knob label="SHIMMER" value={params.shimmer} onChange={(v) => handleKnobChange('shimmer', v)} />
          <Knob label="MOD" value={params.mod} onChange={(v) => handleKnobChange('mod', v)} />
        </div>

        <div className="bluesky-modes">
          <ModeButton 
            label="ROOM" 
            isActive={params.mode === 'room'} 
            onClick={() => handleModeChange('room')} 
          />
          <ModeButton 
            label="HALL" 
            isActive={params.mode === 'hall'} 
            onClick={() => handleModeChange('hall')} 
          />
          <ModeButton 
            label="SPRING" 
            isActive={params.mode === 'spring'} 
            onClick={() => handleModeChange('spring')} 
          />
        </div>
      </div>

    </div>
  );
};

export default StrymonBlueSky; 