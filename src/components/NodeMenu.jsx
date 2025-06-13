import React from 'react';
import './NodeMenu.css';
import { nodeMenuItems } from '../config/nodes';

const NodeMenu = ({ onClose, onAddNode }) => {
  return (
    <div className="node-menu-drawer">
      <div className="node-menu-header">
        <h2>Add Node</h2>
        <button className="close-button" onClick={onClose}>×</button>
      </div>
      <div className="node-menu-content">
        {nodeMenuItems.map(type => (
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