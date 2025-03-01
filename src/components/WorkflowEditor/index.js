import React, { useState, useCallback, useRef } from 'react';
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
  useStore,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { Box, Button } from '@primer/react';
import { PlayIcon, DownloadIcon, TrashIcon } from '@primer/octicons-react';

import Sidebar from './Sidebar';
import CustomNode from './CustomNode';
import { getLayoutedElements } from './layout';
import styles from './WorkflowEditor.module.css';

// Node types definition for custom nodes
const nodeTypes = {
  customNode: CustomNode,
};

const initialNodes = [];
const initialEdges = [];

// This component handles the ReactFlow functionality
const ReactFlowComponent = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const reactFlowWrapper = useRef(null);
  const { getViewport } = useReactFlow();

  const onConnect = useCallback(
    (params) => setEdges((eds) => 
      addEdge({ 
        ...params, 
        animated: true,
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

      // Get viewport information (zoom & position)
      const { zoom, x, y } = getViewport();
      
      // Calculate position based on the drop coordinates and current viewport
      const position = {
        x: (event.clientX - reactFlowBounds.left - x) / zoom,
        y: (event.clientY - reactFlowBounds.top - y) / zoom,
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

      setNodes((nds) => nds.concat(newNode));
    },
    [getViewport, setNodes]
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
    <Box className={styles.workflowEditor}>
      <ReactFlowProvider>
        <ReactFlowComponent />
      </ReactFlowProvider>
    </Box>
  );
};

export default WorkflowEditor;
