import React from 'react';
import { Box, Heading, Text } from '@primer/react';
import AgentsService from '../Agents/AgentsService';
import styles from './WorkflowEditor.module.css';

const Sidebar = () => {
  // Get agent categories from the AgentsService
  const nodeCategories = AgentsService.getAgentCategories();
  
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
