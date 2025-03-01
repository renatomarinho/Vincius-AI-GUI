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
  MarkerType,
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

// Ícones para os diferentes tipos de nós
const iconMap = {
  'beaker': <BeakerIcon size={16} />,
  'code': <CodeIcon size={16} />,
  'checklist': <ChecklistIcon size={16} />,
  'comment-discussion': <CommentDiscussionIcon size={16} />,
  'api': <ApiIcon size={16} />
};

// Função auxiliar para obter ícone pelo tipo
const getIconForType = (iconType) => {
  return iconMap[iconType] || <div>•</div>;
};

// Tipos de nós personalizados
const nodeTypes = {
  customNode: CustomNode,
};

// Agents disponíveis para adicionar
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
  if (!nodes.length) return { nodes: [], edges };
  
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
    
    if (!nodeWithPosition) {
      return node;
    }
    
    return {
      ...node,
      targetPosition: isHorizontal ? 'left' : 'top',
      sourcePosition: isHorizontal ? 'right' : 'bottom',
      position: {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      },
    };
  });
 
  return { nodes: newNodes, edges };
};

// Flow component com hook useReactFlow
const FlowWithProvider = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  // Inicializar o diagrama com o layout
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

  // SOLUÇÃO PARA LINHAS DE CONEXÃO: Configuração mais simples possível
  const onConnect = useCallback((params) => {
    // Apenas adicione a conexão da forma mais simples possível
    setEdges((eds) => addEdge(params, eds));
  }, [setEdges]);

  const onConnectStart = useCallback(() => {
    setIsConnecting(true);
  }, []);

  const onConnectEnd = useCallback(() => {
    setIsConnecting(false);
  }, []);

  // Reorganizar o layout dos elementos
  const onLayout = useCallback((direction) => {
    if (!nodes.length) return;
    
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      nodes, 
      edges, 
      direction
    );

    setNodes([...layoutedNodes]);
    setEdges([...layoutedEdges]);
  }, [nodes, edges, setNodes, setEdges]);

  // Handle drag & drop para adicionar novos nós
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  // Adicionar novo nó manualmente pelo menu - CORRIGIDO
  const addNewNode = useCallback((agentData) => {
    // Usar coordenadas absolutas em vez de tentar transformar
    // Como estamos adicionando um nó via botão, podemos usar posição fixa
    const position = {
      x: 100 + Math.random() * 200, 
      y: 100 + Math.random() * 200
    };

    console.log('Adding new node at position:', position);

    const newNode = {
      id: `${agentData.id}-${Date.now()}`,
      type: 'customNode',
      position: position,
      data: {
        label: agentData.label,
        description: agentData.description,
        icon: getIconForType(agentData.iconType),
        type: agentData.type,
      },
    };

    // Usar uma função que não depende de ReactFlow
    setNodes((nds) => [...nds, newNode]);
  }, [setNodes]); // Remover dependência do reactFlow

  // Drag & drop para adicionar novos nós - CORRIGIDO
  const onDrop = useCallback((event) => {
    event.preventDefault();

    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const draggedData = event.dataTransfer.getData('application/reactflow');
    
    if (!draggedData) return;

    try {
      const parsedData = JSON.parse(draggedData);

      // Calcular posição baseada na posição do mouse
      const position = {
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top
      };
      
      console.log('Dropping node at position:', position);

      const newNode = {
        id: `node-${Date.now()}`,
        type: 'customNode',
        position,
        data: { 
          label: parsedData.label || 'New Node',
          description: parsedData.description || '',
          icon: getIconForType(parsedData.iconType || 'api'),
          type: parsedData.nodeType || 'custom',
        },
      };

      setNodes((nds) => [...nds, newNode]);
    } catch (error) {
      console.error('Error adding new node:', error);
    }
  }, [setNodes]); // Remover dependência do reactFlow

  // Excluir nós e conexões selecionados
  const onSelectionDelete = useCallback(() => {
    setNodes((nds) => nds.filter((node) => !node.selected));
    setEdges((eds) => eds.filter((edge) => !edge.selected));
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
        onDrop={onDrop}
        onDragOver={onDragOver}
        fitView
        style={{ backgroundColor: "var(--color-canvas-subtle)" }}
        // CONFIGURAÇÕES SIMPLIFICADAS PARA EVITAR CONFLITOS
        connectionLineType="default"
        connectionLineStyle={{
          stroke: '#000',
          strokeWidth: 2,
        }}
        snapToGrid={true}
        snapGrid={[15, 15]}
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
            zIndex: 10,
          }}
        >
          <Text sx={{ fontSize: 1, color: 'white' }}>Connecting...</Text>
        </Box>
      )}
    </div>
  );
};

// Wrapper com ReactFlowProvider
const AgentFlowDiagram = () => {
  return (
    <ReactFlowProvider>
      <FlowWithProvider />
    </ReactFlowProvider>
  );
};

export default AgentFlowDiagram;