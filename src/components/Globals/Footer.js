import React from 'react';
import { Box, Text } from '@primer/react';

const Footer = () => {
  return (
    <Box 
      as="footer"
      sx={{
        borderTop: '1px solid',
        borderColor: 'border.default',
        p: 3,
        textAlign: 'center',
      }}
    >
      <Text fontSize={1} color="fg.muted">
        &copy; {new Date().getFullYear()} Vincius AI. All rights reserved.
      </Text>
    </Box>
  );
};

export default Footer;
