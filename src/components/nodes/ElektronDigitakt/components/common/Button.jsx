import React from 'react';
import './Button.css';

const Button = ({ 
  label, 
  icon, 
  size = 'wide', // 'wide', 'small-square', 'large-square'
  onClick,
  isActive = false,
  className = ''
}) => {
  return (
    <div className={`button-container ${className}`}>
      <div 
        className={`button button-${size} ${isActive ? 'active' : ''}`}
        onClick={onClick}
      >
        <div className="button-inner">
          {icon && <div className="button-icon">{icon}</div>}
        </div>
      </div>
      {label && <div className="button-label">{label}</div>}
    </div>
  );
};

export default Button;