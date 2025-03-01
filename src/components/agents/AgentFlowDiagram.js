import React, { useCallback, useRef, useState, useEffect } from 'react';
import {
  ReactFlow,
  Background,
  Panel,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  ReactFlowProvider,
  useReactFlow,
} from '@xyflow/react';
import dagre from '@dagrejs/dagre';
import { Button, Box, ButtonGroup, ActionList, ActionMenu, Text } from '@primer/react';
import { 
  BeakerIcon, 
  CodeIcon, 
  ChecklistIcon, 
  CommentDiscussionIcon,
  PlusIcon,
  TrashIcon,
} from '@primer/octicons-react';

import '@xyflow/react/dist/style.css';
 
import { initialNodes, initialEdges } from './initialElements';
import CustomNode from './CustomNode';
import ApiIcon from './ApiIcon';

// Map item IDs to their corresponding icons
const getIconForType = (iconType) => {
  console.log('Getting icon for type:', iconType);
  
  // Map de ícones para garantir mapeamento correto
  const iconMap = {
    'beaker': <BeakerIcon size={16} />,
    'code': <CodeIcon size={16} />,
    'checklist': <ChecklistIcon size={16} />,
    'comment-discussion': <CommentDiscussionIcon size={16} />,
    'api': <ApiIcon size={16} />
  };
  
  return iconMap[iconType] || <div>•</div>;
};

// Define custom node types
const nodeTypes = {
  customNode: CustomNode,
};

// Sample nodes para adicionar diretamente
const sampleAgents = [
  {
    id: 'analyst',
    label: 'Analyst',
    description: 'Analyzes data and provides insights',
    iconType: 'beaker',
    type: 'agent'
  },
  {
    id: 'developer',
    label: 'Developer',
    description: 'Writes and optimizes code',
    iconType: 'code',
    type: 'agent'
  },
  {
    id: 'connector',
    label: 'API Connector',
    description: 'Makes external API calls',
    iconType: 'api',
    type: 'connector'
  }
];

// Layout utilities
const nodeWidth = 180;
const nodeHeight = 100;
const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

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

