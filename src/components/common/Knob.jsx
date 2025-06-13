import React, { useState, useEffect, useCallback } from 'react';
import './Knob.css';

const Knob = ({
  label,
  value,
  onChange,
  steps = 100,
  min = 0,
  max = 100,
  size = 48,
  color = '#FFD600',
  className = ''
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentValue, setCurrentValue] = useState(value);

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  const handleMouseDown = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    setStartX(e.clientX);
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;

    const deltaX = e.clientX - startX;
    const stepSize = (max - min) / steps;
    const valueChange = Math.round(deltaX / 2) * stepSize;
    
    let newValue = currentValue + valueChange;
    // Ensure value stays between min and max
    newValue = Math.max(min, Math.min(max, newValue));
    
    setCurrentValue(newValue);
    onChange(newValue);
  }, [isDragging, startX, currentValue, max, min, steps, onChange]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const percentage = ((currentValue - min) / (max - min)) * 100;
  const rotation = (percentage / 100) * 270; // 270 degrees rotation range
  const stepAngle = 270 / steps;
  const stepMarks = Array.from({ length: steps + 1 }, (_, i) => {
    const angle = (i * stepAngle) - 135; // Start from -135 degrees
    const x = size/2 + (size/2 - 4) * Math.cos(angle * Math.PI / 180);
    const y = size/2 + (size/2 - 4) * Math.sin(angle * Math.PI / 180);
    return { x, y };
  });

  return (
    <div 
      className={`knob ${className}`}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background circle */}
        <circle 
          cx={size/2} 
          cy={size/2} 
          r={size/2 - 2} 
          fill="#2c2c2c" 
          stroke="#666" 
          strokeWidth="2" 
        />
        
        {/* Step marks */}
        {stepMarks.map((mark, i) => (
          <circle
            key={i}
            cx={mark.x}
            cy={mark.y}
            r="1"
            fill="#666"
          />
        ))}
        
        {/* Knob indicator */}
        <g transform={`rotate(${rotation}, ${size/2}, ${size/2})`}>
          <rect 
            x={size/2 - 1} 
            y="4" 
            width="2" 
            height={size/4} 
            rx="1" 
            fill={color}
          />
        </g>
        
        {/* Center dot */}
        <circle 
          cx={size/2} 
          cy={size/2} 
          r="3" 
          fill="#666" 
        />
      </svg>
      <span className="knob-label">{label}</span>
      <span 
        className="knob-value" 
        onMouseDown={handleMouseDown}
        onClick={(e) => e.stopPropagation()}
      >
        {Math.round(percentage)}%
      </span>
    </div>
  );
};

export default Knob; 