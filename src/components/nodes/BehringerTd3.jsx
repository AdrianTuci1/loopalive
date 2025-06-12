import React from 'react';
import { Handle, Position } from 'reactflow';
import '../Node.css';
import './BehringerTd3.css';

// SVG Knob for visual mockup
const Knob = ({ label }) => (
  <div className="rd6-mock-knob">
    <svg width="48" height="48" viewBox="0 0 48 48">
      <circle cx="24" cy="24" r="22" fill="#fffbe0" stroke="#bfa000" strokeWidth="2" />
      <rect x="23" y="7" width="2" height="12" rx="1" fill="#bfa000" />
    </svg>
    <span className="rd6-mock-knob-label">{label}</span>
  </div>
);

const StepButton = ({ label }) => (
  <div className="rd6-mock-step-btn">
    <div className="rd6-mock-step-label">{label}</div>
  </div>
);

const FunctionButton = ({ label }) => (
  <div className="rd6-mock-func-btn">{label}</div>
);

const BehringerTd3 = () => (
  <div className="node drum-machine-node rd6-mockup">
    {/* Top row: Knobs */}
    <div className="rd6-mock-top-row">
      <Knob label="Accent" />
      <Knob label="Bass Drum" />
      <Knob label="Snare Drum" />
      <Knob label="L.H. Tom" />
      <Knob label="Cymbal/Clap" />
      <Knob label="O.C. Hi Hat" />
    </div>
    {/* Center row: Mode, Smiley, Distortion/Volume */}
    <div className="rd6-mock-center-row">
      <div className="rd6-mock-mode">
        <Knob label="Mode" />
      </div>
      <div className="rd6-mock-smiley">
        <svg width="70" height="70" viewBox="0 0 70 70">
          <circle cx="35" cy="35" r="32" fill="#FFD600" stroke="#000" strokeWidth="2"/>
          <circle cx="24" cy="30" r="4" fill="#000"/>
          <circle cx="46" cy="30" r="4" fill="#000"/>
          <path d="M24 46 Q35 56 46 46" stroke="#000" strokeWidth="2.5" fill="none"/>
        </svg>
      </div>
      <div className="rd6-mock-distortion-volume">
        <Knob label="Distortion" />
        <Knob label="Volume" />
      </div>
    </div>
    {/* Jacks row (mock) */}
    <div className="rd6-mock-jacks-row">
      <div className="rd6-mock-jack" />
      <div className="rd6-mock-jack" />
      <div className="rd6-mock-jack" />
      <div className="rd6-mock-jack" />
      <div className="rd6-mock-jack" />
      <div className="rd6-mock-jack" />
    </div>
    {/* Step sequencer row */}
    <div className="rd6-mock-step-row">
      {[...Array(16)].map((_, i) => (
        <StepButton key={i} label={i+1} />
      ))}
    </div>
    {/* Function buttons row */}
    <div className="rd6-mock-func-row">
      <FunctionButton label="BAR RESET" />
      <FunctionButton label="CLEAR" />
      <FunctionButton label="START/STOP" />
      <FunctionButton label="COPY" />
      <FunctionButton label="PASTE" />
      <FunctionButton label="DEL" />
      <FunctionButton label="INS" />
    </div>
    <Handle type="source" position={Position.Right} className="node-handle" />
    <Handle type="target" position={Position.Left} className="node-handle" />
  </div>
);

export default BehringerTd3; 