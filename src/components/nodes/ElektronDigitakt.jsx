import React from 'react';
import '../Node.css';
import './ElektronDigitakt.css';

// Encoder (Knob) mockup
const Encoder = ({ label }) => (
  <div className="digitakt-encoder">
    <svg width="36" height="36" viewBox="0 0 36 36">
      <circle cx="18" cy="18" r="16" fill="#222" stroke="#888" strokeWidth="2" />
      <rect x="17" y="6" width="2" height="8" rx="1" fill="#fff" />
    </svg>
    <span className="digitakt-encoder-label">{label}</span>
  </div>
);

// Step button mockup
const StepButton = ({ label }) => (
  <div className="digitakt-step-btn">
    <div className="digitakt-step-label">{label}</div>
  </div>
);

// Main function button mockup
const FuncButton = ({ label }) => (
  <div className="digitakt-func-btn">{label}</div>
);

const ElektronDigitakt = () => (
  <div className="node elektron-digitakt-node">
    {/* Top: Logo */}
    <div className="digitakt-logo-row">
      <span className="digitakt-logo">Elektron</span>
      <span className="digitakt-model">Digitakt</span>
    </div>
    {/* LCD Screen */}
    <div className="digitakt-lcd">
      <div className="digitakt-lcd-inner">LCD SCREEN</div>
    </div>
    {/* Encoders row */}
    <div className="digitakt-encoders-row">
      {[...Array(8)].map((_, i) => (
        <Encoder key={i} label={String.fromCharCode(65 + i)} />
      ))}
    </div>
    {/* Main function buttons */}
    <div className="digitakt-func-row">
      <FuncButton label="FUNC" />
      <FuncButton label="TRK" />
      <FuncButton label="SRC" />
      <FuncButton label="FLTR" />
      <FuncButton label="AMP" />
      <FuncButton label="LFO" />
      <FuncButton label="FX" />
      <FuncButton label="MIDI" />
    </div>
    {/* Transport buttons */}
    <div className="digitakt-transport-row">
      <FuncButton label="PLAY" />
      <FuncButton label="STOP" />
      <FuncButton label="REC" />
    </div>
    {/* Step sequencer row */}
    <div className="digitakt-step-row">
      {[...Array(16)].map((_, i) => (
        <StepButton key={i} label={i+1} />
      ))}
    </div>
  </div>
);

export default ElektronDigitakt; 