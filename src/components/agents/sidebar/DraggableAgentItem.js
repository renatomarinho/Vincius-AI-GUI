import React from 'react';
import { Box, Text } from '@primer/react';

const DraggableAgentItem = ({ item }) => {
  const onDragStart = (event, nodeType) => {
    // Create a simplified version of the item without circular references
    const dragData = {
      type: nodeType,
      id: item.id,
      label: item.label,
      description: item.description,
      iconType: item.id // Use item.id to identify which icon to use
    };
    
    event.dataTransfer.setData('application/reactflow', JSON.stringify(dragData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <Box
      sx={{
        p: 2,
        mb: 2,
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'border.default',
        bg: 'canvas.subtle',
        cursor: 'grab',
        transition: 'all 0.2s ease',
        '&:hover': {
          bg: 'canvas.inset',
          transform: 'translateY(-2px)'
        },
        '&:active': {
          cursor: 'grabbing'
        }
      }}
      draggable
      onDragStart={(e) => onDragStart(e, 'customNode')}
      data-testid={`draggable-${item.id}`}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Box sx={{ mr: 2, color: 'accent.fg' }}>{item.icon}</Box>
        <Text sx={{ fontWeight: 'bold', fontSize: 1 }}>{item.label}</Text>
      </Box>
      <Text sx={{ fontSize: 0, color: 'fg.muted', display: 'block', lineHeight: 1.4 }}>
        {item.description}
      </Text>
    </Box>
  );
};

export default DraggableAgentItem;
