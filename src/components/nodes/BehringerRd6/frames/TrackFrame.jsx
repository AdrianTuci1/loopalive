import React from 'react';

const TrackFrame = ({ children }) => (
  <div className="rd6-track-frame">
    <div className="rd6-track-label">TRACK INSTRUMENT</div>
    <div className="rd6-button-placement">
    {children}
    </div>
    <div className="rd6-track-notation">
      <span>AC (1)</span>
      <span>BD (2)</span>
      <span>SD (3)</span>
      <span>LT (4)</span>
      <span>(5) HT</span>
      <span>(6) CY/CP</span>
      <span>(7) OH</span>
      <span>(8) CH</span>
    </div>
  </div>
);

export default TrackFrame; 