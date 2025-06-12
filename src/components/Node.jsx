import React from 'react';
import { Handle, Position } from 'reactflow';
import './Node.css';
import BehringerTd3 from './nodes/BehringerTd3';
import ElektronDigitakt from './nodes/ElektronDigitakt';

const nodeComponentMap = {
  BehringerTd3,
  ElektronDigitakt,
  // Add more mappings as needed
};

const Node = ({ data, id }) => {
  const onDelete = (event) => {
    event.stopPropagation();
    if (data.onDelete) {
      data.onDelete(id);
    }
  };

  return (
    <div className="node">
      <div className="node-header">
        <div className="drag-handle">
          <svg viewBox="0 0 24 24" width="16" height="16">
            <path fill="currentColor" d="M10 9h4V6h3l-5-5-5 5h3v3zm-1 1H6V7l-5 5 5 5v-3h3v-4zm14 2l-5-5v3h-3v4h3v3l5-5zm-9 3h-4v3H7l5 5 5-5h-3v-3z"/>
          </svg>
        </div>
        <span className="node-title">{data.title}</span>
        <button className="delete-button" onClick={onDelete}>
          <svg viewBox="0 0 24 24" width="16" height="16">
            <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>
      </div>
      <div className="node-content">
        {nodeComponentMap[data.type] ? (
          React.createElement(nodeComponentMap[data.type], { data, id })
        ) : null}
      </div>
      <Handle
        type="source"
        position={Position.Right}
        className="node-handle"
      />
      <Handle
        type="target"
        position={Position.Left}
        className="node-handle"
      />
    </div>
  );
};

export default Node; 