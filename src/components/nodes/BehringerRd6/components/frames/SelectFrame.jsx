import React from 'react';

const SelectFrame = ({ children }) => (
  <div className="rd6-select-frame">
    <div className="rd6-select-label">SELECT</div>
    <div className="rd6-select-content">
      <p className="rd6-select-notation">CY RD-6</p>
      <div className="rd6-select-control">
        {children}
      </div>
      <p className="rd6-select-notation">CP BR110</p>
    </div>
  </div>
);

export default SelectFrame; 