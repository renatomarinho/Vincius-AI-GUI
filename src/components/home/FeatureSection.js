import React from 'react';
import { Box, Heading, Text } from '@primer/react';

const FeatureSection = () => {
  const features = [
    {
      id: 1,
      title: 'Intuitive Interface',
      description: 'User-friendly design for seamless AI interaction',
      icon: '🖥️'
    },
    {
      id: 2,
      title: 'Advanced Analytics',
      description: 'Comprehensive data visualization and insights',
      icon: '📊'
    },
    {
      id: 3,
      title: 'Real-time Processing',
      description: 'Instant feedback and responses from AI systems',
      icon: '⚡'
    },
    {
      id: 4,
      title: 'Secure Communication',
      description: 'End-to-end encryption for all AI interactions',
      icon: '🔒'
    }
  ];

  return (
    <Box sx={{ py: 5, px: 3, maxWidth: '1200px', mx: 'auto' }}>
      <Heading sx={{ fontSize: 4, mb: 4, textAlign: 'center' }}>Key Features</Heading>
      <Box sx={{ 
        display: 'grid',
        gridTemplateColumns: ['1fr', '1fr 1fr', 'repeat(4, 1fr)'],
        gap: 4
      }}>
        {features.map(feature => (
          <Box key={feature.id} sx={{ 
            p: 3, 
            bg: 'canvas.subtle',
            borderRadius: 2,
            borderColor: 'border.default',
            borderWidth: 1,
            borderStyle: 'solid',
            textAlign: 'center'
          }}>
            <Text sx={{ fontSize: 5, mb: 2 }}>{feature.icon}</Text>
            <Heading sx={{ fontSize: 2, mb: 2 }}>{feature.title}</Heading>
            <Text sx={{ color: 'fg.muted' }}>{feature.description}</Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default FeatureSection;
