import React from 'react';
import { Box, Text } from '@primer/react';

const Logo = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Text sx={{ fontSize: 3, fontWeight: 'bold', mr: 2 }}>Vincius AI</Text>
      <span role="img" aria-label="robot">🤖</span>
    </Box>
  );
};

export default Logo;
