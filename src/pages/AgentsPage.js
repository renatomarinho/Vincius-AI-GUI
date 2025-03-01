import React from 'react';
import { useTitle } from '../hooks/useTitle';
import { Box, Heading } from '@primer/react';
import AgentFlowDiagram from '../components/agents/AgentFlowDiagram';

const AgentsPage = () => {
  useTitle('Agents | Vincius AI GUI');
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ px: 3, py: 2 }}>
        <Heading sx={{ fontSize: 3 }}>Agent Flow Configuration</Heading>
      </Box>
      <Box sx={{ flex: 1, height: 'calc(100vh - 160px)', position: 'relative' }}>
        <AgentFlowDiagram />
      </Box>
    </Box>
  );
};

export default AgentsPage;
