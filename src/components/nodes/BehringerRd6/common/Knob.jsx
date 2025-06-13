import React, { useState, useEffect, useCallback } from 'react';
import './Knob.css';

const Knob = ({
  label,
  value,
  onChange,
  steps = 5,
  min = 0,
  max = 100,
  size = 85,
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
  const rotation = (percentage / 100) * 270 - 135; // Map 0-100% to -135 to +135 degrees
  const stepAngle = 270 / steps;
  
  // Generate marks
  const stepMarks = Array.from({ length: steps + 1 }, (_, i) => {
    const angle = (i * stepAngle) + 135; // Start from 135 degrees
    const isMajor = i % 2 === 0; // Every other mark is major
    const length = isMajor ? 20 : 10; // Major marks are longer
    
    // Calculate start and end points for the line
    const startRadius = size/2 + 5; // Increased radius for marks
    const endRadius = startRadius - length;
    
    const startX = size/2 + startRadius * Math.cos(angle * Math.PI / 180);
    const startY = size/2 + startRadius * Math.sin(angle * Math.PI / 180);
    const endX = size/2 + endRadius * Math.cos(angle * Math.PI / 180);
    const endY = size/2 + endRadius * Math.sin(angle * Math.PI / 180);
    
    return { startX, startY, endX, endY, isMajor };
  });

  return (
    <div 
      className={`knob ${className}`}
      style={{ width: size, height: size }}
      onMouseDown={handleMouseDown}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <defs>
          <linearGradient id="knobGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4a4a4a" />
            <stop offset="50%" stopColor="#2c2c2c" />
            <stop offset="100%" stopColor="#1a1a1a" />
          </linearGradient>
          <filter id="knobShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="1" />
            <feOffset dx="0" dy="1" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.3" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        {/* Step marks */}
        {stepMarks.map((mark, i) => (
          <line
            key={i}
            x1={mark.startX}
            y1={mark.startY}
            x2={mark.endX}
            y2={mark.endY}
            stroke="#666"
            strokeWidth={mark.isMajor ? 2 : 1}
            strokeLinecap="round"
          />
        ))}
        
        {/* Background circle */}
        <circle 
          cx={size/2} 
          cy={size/2} 
          r={size/2 - 4} 
          fill="url(#knobGradient)" 
          stroke="#666" 
          strokeWidth="1"
          filter="url(#knobShadow)"
        />
        
        {/* Knob indicator */}
        <g transform={`rotate(${rotation}, ${size/2}, ${size/2})`}>
          <line
            x1={size/2}
            y1={size/2}
            x2={size/2}
            y2="4"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>
        
        {/* Center dot */}
        <circle 
          cx={size/2} 
          cy={size/2} 
          r="2" 
          fill="#666" 
          filter="url(#knobShadow)"
        />
      </svg>
      <span className="knob-label">{label}</span>
      <span className="knob-value">
        {Math.round(percentage)}%
      </span>
    </div>
  );
};

export default Knob; 