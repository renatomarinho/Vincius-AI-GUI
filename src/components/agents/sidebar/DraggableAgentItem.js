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
      iconType: item.id, // Usar o ID como tipo de ícone
      nodeType: item.type // Pass the node type (agent or connector)
    };
    
    const serializedData = JSON.stringify(dragData);
    console.log('Starting drag with data:', dragData);
    
    // Definir os dados de arrasto em vários formatos para maior compatibilidade
    event.dataTransfer.setData('application/reactflow', serializedData);
    event.dataTransfer.setData('text/plain', serializedData);
    event.dataTransfer.effectAllowed = 'move';
    
    // Adicionar uma imagem de arrasto (opcional)
    const dragPreview = document.createElement('div');
    dragPreview.innerHTML = item.label;
    dragPreview.style.backgroundColor = 'var(--color-accent-subtle)';
    dragPreview.style.padding = '8px';
    dragPreview.style.borderRadius = '4px';
    dragPreview.style.color = 'var(--color-fg-default)';
    dragPreview.style.position = 'absolute';
    dragPreview.style.top = '-1000px';
    document.body.appendChild(dragPreview);

    event.dataTransfer.setDragImage(dragPreview, 20, 20);
    
    // Limpar elemento após curto período
    setTimeout(() => {
      document.body.removeChild(dragPreview);
    }, 100);
  };

  return (
    <Box
      sx={{
        p: 2,
        mb: 2,
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'border.default',
        bg: item.type === 'agent' ? 'accent.subtle' : 'success.subtle',
        cursor: 'grab',
        transition: 'all 0.2s ease',
        userSelect: 'none', // Prevenir seleção de texto durante arrasto
        '&:hover': {
          bg: item.type === 'agent' ? 'accent.muted' : 'success.muted',
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
      <Text sx={{ fontSize: '11px', fontWeight: 'bold', mb: 1, textTransform: 'uppercase', color: item.type === 'agent' ? 'accent.fg' : 'success.fg' }}>
        {item.category}
      </Text>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Box sx={{ mr: 2, color: item.type === 'agent' ? 'accent.fg' : 'success.fg' }}>{item.icon}</Box>
        <Text sx={{ fontWeight: 'bold', fontSize: 1 }}>{item.label}</Text>
      </Box>
      <Text sx={{ fontSize: 0, color: 'fg.muted', display: 'block', lineHeight: 1.4 }}>
        {item.description}
      </Text>
    </Box>
  );
};

export default DraggableAgentItem;
