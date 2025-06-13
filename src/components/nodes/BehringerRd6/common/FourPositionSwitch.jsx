import React from 'react';
import './FourPositionSwitch.css';

const FourPositionSwitch = ({ value, onChange, color = "#FFD600" }) => {
  const handleClick = () => {
    // Cycle through positions: 4 -> 3 -> 2 -> 1 -> 4
    const newValue = value === 1 ? 4 : value - 1;
    onChange(newValue);
  };

  // Map the value to the correct position (4 is top, 1 is bottom)
  const getPosition = (val) => {
    const totalHeight = 120; // Total height of switch in pixels
    const handleHeight = 30; // Height of handle in pixels
    const maxTravel = totalHeight - handleHeight; // Maximum travel distance
    
    switch(val) {
      case 4: return 0;
      case 3: return maxTravel / 3;
      case 2: return (maxTravel * 2) / 3;
      case 1: return maxTravel;
      default: return 0;
    }
  };

  return (
    <div className="four-position-switch" onClick={handleClick}>
      <div className="switch-body">
        <div 
          className="switch-handle" 
          style={{ 
            transform: `translateY(${getPosition(value)}px)`,
            backgroundColor: color 
          }}
        />
      </div>
      <div className="switch-labels">
        <span className={value === 4 ? 'active' : ''}>4</span>
        <span className={value === 3 ? 'active' : ''}>3</span>
        <span className={value === 2 ? 'active' : ''}>2</span>
        <span className={value === 1 ? 'active' : ''}>1</span>
      </div>
    </div>
  );
};

export default FourPositionSwitch; 