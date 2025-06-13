import React from 'react';
import './Switch.css';

const Switch = ({ label, value, onChange, color = "#FFD600" }) => {
  return (
    <div className="switch-container">
      <div 
        className={`switch ${value ? 'on' : 'off'}`}
        onClick={() => onChange(!value)}
        style={{ '--switch-color': color }}
      >
        <div className="switch-handle"></div>
      </div>
      <div className="switch-label">{label}</div>
    </div>
  );
};

export default Switch; 