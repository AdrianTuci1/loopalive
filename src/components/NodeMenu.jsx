import React from 'react';
import './NodeMenu.css';

const NodeMenu = ({ onClose, onAddNode }) => {
  const nodeTypes = [
    { id: 'BehringerTd3', label: 'Behringer Td3' },
    { id: 'ElektronDigitakt', label: 'Elektron Digitakt' },
    { id: 'Synth', label: 'Synth' },
    { id: 'Effect', label: 'Effect' }
  ];

  return (
    <div className="node-menu-drawer">
      <div className="node-menu-header">
        <h2>Add Node</h2>
        <button className="close-button" onClick={onClose}>×</button>
      </div>
      <div className="node-menu-content">
        {nodeTypes.map(type => (
          <div
            key={type.id}
            className="node-type"
            onClick={() => onAddNode(type.id)}
          >
            <h3>{type.label}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NodeMenu; 