import React from 'react';
import '../Node.css';
import './BehringerXenyx802.css';

const Fader = ({ label }) => (
  <div className="xenyx-fader">
    <div className="xenyx-fader-track">
      <div className="xenyx-fader-knob" />
    </div>
    <span className="xenyx-fader-label">{label}</span>
  </div>
);

const Knob = ({ label }) => (
  <div className="xenyx-knob">
    <svg width="30" height="30" viewBox="0 0 30 30">
      <circle cx="15" cy="15" r="13" fill="#2c2c2c" stroke="#666" strokeWidth="2" />
      <rect x="14" y="4" width="2" height="8" rx="1" fill="#666" />
    </svg>
    <span className="xenyx-knob-label">{label}</span>
  </div>
);

const BehringerXenyx802 = () => (
  <div className="node mixer-node xenyx-mockup">
    <div className="xenyx-header">
      <h3>BEHRINGER XENYX 802</h3>
    </div>
    
    <div className="xenyx-channels">
      {/* Channel 1 */}
      <div className="xenyx-channel">
        <div className="xenyx-channel-strip">
          <div className="xenyx-channel-controls">
            <Knob label="GAIN" />
            <Knob label="HIGH" />
            <Knob label="MID" />
            <Knob label="LOW" />
          </div>
          <Fader label="CH 1" />
        </div>
      </div>

      {/* Channel 2 */}
      <div className="xenyx-channel">
        <div className="xenyx-channel-strip">
          <div className="xenyx-channel-controls">
            <Knob label="GAIN" />
            <Knob label="HIGH" />
            <Knob label="MID" />
            <Knob label="LOW" />
          </div>
          <Fader label="CH 2" />
        </div>
      </div>

      {/* Master Section */}
      <div className="xenyx-master">
        <div className="xenyx-master-controls">
          <Knob label="FX" />
          <Knob label="AUX" />
          <Knob label="PAN" />
        </div>
        <Fader label="MASTER" />
      </div>
    </div>

  </div>
);

export default BehringerXenyx802; 