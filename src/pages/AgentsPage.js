import React from 'react';
import { useTitle } from '../hooks/useTitle';
import { Box, Heading } from '@primer/react';
import AgentFlowDiagram from '../components/agents/AgentFlowDiagram';
import SidebarAgents from '../components/agents/sidebar/SidebarAgents';

const AgentsPage = () => {
  useTitle('Agents | Vincius AI GUI');
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ px: 3, py: 2 }}>
        <Heading sx={{ fontSize: 3 }}>Agent Flow Configuration</Heading>
      </Box>
      <Box sx={{ flex: 1, display: 'flex', height: 'calc(100vh - 160px)' }}>
        <Box sx={{ width: '250px', height: '100%' }}>
          <SidebarAgents />
        </Box>
        <Box sx={{ flex: 1, height: '100%', position: 'relative' }}>
          <AgentFlowDiagram />
        </Box>
      </Box>
    </Box>
  );
};

export default AgentsPage;
