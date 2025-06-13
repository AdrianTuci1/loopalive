import React from 'react';
import '../Node.css';
import './BehringerTd3.css';
import useTd3Synth from '../../hooks/useTd3Synth';

const Knob = ({ label, value, onChange }) => (
  <div className="td3-knob">
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
    <span className="td3-knob-label">{label}</span>
  </div>
);

const Switch = ({ label, isOn, onChange }) => (
  <div className="td3-switch" onClick={() => onChange(!isOn)}>
    <div className={`td3-switch-body ${isOn ? 'on' : ''}`} />
    <span className="td3-switch-label">{label}</span>
  </div>
);

const BehringerTd3 = () => {
  const { params, handleKnobChange, handleSwitchChange, playNote } = useTd3Synth();

  return (
    <div className="node synth-node td3-mockup">
      <div className="td3-header">
        <h3>BEHRINGER TD-3</h3>
      </div>
      
      <div className="td3-controls">
        <div className="td3-section">
          <h4>OSCILLATOR</h4>
          <Knob label="TUNE" value={params.tune} onChange={(v) => handleKnobChange('tune', v)} />
          <Knob label="CUTOFF" value={params.cutoff} onChange={(v) => handleKnobChange('cutoff', v)} />
          <Knob label="RESONANCE" value={params.resonance} onChange={(v) => handleKnobChange('resonance', v)} />
          <Knob label="ENV MOD" value={params.envMod} onChange={(v) => handleKnobChange('envMod', v)} />
          <Knob label="DECAY" value={params.decay} onChange={(v) => handleKnobChange('decay', v)} />
          <Knob label="ACCENT" value={params.accent} onChange={(v) => handleKnobChange('accent', v)} />
        </div>

        <div className="td3-section">
          <h4>LFO</h4>
          <Knob label="RATE" value={params.lfoRate} onChange={(v) => handleKnobChange('lfoRate', v)} />
          <Knob label="DELAY" value={params.lfoDelay} onChange={(v) => handleKnobChange('lfoDelay', v)} />
          <Knob label="WAVE" value={params.lfoWave} onChange={(v) => handleKnobChange('lfoWave', v)} />
        </div>

        <div className="td3-section">
          <h4>MODE</h4>
          <Switch label="WRITE" isOn={params.write} onChange={(v) => handleSwitchChange('write', v)} />
          <Switch label="TRACK" isOn={params.track} onChange={(v) => handleSwitchChange('track', v)} />
          <Switch label="PATTERN" isOn={params.pattern} onChange={(v) => handleSwitchChange('pattern', v)} />
        </div>
      </div>

      <div className="td3-sequencer">
        <div className="td3-step-buttons">
          {[...Array(16)].map((_, i) => (
            <div key={i} className="td3-step-button" onClick={playNote} />
          ))}
        </div>
      </div>

    </div>
  );
};

export default BehringerTd3; 