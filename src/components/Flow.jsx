import React, { useCallback, useMemo } from 'react';
import ReactFlow, {
  Background,
  Controls,
  addEdge,
  useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';
import Node from './Node';
import useStore from '../store/useStore';
import BehringerTd3 from './nodes/BehringerTd3';
import ElektronDigitakt from './nodes/ElektronDigitakt';


const nodeTypes = {
  BehringerTd3,
  ElektronDigitakt,
  custom: Node,
};

const Flow = () => {
  const nodes = useStore((state) => state.nodes) || [];
  const updateNodes = useStore((state) => state.updateNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onNodesChange = useCallback((changes) => {
    const updatedNodes = nodes.map(node => {
      const change = changes.find(c => c.id === node.id);
      if (change && change.type === 'position' && change.position) {
        return {
          ...node,
          position: change.position
        };
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

  const memoizedNodeTypes = useMemo(() => nodeTypes, []);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={memoizedNodeTypes}
        fitView
        minZoom={0.1}
        maxZoom={2}
        nodesDraggable={true}
      >
        <Background />
        <Controls showInteractive={false} />
      </ReactFlow>
    </div>
  );
};

export default Flow; 