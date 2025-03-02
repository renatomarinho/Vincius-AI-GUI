import React, { useState, useCallback, useEffect, useRef, useLayoutEffect } from 'react';
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
import { setConfigureNodeHandler, isHandlerRegistered, registerSidebarControls, getDebugInfo } from './NodeConfigEvents';
import styles from './WorkflowEditor.module.css';

const nodeTypes = {
  custom: CustomNode,
};

const edgeTypes = {
  custom: CustomEdge,
};

// Global force-open function for testing
window.forceOpenSidebar = function() {
  // Will be implemented inside the component
  console.log("Global force open function called, but not yet implemented");
};

const WorkflowEditor = ({ initialNodes = [], initialEdges = [] }) => {
  const safeInitialNodes = createSafeNodes(initialNodes);
  const safeInitialEdges = createSafeEdges(initialEdges);
  
  // State declarations
  const [selectedEdge, setSelectedEdge] = useState(null);
  const [configNode, setConfigNode] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [debugInfo, setDebugInfo] = useState('No edge selected');
  
  // Register the sidebar controls immediately after defining the functions
  const openSidebar = useCallback((isOpen) => {
    console.log('Setting sidebar open state to:', isOpen);
    setIsSidebarOpen(isOpen);
  }, []);
  
  const setNodeForConfig = useCallback((node) => {
    console.log('Setting node for config:', node);
    setConfigNode(node);
  }, []);
  
  // Register these functions IMMEDIATELY, not in useEffect
  registerSidebarControls(openSidebar, setNodeForConfig);
  
  // Also verify registration in an effect
  useEffect(() => {
    if (!areSidebarControlsRegistered()) {
      console.log('Sidebar controls not registered, re-registering');
      registerSidebarControls(openSidebar, setNodeForConfig);
    }
  }, [openSidebar, setNodeForConfig]);
  
  // The node configuration handler
  const handleNodeConfigure = useCallback((node) => {
    console.log('handleNodeConfigure called with:', node);
    setConfigNode(node);
    setIsSidebarOpen(true);
    return true;
  }, []);
  
  // Register the handler
  useEffect(() => {
    console.log('Registering node configure handler');
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
  
  // Debug - Force open sidebar with test node
  const testSidebar = useCallback(() => {
    console.log('Force opening sidebar for test');
    const testNode = {
      id: 'test-node',
      data: { label: 'Test Node' }
    };
    setNodeForConfig(testNode);
    openSidebar(true);
  }, [openSidebar, setNodeForConfig]);
  
  // Run test on mount (optional)
  useEffect(() => {
    // Wait a moment then run a test
    const timer = setTimeout(testSidebar, 1000);
    return () => clearTimeout(timer);
  }, [testSidebar]);
  
  // Add a custom event listener to handle configuration requests
  useEffect(() => {
    // DOM-based fallback mechanism
    const handleCustomConfigEvent = (event) => {
      console.log('Custom config event received:', event.detail);
      const { node } = event.detail;
      if (node) {
        console.log('Configuring node from custom event - FORCE SETTING STATE:', node);
        // Force state update
        setIsSidebarOpen(false); // Reset first to force re-render
        setTimeout(() => {
          setConfigNode(node);
          setIsSidebarOpen(true);
          console.log("STATE UPDATED: isSidebarOpen =", true);
        }, 10);
      }
    };
    
    // Make force function available globally for debugging
    window.forceOpenSidebar = () => {
      console.log("Forcing sidebar open from global method");
      const testNode = { id: 'test-forced', data: { label: 'Test Forced' } };
      setConfigNode(testNode);
      setIsSidebarOpen(true);
      
      // Double-check after a delay
      setTimeout(() => {
        console.log("Checking sidebar state:", { 
          isOpen: isSidebarOpen, 
          configNode: configNode 
        });
      }, 100);
    };
    
    // Listen for the custom event
    window.addEventListener('workflow-editor:configure-node', handleCustomConfigEvent);
    
    // Also initialize the global config object with direct methods to our state setters
    if (window.__WORKFLOW_EDITOR_CONFIG__) {
      console.log('Setting up global DOM fallback methods');
      window.__WORKFLOW_EDITOR_CONFIG__.openSidebar = (isOpen) => {
        console.log('Opening sidebar via global DOM method:', isOpen);
        setIsSidebarOpen(isOpen);
        // Force a check after a short delay
        setTimeout(() => {
          console.log("Sidebar state after DOM method:", isSidebarOpen);
        }, 100);
      };
      window.__WORKFLOW_EDITOR_CONFIG__.configNode = (node) => {
        console.log('Setting config node via global DOM method:', node);
        setConfigNode(node);
      };
      window.__WORKFLOW_EDITOR_CONFIG__.process = (node) => {
        console.log('Processing node via global DOM method:', node);
        
        // First close the sidebar (if open)
        setIsSidebarOpen(false);
        
        // Wait a moment, then open with the new node
        setTimeout(() => {
          setConfigNode(node);
          setIsSidebarOpen(true);
          console.log("Sidebar should now be open with node:", node);
        }, 50);
        
        return true;
      };
    }
    
    // Function for the emergency sidebar to update node names
    window.updateNodeName = (nodeId, newName) => {
      console.log(`Updating node ${nodeId} with name ${newName}`);
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
      window.forceOpenSidebar = () => console.log("Component unmounted");
      window.updateNodeName = null;
    };
  }, []); // Empty deps to ensure this runs once on mount
  
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
            
            <Panel position="top-left">
              <div style={{ padding: '0px', background: 'white', borderRadius: '4px' }}>
                <div>{debugInfo}</div>
                <div style={{ fontSize: '12px', marginTop: '0', color: '#666' }}>
                  Handler registered: {getDebugInfo().isHandlerRegistered ? 'Yes' : 'No'}<br/>
                  Sidebar controls: {getDebugInfo().hasSidebarControls ? 'Yes' : 'No'}<br/>
                  Pending configs: {getDebugInfo().pendingConfigurationsCount}
                </div>
              </div>
            </Panel>
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
          
          {/* Remove Debug buttons - they're only for development/testing */}
          {/* These debug buttons were added for testing sidebar functionality 
              and are not needed in production code */}
          
          {/* Right sidebar highlight debugging element can be removed too */}
          
        </div>
      </ReactFlowProvider>
      
      {/* Right Sidebar */}
      <RightSidebar
        title="Node Configuration"
        isOpen={isSidebarOpen}
        onClose={() => {
          console.log('Closing sidebar');
          setIsSidebarOpen(false);
        }}
        onSave={(data) => {
          console.log('Saving data:', data);
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
