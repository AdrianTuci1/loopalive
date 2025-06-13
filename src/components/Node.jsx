import React from 'react';
import { Handle, Position } from 'reactflow';
import useStore from '../store/useStore';
import { nodeTypes } from '../config/nodes';
import './Node.css';

const Node = ({ data, id }) => {
  const selectedNodeId = useStore((state) => state.selectedNodeId);
  const setSelectedNode = useStore((state) => state.setSelectedNode);
  const isSelected = selectedNodeId === id;

  const onDelete = (event) => {
    event.stopPropagation();
    data.onDelete?.(id);
  };

  const onHeaderMouseDown = (event) => {
    if (!event.target.closest('.drag-handle')) {
      event.stopPropagation();
      event.preventDefault();
    }
  };

  const onContentMouseDown = (event) => {
    event.stopPropagation();
    event.preventDefault();
  };

  const onContentClick = (event) => {
    event.stopPropagation();
    event.preventDefault();
    if (!isSelected) {
      setSelectedNode(id);
    }
  };

  const onDragStart = (event) => {
    if (!event.target.closest('.drag-handle')) {
      event.preventDefault();
      return false;
    }
  };

  return (
    <div 
      className="node"
      onDragStart={onDragStart}
      draggable={false}
      onClick={(e) => e.stopPropagation()}
    >
      <div 
        className="node-header" 
        onMouseDown={onHeaderMouseDown}
        draggable={true}
      >
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
      <div 
        className={`node-content ${isSelected ? 'selected' : ''}`}
        onMouseDown={onContentMouseDown}
        onClick={onContentClick}
        draggable={false}
      >
        {nodeTypes[data.type] && React.createElement(nodeTypes[data.type], { data, id })}
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