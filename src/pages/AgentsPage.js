import React from 'react';
import { useTitle } from '../hooks/useTitle';
import { Box, Heading, Text } from '@primer/react';
import AgentFlowDiagram from '../components/agents/AgentFlowDiagram';
import SidebarAgents from '../components/agents/sidebar/SidebarAgents';

const AgentsPage = () => {
  useTitle('Agents | Vincius AI GUI');
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ px: 3, py: 2, borderBottom: '1px solid', borderColor: 'border.default' }}>
        <Heading sx={{ fontSize: 3 }}>Agent Flow Configuration</Heading>
        <Text sx={{ fontSize: 1, color: 'fg.muted', mt: 1 }}>
          Drag agents from the palette to the flow diagram. Connect them by dragging from one handle to another.
        </Text>
      </Box>
      <Box sx={{ 
        flex: 1, 
        display: 'flex', 
        height: 'calc(100vh - 180px)', // Ajuste este valor conforme necessário
        overflow: 'hidden' // Impede rolagem no contêiner principal
      }}>
        <Box sx={{ width: '250px', height: '100%', overflowY: 'auto' }}>
          <SidebarAgents />
        </Box>
        <Box sx={{ 
          flex: 1, 
          height: '100%', 
          position: 'relative',
          borderLeft: '1px solid',
          borderColor: 'border.default'
        }}>
          <AgentFlowDiagram />
        </Box>
      </Box>
    </Box>
  );
};

export default AgentsPage;
