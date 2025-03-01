import React, { memo, useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Box, Text } from '@primer/react';
import NodeHeader from './NodeHeader';

const getNodeHeaderColor = (nodeType) => {
  switch (nodeType) {
    case 'agent':
      return { bg: 'var(--color-accent-subtle)', text: 'var(--color-accent-fg)' };
    case 'connector':
      return { bg: 'var(--color-success-subtle)', text: 'var(--color-success-fg)' };
    default:
      return { bg: 'var(--color-neutral-subtle)', text: 'var(--color-neutral-fg)' };
  }
};

const CustomNode = ({ data, isConnectable, selected }) => {
  const [isHovered, setIsHovered] = useState(false);
  const headerColors = getNodeHeaderColor(data.type);

  // Versão simplificada do estilo dos handles para garantir funcionamento básico
  const baseHandleStyle = {
    width: 10,
    height: 10,
    background: 'var(--color-success-emphasis)',
    border: '1px solid #fff',
  };

  return (
    <Box
      sx={{
        borderRadius: 2,
        border: '1px solid',
        borderColor: selected ? 'accent.emphasis' : 'border.default',
        borderWidth: selected ? 2 : 1,
        backgroundColor: 'canvas.default',
        width: 180,
        fontFamily: 'var(--font-family)',
        boxShadow: selected 
          ? '0 0 0 2px var(--color-accent-muted), 0 4px 8px rgba(0, 0, 0, 0.2)' 
          : '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
        position: 'relative',
        overflow: 'visible',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-nodetype={data.type}
    >
      {/* Handle de destino (topo) */}
      <Handle
        type="target"
        position={Position.Top}
        style={baseHandleStyle}
        isConnectable={isConnectable}
      />
      
      <NodeHeader
        style={{ 
          backgroundColor: headerColors.bg,
          color: headerColors.text
        }}
      >
        {data.type || 'Node'}
      </NodeHeader>
      
      <Box sx={{ padding: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {data.icon && (
            <Box sx={{ mr: 2, color: 'accent.fg' }}>{data.icon}</Box>
          )}
          <Text sx={{ fontWeight: 'bold', fontSize: 1 }}>{data.label}</Text>
        </Box>
        {data.description && (
          <Text sx={{ fontSize: 0, color: 'fg.muted', mt: 1, lineHeight: 1.4 }}>
            {data.description}
          </Text>
        )}
      </Box>
      
      {/* Handle de origem (fundo) */}
      <Handle
        type="source"
        position={Position.Bottom}
        style={baseHandleStyle}
        isConnectable={isConnectable}
      />
      
      {/* Handles laterais (simplificados) */}
      <Handle
        type="source"
        position={Position.Right}
        style={baseHandleStyle}
        isConnectable={isConnectable}
      />
      
      <Handle
        type="target"
        position={Position.Left}
        style={baseHandleStyle}
        isConnectable={isConnectable}
      />
      
      {/* Indicador do tipo de nó */}
      {(isHovered || selected) && (
        <Box sx={{
          position: 'absolute',
          top: '-8px',
          right: '-8px',
          width: '16px',
          height: '16px',
          background: data.type === 'agent' ? 'var(--color-accent-emphasis)' : 'var(--color-success-emphasis)',
          borderRadius: '50%',
          border: '1px solid white',
          zIndex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '9px',
          color: 'white',
          fontWeight: 'bold',
        }}>
          {data.type === 'agent' ? 'A' : 'C'}
        </Box>
      )}
    </Box>
  );
};

export default memo(CustomNode);
