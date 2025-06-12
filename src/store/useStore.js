import { create } from 'zustand'

const useStore = create((set) => ({
  // Nodes state
  nodes: [],
  
  // Connections state
  connections: [],
  
  // Dragging state
  draggingConnection: null,
  
  // Node menu state
  isNodeMenuOpen: false,

  // Actions
  addNode: (nodeType) => {
    const newNode = {
      id: `${Date.now()}`,
      type: 'custom',
      position: { x: 100, y: 100 },
      data: {
        title: `${nodeType} Node`,
        type: nodeType, // 'BehringerTd3', 'ElektronDigitakt', etc.
        onDelete: (nodeId) => {
          set((state) => ({
            nodes: state.nodes.filter((node) => node.id !== nodeId)
          }));
        }
      }
    };
    set((state) => {
      const newNodes = [...state.nodes, newNode];
      return { nodes: newNodes };
    });
  },

  updateNodePosition: (nodeId, newPosition) => set((state) => ({
    nodes: state.nodes.map(node =>
      node.id === nodeId ? { ...node, position: newPosition } : node
    )
  })),

  startConnection: (sourceNode, type) => set({
    draggingConnection: {
      sourceNode: { id: sourceNode, type },
      dragPosition: null
    }
  }),

  updateDraggingPosition: (position) => set((state) => ({
    draggingConnection: state.draggingConnection ? {
      ...state.draggingConnection,
      dragPosition: position
    } : null
  })),

  completeConnection: (targetNodeId) => set((state) => {
    if (!state.draggingConnection) return state;
    
    const sourceNodeId = state.draggingConnection.sourceNode.id;
    if (sourceNodeId === targetNodeId) return { draggingConnection: null };

    return {
      connections: [...state.connections, {
        id: Date.now(),
        source: sourceNodeId,
        target: targetNodeId
      }],
      draggingConnection: null
    };
  }),

  cancelConnection: () => set({ draggingConnection: null }),

  toggleNodeMenu: () => set((state) => ({
    isNodeMenuOpen: !state.isNodeMenuOpen
  })),

  updateNodes: (newNodes) => set({ nodes: newNodes })
}))

export default useStore 