import React, { useCallback } from 'react';
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
import { ScreenNormalIcon, ScreenFullIcon } from '@primer/octicons-react';
 
import '@xyflow/react/dist/style.css';
 
import { initialNodes, initialEdges } from './initialElements';
import CustomNode from './CustomNode';
 
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

// Define custom node types
const nodeTypes = {
  customNode: CustomNode,
};
 
const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
  initialNodes,
  initialEdges,
);
 
const AgentFlowDiagram = () => {
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
    [],
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

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      connectionLineType={ConnectionLineType.SmoothStep}
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
  );
};

export default AgentFlowDiagram;