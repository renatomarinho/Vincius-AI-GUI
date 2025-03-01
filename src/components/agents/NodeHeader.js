import React from 'react';
import { Box, Text } from '@primer/react';

const NodeHeader = ({ children, style = {}, className = '' }) => {
  return (
    <Box
      className={`node-header ${className}`}
      sx={{
        padding: '4px 12px',
        fontSize: '12px',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        textAlign: 'center',
        letterSpacing: '0.5px',
        borderBottom: '1px solid',
        borderColor: 'rgba(0, 0, 0, 0.1)',
        width: '100%',
        ...style,
      }}
    >
      <Text>{children}</Text>
    </Box>
  );
};

export default NodeHeader;
