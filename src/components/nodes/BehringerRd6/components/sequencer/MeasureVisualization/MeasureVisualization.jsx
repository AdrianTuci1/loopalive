import React from 'react';
import './MeasureVisualization.css';

const MeasureVisualization = () => {
  const renderRow = (columns) => {
    return columns.map((colSize, colIndex) => (
      <div key={colIndex} className="measure-column" style={{ width: `${(colSize / 16) * 100}%` }}>
        {Array(colSize).fill(null).map((_, measureIndex) => (
          <div key={measureIndex} className="measure-cell" />
        ))}
      </div>
    ));
  };

  return (
    <div className="measure-visualization">
      <div className="measure-row">
        {renderRow([6, 6, 4])}
      </div>
      <div className="measure-row">
        {renderRow([3, 3, 3, 3, 3, 1])}
      </div>
      <div className="measure-row">
        {renderRow([8, 8])}
      </div>
      <div className="measure-row">
        {renderRow([4, 4, 4, 4])}
      </div>
    </div>
  );
};

export default MeasureVisualization; 