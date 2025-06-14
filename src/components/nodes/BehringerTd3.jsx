import React from 'react';
import '../Node.css';
import './BehringerTd3.css';
import useTd3Synth from '../../hooks/useTd3Synth';
import { Knob } from './BehringerRd6';


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
          <Knob label="TUNE" value={params.tune * 100} onChange={(v) => handleKnobChange('tune', v / 100)} min={0} max={100} steps={5} />
          <Knob label="CUTOFF" value={params.cutoff * 100} onChange={(v) => handleKnobChange('cutoff', v / 100)} min={0} max={100} steps={5} />
          <Knob label="RESONANCE" value={params.resonance * 100} onChange={(v) => handleKnobChange('resonance', v / 100)} min={0} max={100} steps={5} />
          <Knob label="ENV MOD" value={params.envMod * 100} onChange={(v) => handleKnobChange('envMod', v / 100)} min={0} max={100} steps={5} />
          <Knob label="DECAY" value={params.decay * 100} onChange={(v) => handleKnobChange('decay', v / 100)} min={0} max={100} steps={5} />
          <Knob label="ACCENT" value={params.accent * 100} onChange={(v) => handleKnobChange('accent', v / 100)} min={0} max={100} steps={5} />
        </div>

        <div className="td3-section">
          <h4>LFO</h4>
          <Knob label="RATE" value={params.lfoRate * 100} onChange={(v) => handleKnobChange('lfoRate', v / 100)} min={0} max={100} steps={5} />
          <Knob label="DELAY" value={params.lfoDelay * 100} onChange={(v) => handleKnobChange('lfoDelay', v / 100)} min={0} max={100} steps={5} />
          <Knob label="WAVE" value={params.lfoWave * 100} onChange={(v) => handleKnobChange('lfoWave', v / 100)} min={0} max={100} steps={5} />
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