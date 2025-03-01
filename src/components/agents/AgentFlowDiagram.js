import React, { useCallback, useRef, useState } from 'react';
import {
  ReactFlow,
  Background,
  Panel,
  addEdge,
  ConnectionLineType,
  useNodesState,
  useEdgesState,
  Controls,
} from '@xyflow/react';
import dagre from '@dagrejs/dagre';
import { Button, Box, ButtonGroup } from '@primer/react';
import { 
  BeakerIcon, 
  CodeIcon, 
  ChecklistIcon, 
  CommentDiscussionIcon
} from '@primer/octicons-react';

import '@xyflow/react/dist/style.css';
 
import { initialNodes, initialEdges } from './initialElements';
import CustomNode from './CustomNode';
import ApiIcon from './ApiIcon';
import BotIcon from './BotIcon';
import BrainIcon from './BrainIcon';
 
const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
 
const nodeWidth = 180;
const nodeHeight = 80;
 
const getLayoutedElements = (nodes, edges, direction = 'TB') => {
  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ rankdir: direction });
 
  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });
 
  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });
 
  dagre.layout(dagreGraph);
 
  const newNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    const newNode = {
      ...node,
      targetPosition: isHorizontal ? 'left' : 'top',
      sourcePosition: isHorizontal ? 'right' : 'bottom',
      position: {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      },
    };
 
    return newNode;
  });
 
  return { nodes: newNodes, edges };
};

// Map item IDs to their corresponding icons
const getIconForType = (iconType) => {
  switch (iconType) {
    case 'analyst':
      return <BeakerIcon size={16} />;
    case 'developer':
      return <CodeIcon size={16} />;
    case 'tester':
      return <ChecklistIcon size={16} />;
    case 'prompter':
      return <CommentDiscussionIcon size={16} />;
    case 'apiRequests':
      return <ApiIcon size={16} />;
    default:
      return null;
  }
};

// Define custom node types
const nodeTypes = {
  customNode: CustomNode,
};
 
const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
  initialNodes,
  initialEdges,
);
 
const AgentFlowDiagram = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);
 
  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          { ...params, type: ConnectionLineType.SmoothStep, animated: true },
          eds,
        ),
      ),
    [setEdges],
  );

  const onLayout = useCallback(
    (direction) => {
      const { nodes: layoutedNodes, edges: layoutedEdges } =
        getLayoutedElements(nodes, edges, direction);
 
      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);
    },
    [nodes, edges, setNodes, setEdges],
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const draggedData = event.dataTransfer.getData('application/reactflow');
      
      // Check if we have valid data
      if (!draggedData || typeof draggedData !== 'string') {
        return;
      }

      try {
        const parsedData = JSON.parse(draggedData);

        // Get the position where the element was dropped
        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        // Get the appropriate icon based on the iconType
        const icon = getIconForType(parsedData.iconType);

        // Create a new node with a unique ID
        const newNode = {
          id: `${parsedData.id}-${Date.now()}`,
          type: 'customNode',
          position,
          data: { 
            label: parsedData.label,
            description: parsedData.description,
            icon: icon,
            type: parsedData.type || 'custom',
          },
        };

        setNodes((nds) => nds.concat(newNode));
      } catch (error) {
        console.error('Error adding new node:', error);
      }
    },
    [reactFlowInstance, setNodes],
  );

  return (
    <div ref={reactFlowWrapper} style={{ width: '100%', height: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        connectionLineType={ConnectionLineType.SmoothStep}
        onInit={setReactFlowInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
        fitView
        style={{ backgroundColor: "var(--color-canvas-subtle)" }}
        minZoom={0.2}
        maxZoom={1.5}
        defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
      >
        <Panel position="top-right">
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            <ButtonGroup>
              <Button onClick={() => onLayout('TB')} variant="outline" size="small">
                Vertical Layout
              </Button>
              <Button onClick={() => onLayout('LR')} variant="outline" size="small">
                Horizontal Layout
              </Button>
            </ButtonGroup>
          </Box>
        </Panel>
        <Controls />
        <Background gap={16} size={1} />
      </ReactFlow>
    </div>
  );
};

export default AgentFlowDiagram;