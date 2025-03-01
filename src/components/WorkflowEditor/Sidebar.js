import React from 'react';
import { Box, Heading, Text } from '@primer/react';
import { 
  DatabaseIcon, 
  CodeIcon, 
  FilterIcon, 
  GearIcon, 
  GraphIcon, 
  HubotIcon, 
  TableIcon, 
  PulseIcon,
  FileIcon,
  TerminalIcon,
  BroadcastIcon
} from '@primer/octicons-react';

import styles from './WorkflowEditor.module.css';

const nodeCategories = [
  {
    name: 'Sources',
    nodes: [
      { type: 'input', name: 'Database Source', icon: DatabaseIcon, inputs: [], outputs: ['data'] },
      { type: 'input', name: 'API Source', icon: BroadcastIcon, inputs: [], outputs: ['data'] },
      { type: 'input', name: 'File Input', icon: FileIcon, inputs: [], outputs: ['data'] },
    ],
  },
  {
    name: 'Processing',
    nodes: [
      { type: 'process', name: 'Filter Data', icon: FilterIcon, inputs: ['data'], outputs: ['filtered'] },
      { type: 'process', name: 'Transform', icon: CodeIcon, inputs: ['data'], outputs: ['transformed'] },
      { type: 'process', name: 'Aggregate', icon: TableIcon, inputs: ['data'], outputs: ['aggregated'] },
      { type: 'process', name: 'AI Agent', icon: HubotIcon, inputs: ['prompt'], outputs: ['response'] },
    ],
  },
  {
    name: 'Outputs',
    nodes: [
      { type: 'output', name: 'Visualization', icon: GraphIcon, inputs: ['data'], outputs: [] },
      { type: 'output', name: 'Export Data', icon: DatabaseIcon, inputs: ['data'], outputs: [] },
      { type: 'output', name: 'API Output', icon: TerminalIcon, inputs: ['data'], outputs: [] },
    ],
  },
  {
    name: 'Utilities',
    nodes: [
      { type: 'utility', name: 'Custom Script', icon: CodeIcon, inputs: ['input'], outputs: ['output'] },
      { type: 'utility', name: 'Monitoring', icon: PulseIcon, inputs: ['data'], outputs: ['alerts'] },
      { type: 'utility', name: 'Configuration', icon: GearIcon, inputs: ['settings'], outputs: ['config'] },
    ],
  },
];

const Sidebar = () => {
  const onDragStart = (event, nodeType, node) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.setData('node', JSON.stringify(node));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <Box p={3}>
      <Heading as="h2" sx={{ fontSize: 2, mb: 3 }}>Workflow Components</Heading>
      
      {nodeCategories.map((category) => (
        <Box key={category.name} mb={3}>
          <Text className={styles.nodeCategory}>{category.name}</Text>
          {category.nodes.map((node) => (
            <div 
              key={node.name}
              className={styles.dndNode}
              onDragStart={(event) => onDragStart(event, 'customNode', node)}
              draggable
            >
              <node.icon size={16} />
              <span>{node.name}</span>
            </div>
          ))}
        </Box>
      ))}

      <Text 
        as="p" 
        sx={{ 
          mt: 4,
          fontSize: 1, 
          color: 'text.secondary',
          borderTop: '1px solid',
          borderColor: 'border.default',
          pt: 2
        }}
      >
        Drag and drop components to create your workflow
      </Text>
    </Box>
  );
};

export default Sidebar;