// Flow component with useReactFlow hook
const FlowWithProvider = () => {
  const reactFlowWrapper = useRef(null);
  const reactFlow = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStartNodeId, setConnectionStartNodeId] = useState(null);

  // Inicializar o diagrama com layout predefinido quando o componente montar
  useEffect(() => {
    if (initialNodes.length > 0 && !isLoaded) {
      const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
        initialNodes,
        initialEdges,
        'TB'
      );
      setNodes(layoutedNodes);
      setEdges(layoutedEdges);
      setIsLoaded(true);
    }
  }, [setNodes, setEdges, isLoaded]);
 
  const onConnectStart = useCallback((event, { nodeId, handleId, handleType }) => {
    console.log('Connection start:', { nodeId, handleId, handleType });
    setIsConnecting(true);
    setConnectionStartNodeId(nodeId);
    document.body.classList.add('connecting');
    
    // Adicionar classe especial ao nó de origem e aos potenciais alvos
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId) {
          // Node de origem
          return {
            ...node,
            data: {
              ...node.data,
              isConnectionSource: true,
            },
          };
        } else {
          // Potenciais alvos
          return {
            ...node,
            data: {
              ...node.data,
              isConnectionTarget: true,
            },
          };
        }
      })
    );
  }, [setNodes]);

  const onConnectEnd = useCallback((event) => {
    console.log('Connection end', event);
    setIsConnecting(false);
    setConnectionStartNodeId(null);
    document.body.classList.remove('connecting');
    
    // Resetar estados de conexão
    setNodes((nds) =>
      nds.map((node) => ({
        ...node,
        data: {
          ...node.data,
          isConnectionSource: false,
          isConnectionTarget: false,
        },
      }))
    );
  }, [setNodes]);

  const onConnect = useCallback(
    (params) => {
      console.log('Connection established with params:', params);
      
      // Adicionar conexão com parâmetros básicos para garantir funcionamento
      setEdges((eds) => 
        addEdge({
          ...params,
          type: 'smoothstep',
          animated: true,
          style: {
            stroke: '#2ecc71',
            strokeWidth: 2,
          },
        }, eds)
      );
    },
    [setEdges],
  );

  const onLayout = useCallback(
    (direction) => {
      if (nodes.length === 0) return;
      
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

  const addNewNode = useCallback((agentData) => {
    // Using the viewport center with some offset for position
    const { x, y, zoom } = reactFlow.getViewport();
    
    const width = reactFlowWrapper.current.offsetWidth || 1000;
    const height = reactFlowWrapper.current.offsetHeight || 800;
    
    // Calculate a position relative to the viewport center
    const position = reactFlow.screenToFlowPosition({
      x: width / 2 + Math.random() * 100 - 50,
      y: height / 2 + Math.random() * 100 - 50,
    });
    
    console.log('Adding node at position:', position);
    
    const icon = getIconForType(agentData.iconType);
    
    const newNode = {
      id: `${agentData.id}-${Date.now()}`,
      type: 'customNode',
      position,
      data: {
        label: agentData.label,
        description: agentData.description,
        icon: icon,
        type: agentData.type,
      },
    };

    console.log('Adding new node:', newNode);
    setNodes((nds) => nds.concat(newNode));
  }, [reactFlow, setNodes]);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      console.log('Drop event triggered');

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const draggedData = event.dataTransfer.getData('application/reactflow');
      
      // Check if we have valid data
      if (!draggedData || typeof draggedData !== 'string') {
        console.log('No valid drag data found');
        return;
      }

      try {
        const parsedData = JSON.parse(draggedData);
        console.log('Parsed drag data:', parsedData);

        // Get the position where the element was dropped
        const position = reactFlow.screenToFlowPosition({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });
        
        console.log('Calculated position:', position);

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
            type: parsedData.nodeType || 'custom',
          },
        };
        console.log('Created new node:', newNode);

        setNodes((nds) => nds.concat(newNode));
      } catch (error) {
        console.error('Error adding new node:', error);
      }
    },
    [reactFlow, setNodes],
  );

  const onSelectionDelete = useCallback(() => {
    setNodes(nodes => nodes.filter(node => !node.selected));
    setEdges(edges => edges.filter(edge => !edge.selected));
  }, [setNodes, setEdges]);

  return (
    <div className="flow-wrapper" ref={reactFlowWrapper} style={{ width: '100%', height: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onConnectStart={onConnectStart}
        onConnectEnd={onConnectEnd}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={{
          type: 'smoothstep',
          animated: true,
        }}
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
            
            <ActionMenu>
              <ActionMenu.Button>
                <PlusIcon size={16} /> Add Node
              </ActionMenu.Button>
              <ActionMenu.Overlay>
                <ActionList>
                  {sampleAgents.map((agent) => (
                    <ActionList.Item 
                      key={agent.id}
                      onSelect={() => addNewNode(agent)}
                    >
                      {agent.label}
                    </ActionList.Item>
                  ))}
                </ActionList>
              </ActionMenu.Overlay>
            </ActionMenu>

            <Button onClick={onSelectionDelete} variant="danger" size="small">
              <TrashIcon size={16} /> Delete Selected
            </Button>
          </Box>
        </Panel>
        <Controls />
        <Background gap={16} size={1} />
      </ReactFlow>
      
      {isConnecting && (
        <Box
          sx={{
            position: 'absolute',
            top: '10px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'success.emphasis',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '4px',
            zIndex: 1000,
            boxShadow: '0 3px 8px rgba(0,0,0,0.3)',
          }}
        >
          <Text sx={{ fontSize: 1, color: 'white' }}>Connecting... Drag to connect nodes</Text>
        </Box>
      )}
    </div>
  );
};

// Wrapper component that provides the ReactFlow context
const AgentFlowDiagram = () => {
  return (
    <ReactFlowProvider>
      <FlowWithProvider />
    </ReactFlowProvider>
  );
};

export default AgentFlowDiagram;