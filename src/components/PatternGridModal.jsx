import React from 'react';
import { usePatternGridModal } from './PatternGridModalProvider';

// Mini step sequencer grid for each cell
const MiniStepGrid = () => (
  <div className="mini-step-grid">
    {[...Array(6)].map((_, row) => (
      <div className="mini-step-row" key={row}>
        {[...Array(16)].map((_, col) => (
          <div className="mini-step-cell" key={col}></div>
        ))}
      </div>
    ))}
  </div>
);

const PatternGridModal = () => {
  const { open, setOpen } = usePatternGridModal();
  if (!open) return null;
  return (
    <div className="pattern-modal-overlay">
      <div className="pattern-modal-content">
        <button className="close-modal-btn" onClick={() => setOpen(false)}>&times;</button>
        <div className="pattern-interpolation-grid">
          {[...Array(11)].map((_, rowIdx) => (
            <div className="pattern-row" key={rowIdx}>
              {[...Array(11)].map((_, colIdx) => (
                <div className="pattern-cell" key={colIdx}>
                  <MiniStepGrid />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatternGridModal; 