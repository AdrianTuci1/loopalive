import React from 'react';

const TempoFrame = ({ children }) => (
  <div className="rd6-tempo-frame">
    <div className="rd6-tempo-label">TEMPO</div>
    {children}
    <div className="rd6-tempo-notation">
      <span>SLOW</span>
      <span>FAST</span>
    </div>
  </div>
);

export default TempoFrame; 