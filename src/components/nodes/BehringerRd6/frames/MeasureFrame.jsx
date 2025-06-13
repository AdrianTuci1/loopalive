import React from 'react';

const MeasureFrame = ({ children }) => (
  <div className="rd6-measure-column">
    <div className="rd6-measure-switch-group">
      <div className="rd6-measure-switch">
        {children}
      </div>
    </div>
  </div>
);

export default MeasureFrame; 