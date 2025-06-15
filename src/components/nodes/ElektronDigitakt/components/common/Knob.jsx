import React from 'react';
import './Knob.css';

const Knob = ({ 
  label,
  value = 0, // 0 to 1
  onChange,
  size = 40, // diameter in pixels
  className = ''
}) => {
  const handleMouseDown = (e) => {
    const startY = e.clientY;
    const startValue = value;

    const handleMouseMove = (e) => {
      const deltaY = startY - e.clientY;
      const newValue = Math.max(0, Math.min(1, startValue + deltaY / 200));
      onChange?.(newValue);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div className={`knob-container ${className}`}>
      <div 
        className="knob"
        style={{ width: size, height: size }}
        onMouseDown={handleMouseDown}
      >
        <div 
          className="knob-inner"
          style={{ 
            transform: `rotate(${value * 270}deg)`,
            width: size,
            height: size
          }}
        >
          <div className="knob-dot" />
        </div>
      </div>
      {label && <div className="knob-label">{label}</div>}
    </div>
  );
};

export default Knob;