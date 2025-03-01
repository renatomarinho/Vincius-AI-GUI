import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Heading, Text, Button } from '@primer/react';

const Hero = () => {
  return (
    <Box sx={{ 
      display: 'flex',
      flexDirection: ['column', 'column', 'row'],
      py: 5, 
      px: 3,
      maxWidth: '1200px',
      mx: 'auto',
      alignItems: 'center'
    }}>
      <Box sx={{ flex: '1', mr: [0, 0, 4], mb: [4, 4, 0] }}>
        <Heading sx={{ fontSize: 5, mb: 3 }}>Advanced AI Interface Solutions</Heading>
        <Text sx={{ fontSize: 2, color: 'fg.muted', mb: 4 }}>
          Powerful tools for interacting with artificial intelligence systems
        </Text>
        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
          <Button as={RouterLink} to="/demo" variant="primary">
            Try Demo
          </Button>
          <Button as={RouterLink} to="/learn-more" variant="outline">
            Learn More
          </Button>
        </Box>
      </Box>
      <Box sx={{ 
        flex: '1',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Box sx={{ 
          bg: 'accent.subtle',
          p: 5,
          borderRadius: 2,
          textAlign: 'center',
          width: '100%',
          color: 'accent.fg'
        }}>
          AI Interface Visualization
        </Box>
      </Box>
    </Box>
  );
};

export default Hero;
