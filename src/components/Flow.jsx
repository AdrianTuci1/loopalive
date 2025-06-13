import React, { useCallback, useMemo, useEffect } from 'react';
import ReactFlow, {
  Background,
  Controls,
  addEdge,
  useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';
import Node from './Node';
import useStore from '../store/useStore';
import { nodeTypes } from '../config/nodes';

const Flow = () => {
  const nodes = useStore((state) => state.nodes) || [];
  const updateNodes = useStore((state) => state.updateNodes);
  const nodesDraggable = useStore((state) => state.nodesDraggable);
  const flowDraggable = useStore((state) => state.flowDraggable);
  const setSelectedNode = useStore((state) => state.setSelectedNode);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.node')) {
        setSelectedNode(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [setSelectedNode]);

  const onNodesChange = useCallback((changes) => {
    const updatedNodes = nodes.map(node => {
      const change = changes.find(c => c.id === node.id);
      if (change?.type === 'position' && change.position) {
        return { ...node, position: change.position };
      }
      return node;
    });
    
    if (updatedNodes.some((node, index) => node !== nodes[index])) {
      updateNodes(updatedNodes);
    }
  }, [nodes, updateNodes]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node.id);
  }, [setSelectedNode]);

  const memoizedNodeTypes = useMemo(() => ({
    ...nodeTypes,
    custom: Node
  }), []);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        nodeTypes={memoizedNodeTypes}
        fitView
        minZoom={0.1}
        maxZoom={2}
        nodesDraggable={nodesDraggable}
        panOnDrag={flowDraggable}
        panOnScroll={flowDraggable}
        zoomOnScroll={flowDraggable}
        zoomOnDoubleClick={flowDraggable}
      >
        <Background />
        <Controls showInteractive={false} />
      </ReactFlow>
    </div>
  );
};

export default Flow; 