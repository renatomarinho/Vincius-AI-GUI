import React, { useState, useCallback, useRef, useEffect } from 'react';
import { 
  ReactFlow, 
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  Panel,
  MarkerType,
  useReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { Box, Button } from '@primer/react';
import { PlayIcon, DownloadIcon, TrashIcon } from '@primer/octicons-react';

import Sidebar from './Sidebar';
import CustomNode from './CustomNode';
import CustomEdge from './CustomEdge';
import { getLayoutedElements } from './layout';
import styles from './WorkflowEditor.module.css';

// Node types definition for custom nodes
const nodeTypes = {
  customNode: CustomNode,
};

// Edge types definition
const edgeTypes = {
  customEdge: CustomEdge,
};

const initialNodes = [];
const initialEdges = [];

// This component handles the ReactFlow functionality
const ReactFlowComponent = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const reactFlowWrapper = useRef(null);
  const { getViewport, setViewport } = useReactFlow();

  // Add edge deletion event listener
  useEffect(() => {
    const handleEdgeDeleteEvent = (event) => {
      const { edgeId } = event.detail;
      if (edgeId) {
        console.log('Index.js: Edge deletion event received for edge:', edgeId);
        
        // Delete the edge
        setEdges((eds) => {
          console.log('Current edges:', eds);
          const updatedEdges = eds.filter((e) => e.id !== edgeId);
          console.log('Updated edges:', updatedEdges);
          return updatedEdges;
        });
      }
    };
    
    console.log('Index.js: Setting up workflow-edge:delete event listener');
    window.addEventListener('workflow-edge:delete', handleEdgeDeleteEvent);
    
    return () => {
      console.log('Index.js: Removing workflow-edge:delete event listener');
      window.removeEventListener('workflow-edge:delete', handleEdgeDeleteEvent);
    };
  }, [setEdges]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => 
      addEdge({ 
        ...params, 
        animated: true,
        type: 'customEdge',
        style: { stroke: '#3182ce' },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: '#3182ce',
        },
      }, eds)
    ),
    [setEdges]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');
      const nodeData = JSON.parse(event.dataTransfer.getData('node'));

      // Check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      // Save current viewport state before adding the node
      const currentViewport = getViewport();
      
      // Calculate position based on the drop coordinates and current viewport
      const position = {
        x: (event.clientX - reactFlowBounds.left - currentViewport.x) / currentViewport.zoom,
        y: (event.clientY - reactFlowBounds.top - currentViewport.y) / currentViewport.zoom,
      };

      const newNode = {
        id: `${nodeData.type}-${Date.now()}`,
        type: 'customNode',
        position,
        data: { 
          label: nodeData.name,
          type: nodeData.type,
          inputs: nodeData.inputs || [],
          outputs: nodeData.outputs || [],
          icon: nodeData.icon,
        },
      };

      // Add the new node
      setNodes((nds) => nds.concat(newNode));
      
      // Use setTimeout to ensure the viewport is restored after React has processed state updates
      setTimeout(() => {
        // Restore the previous viewport settings to maintain zoom level
        setViewport({
          x: currentViewport.x,
          y: currentViewport.y,
          zoom: currentViewport.zoom
        });
      }, 0);
    },
    [getViewport, setNodes, setViewport]
  );

  const onLayout = useCallback(() => {
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      nodes,
      edges
    );
    setNodes([...layoutedNodes]);
    setEdges([...layoutedEdges]);
  }, [nodes, edges, setNodes, setEdges]);

  const onSave = useCallback(() => {
    // Use ReactFlow component API via getViewport
    const flow = {
      nodes,
      edges,
      viewport: getViewport(),
    };
    localStorage.setItem('workflow', JSON.stringify(flow));
  }, [nodes, edges, getViewport]);

  const onRestore = useCallback(() => {
    const flow = JSON.parse(localStorage.getItem('workflow'));
    
    if (flow) {
      setNodes(flow.nodes || []);
      setEdges(flow.edges || []);
    }
  }, [setNodes, setEdges]);

  const onClear = () => {
    setNodes([]);
    setEdges([]);
  };

  return (
    <>
      <Box className={styles.sidebar}>
        <Sidebar />
      </Box>
      <Box 
        className={styles.reactflowWrapper}
        ref={reactFlowWrapper}
        onDrop={onDrop}
        onDragOver={onDragOver}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          defaultEdgeOptions={{
            type: 'customEdge',
            markerEnd: {
              type: MarkerType.ArrowClosed,
            }
          }}
          fitView
        >
          <Controls />
          <Background variant="dots" gap={12} size={1} />
          <Panel position="top-right">
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button onClick={onLayout} leadingIcon={PlayIcon}>Auto Layout</Button>
              <Button onClick={onSave} leadingIcon={DownloadIcon}>Save</Button>
              <Button onClick={onRestore}>Restore</Button>
              <Button variant="danger" onClick={onClear} leadingIcon={TrashIcon}>Clear</Button>
            </Box>
          </Panel>
        </ReactFlow>
      </Box>
    </>
  );
};

// This is the main wrapper component that provides the ReactFlow context
const WorkflowEditor = () => {
  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute' }}>
      <ReactFlowProvider>
        <ReactFlowComponent />
      </ReactFlowProvider>
    </div>
  );
};

export default WorkflowEditor;
