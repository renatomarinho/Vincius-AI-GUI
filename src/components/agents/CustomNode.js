import React, { memo } from 'react';
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
  const headerColors = getNodeHeaderColor(data.type);

  return (
    <Box
      sx={{
        borderRadius: 2,
        border: '1px solid',
        borderColor: selected ? 'accent.emphasis' : 'border.default',
        borderWidth: selected ? 2 : 1,
        backgroundColor: 'canvas.default',
        width: 180,
        overflow: 'hidden',
        fontFamily: 'var(--font-family)',
        boxShadow: selected 
          ? '0 0 0 2px var(--color-accent-muted), 0 4px 8px rgba(0, 0, 0, 0.2)' 
          : '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
        transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
        '&:hover': {
          boxShadow: selected 
            ? '0 0 0 2px var(--color-accent-muted), 0 6px 10px rgba(0, 0, 0, 0.25)' 
            : '0 4px 8px rgba(0, 0, 0, 0.16), 0 2px 4px rgba(0, 0, 0, 0.12)',
        },
      }}
    >
      {/* Target handle on top */}
      <Handle
        type="target"
        position={Position.Top}
        style={{ 
          background: 'var(--color-accent-fg)',
          width: 8,
          height: 8
        }}
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
      
      {/* Source handle on bottom */}
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ 
          background: 'var(--color-accent-fg)',
          width: 8,
          height: 8
        }}
        isConnectable={isConnectable}
      />
      
      {/* Additional handles on sides for more connection options */}
      <Handle
        type="source"
        position={Position.Right}
        style={{ 
          background: 'var(--color-success-fg)',
          width: 8,
          height: 8
        }}
        isConnectable={isConnectable}
      />
      
      <Handle
        type="target"
        position={Position.Left}
        style={{ 
          background: 'var(--color-success-fg)',
          width: 8,
          height: 8
        }}
        isConnectable={isConnectable}
      />
    </Box>
  );
};

export default memo(CustomNode);
