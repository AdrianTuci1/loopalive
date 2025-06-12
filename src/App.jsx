import React from 'react'
import Flow from './components/Flow'
import Toolbar from './components/Toolbar'
import NodeMenu from './components/NodeMenu'
import useStore from './store/useStore'
import './App.css'
import PatternGridModalProvider from './components/PatternGridModalProvider'
import PatternGridModal from './components/PatternGridModal'

function App() {
  const {
    isNodeMenuOpen,
    toggleNodeMenu,
    addNode
  } = useStore()

  const handleAddNode = (nodeType) => {
    addNode(nodeType);
    toggleNodeMenu();
  }

  return (
    <PatternGridModalProvider>
      <div className="app">
        <Toolbar />
        <button 
          className="add-node-button"
          onClick={toggleNodeMenu}
        >
          Add Node
        </button>
        <div className="blackboard-container">
          <Flow />
        </div>
        <div className={`node-menu-drawer ${isNodeMenuOpen ? '' : 'closed'}`}>
          <NodeMenu
            onClose={toggleNodeMenu}
            onAddNode={handleAddNode}
          />
        </div>
        <PatternGridModal />
      </div>
    </PatternGridModalProvider>
  )
}

export default App
