import React from 'react';

export const StepButton = ({ label, isActive, onClick }) => (
  <div 
    className={`rd6-step-button ${isActive ? 'active' : ''}`}
    onClick={onClick}
  >
    {label}
  </div>
);

export const FunctionButton = ({ label, isActive, onClick }) => (
  <div 
    className={`rd6-function-button ${isActive ? 'active' : ''}`}
    onClick={onClick}
  >
    {label}
  </div>
);

export const Jack = ({ label }) => (
  <div className="rd6-jack">
    <div className="rd6-jack-hole"></div>
    <div className="rd6-jack-label">{label}</div>
  </div>
); 