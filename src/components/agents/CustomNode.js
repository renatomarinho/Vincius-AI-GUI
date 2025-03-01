import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Box, Text } from '@primer/react';

const CustomNode = ({ data, isConnectable }) => {
  return (
    <Box
      sx={{
        padding: 2,
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'border.default',
        backgroundColor: 'canvas.default',
        minWidth: 150,
        fontFamily: 'var(--font-family)',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
        transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
        '&:hover': {
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.16), 0 2px 4px rgba(0, 0, 0, 0.12)',
          transform: 'translateY(-2px)',
        },
      }}
    >
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
    </Box>
  );
};

export default memo(CustomNode);
