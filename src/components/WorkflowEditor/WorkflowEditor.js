import React, { useState, useCallback, useEffect, useRef } from 'react';
import ReactFlow, { 
  ReactFlowProvider, 
  Background, 
  Controls,
  useNodesState,
  useEdgesState,
  MarkerType,
  Panel
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import CustomNode from './CustomNode';
import CustomEdge from './CustomEdge';
import { RightSidebar } from '../Agents/Sidebar';
import { createSafeNodes, createSafeEdges } from './WorkflowEditorUtils';
import { setConfigureNodeHandler, registerSidebarControls, getDebugInfo } from './NodeConfigEvents';
import styles from './WorkflowEditor.module.css';
import { registerEdgeDeletionCallback } from './edgeUtils';

const nodeTypes = {
  custom: CustomNode,
};

const edgeTypes = {
  custom: CustomEdge,
};

const WorkflowEditor = ({ initialNodes = [], initialEdges = [] }) => {
  const safeInitialNodes = createSafeNodes(initialNodes);
  const safeInitialEdges = createSafeEdges(initialEdges);
  
  // State declarations
  const [selectedEdge, setSelectedEdge] = useState(null);
  const [configNode, setConfigNode] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [debugInfo, setDebugInfo] = useState('No edge selected');
  
  // Register the sidebar controls
  const openSidebar = useCallback((isOpen) => {
    setIsSidebarOpen(isOpen);
  }, []);
  
  const setNodeForConfig = useCallback((node) => {
    setConfigNode(node);
  }, []);
  
  // Register these functions
  registerSidebarControls(openSidebar, setNodeForConfig);
  
  // The node configuration handler
  const handleNodeConfigure = useCallback((node) => {
    setConfigNode(node);
    setIsSidebarOpen(true);
    return true;
  }, []);
  
  // Register the handler
  useEffect(() => {
    const oldHandler = setConfigureNodeHandler(handleNodeConfigure);
    return () => {
      if (oldHandler) {
        setConfigureNodeHandler(oldHandler);
      }
    };
  }, [handleNodeConfigure]);
  
  const configFunctionRef = useRef(handleNodeConfigure);
  configFunctionRef.current = handleNodeConfigure;
  
  // Initialize nodes with the onConfigure callback
  const [nodes, setNodes, onNodesChange] = useNodesState(
    safeInitialNodes.map(node => ({
      ...node,
      data: {
        ...node.data,
        onConfigure: handleNodeConfigure
      }
    }))
  );
  
  const [edges, setEdges, onEdgesChange] = useEdgesState(safeInitialEdges);
  
  // Update the onConfigure callback whenever nodes change
  const handleNodesChange = useCallback((changes) => {
    onNodesChange(changes);
    
    // After changes, make sure all nodes have the onConfigure callback
    setTimeout(() => {
      setNodes(nds => 
        nds.map(node => ({
          ...node,
          data: {
            ...node.data,
            onConfigure: configFunctionRef.current
          }
        }))
      );
    }, 10);
  }, [onNodesChange, setNodes]);
  
  // Edge click handler
  const onEdgeClick = useCallback((event, edge) => {
    event.stopPropagation();
    setSelectedEdge(edge);
  }, []);
  
  // Pane click handler
  const onPaneClick = useCallback(() => {
    setSelectedEdge(null);
  }, []);
  
  // Delete key handler for edges
  const onKeyDown = useCallback((event) => {
    if (selectedEdge && (event.key === 'Delete' || event.key === 'Backspace')) {
      setEdges((eds) => eds.filter((e) => e.id !== selectedEdge.id));
      setSelectedEdge(null);
    }
  }, [selectedEdge, setEdges]);
  
  // Add key event listener
  useEffect(() => {
    if (selectedEdge) {
      document.addEventListener('keydown', onKeyDown);
      return () => {
        document.removeEventListener('keydown', onKeyDown);
      };
    }
  }, [selectedEdge, onKeyDown]);
  
  // Default edge options
  const defaultEdgeOptions = {
    type: 'custom',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
    style: { stroke: '#555' },
  };
  
  // Edge update handler
  const onEdgeUpdate = useCallback((oldEdge, newConnection) => {
    setEdges(els => els.map(el => 
      el.id === oldEdge.id ? { ...oldEdge, ...newConnection } : el
    ));
  }, [setEdges]);
  
  // Custom event listener
  useEffect(() => {
    // DOM-based mechanism
    const handleCustomConfigEvent = (event) => {
      const { node } = event.detail;
      if (node) {
        // Reset first to force re-render
        setIsSidebarOpen(false);
        setTimeout(() => {
          setConfigNode(node);
          setIsSidebarOpen(true);
        }, 10);
      }
    };
    
    // Listen for the custom event
    window.addEventListener('workflow-editor:configure-node', handleCustomConfigEvent);
    
    // Initialize global config methods
    if (window.__WORKFLOW_EDITOR_CONFIG__) {
      window.__WORKFLOW_EDITOR_CONFIG__.openSidebar = (isOpen) => {
        setIsSidebarOpen(isOpen);
      };
      window.__WORKFLOW_EDITOR_CONFIG__.configNode = (node) => {
        setConfigNode(node);
      };
      window.__WORKFLOW_EDITOR_CONFIG__.process = (node) => {
        // First close the sidebar (if open)
        setIsSidebarOpen(false);
        
        // Wait a moment, then open with the new node
        setTimeout(() => {
          setConfigNode(node);
          setIsSidebarOpen(true);
        }, 50);
        
        return true;
      };
    }
    
    // Function for the sidebar to update node names
    window.updateNodeName = (nodeId, newName) => {
      setNodes((nds) => 
        nds.map((node) => 
          node.id === nodeId ? {
            ...node,
            data: {
              ...node.data,
              label: newName,
              onConfigure: configFunctionRef.current
            }
          } : node
        )
      );
    };
    
    // Clean up
    return () => {
      window.removeEventListener('workflow-editor:configure-node', handleCustomConfigEvent);
      window.updateNodeName = null;
    };
  }, []);
  
  // Edge deletion event listener - improved for better debugging and reliability
  useEffect(() => {
    const handleEdgeDeleteEvent = (event) => {
      const { edgeId } = event.detail;
      if (edgeId) {
        console.log('WorkflowEditor.js: Edge deletion event received for edge:', edgeId);
        
        setEdges((eds) => eds.filter((e) => e.id !== edgeId));
        
        // If we have a selected edge with the same ID, clear the selection
        if (selectedEdge && selectedEdge.id === edgeId) {
          setSelectedEdge(null);
        }
      }
    };
    
    // Register our delete callback with the new utility
    const unregister = registerEdgeDeletionCallback((edgeId) => {
      console.log('WorkflowEditor.js: Edge deletion callback triggered for:', edgeId);
      setEdges((eds) => eds.filter((e) => e.id !== edgeId));
      
      if (selectedEdge && selectedEdge.id === edgeId) {
        setSelectedEdge(null);
      }
    });
    
    // Also keep the event listener for backward compatibility
    window.addEventListener('workflow-edge:delete', handleEdgeDeleteEvent);
    
    return () => {
      window.removeEventListener('workflow-edge:delete', handleEdgeDeleteEvent);
      unregister();
    };
  }, [setEdges, selectedEdge]);
  
  return (
    <>
      <ReactFlowProvider>
        <div 
          style={{ width: '100%', height: '100%', position: 'relative' }}
          tabIndex={0}
          className={styles.workflowEditor}
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={handleNodesChange}
            onEdgesChange={onEdgesChange}
            onEdgeClick={onEdgeClick}
            onPaneClick={onPaneClick}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            defaultEdgeOptions={defaultEdgeOptions}
            onEdgeUpdate={onEdgeUpdate}
            deleteKeyCode={null}
            fitView
          >
            <Background />
            <Controls />
          </ReactFlow>
          
          {/* Edge deletion control */}
          {selectedEdge && (
            <div style={{
              position: 'absolute',
              bottom: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: 'white',
              padding: '8px 16px',
              borderRadius: '4px',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
              zIndex: 1000,
            }}>
              <button 
                onClick={() => {
                  setEdges((eds) => eds.filter((e) => e.id !== selectedEdge.id));
                  setSelectedEdge(null);
                }}
                style={{
                  backgroundColor: '#ff0072',
                  color: 'white',
                  border: 'none',
                  padding: '6px 12px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: '500',
                }}
              >
                Delete Connection
              </button>
            </div>
          )}
        </div>
      </ReactFlowProvider>
      
      {/* Right Sidebar */}
      <RightSidebar
        title="Node Configuration"
        isOpen={isSidebarOpen}
        onClose={() => {
          setIsSidebarOpen(false);
        }}
        onSave={(data) => {
          if (configNode) {
            setNodes((nds) => nds.map((node) => 
              node.id === configNode.id ? {
                ...node,
                data: {
                  ...node.data,
                  label: data.name,
                  onConfigure: configFunctionRef.current // Preserve the callback
                }
              } : node
            ));
          }
          setIsSidebarOpen(false);
        }}
        data={{ 
          name: configNode?.data?.label || 'New Node' 
        }}
      />
    </>
  );
};

export default WorkflowEditor;
