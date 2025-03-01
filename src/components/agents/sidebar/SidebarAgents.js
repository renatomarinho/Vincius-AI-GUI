import React from 'react';
import { Box, Heading, Text } from '@primer/react';
import DraggableAgentItem from './DraggableAgentItem';
import {
  BeakerIcon,
  CodeIcon,
  ChecklistIcon,
  CommentDiscussionIcon
} from '@primer/octicons-react';
import ApiIcon from '../ApiIcon';

const SidebarAgents = () => {
  const agents = [
    {
      id: 'beaker',
      type: 'agent',
      label: 'Analyst',
      description: 'Analyzes data and provides insights',
      icon: <BeakerIcon size={16} />
    },
    {
      id: 'code',
      type: 'agent',
      label: 'Developer',
      description: 'Writes and optimizes code',
      icon: <CodeIcon size={16} />
    },
    {
      id: 'checklist',
      type: 'agent',
      label: 'Tester',
      description: 'Tests outputs and validates results',
      icon: <ChecklistIcon size={16} />
    }
  ];

  const connectors = [
    {
      id: 'comment-discussion',
      type: 'connector',
      label: 'Prompter',
      description: 'Creates prompts for AI models',
      icon: <CommentDiscussionIcon size={16} />
    },
    {
      id: 'api',
      type: 'connector',
      label: 'API Requests',
      description: 'Makes external API calls',
      icon: <ApiIcon size={16} />
    }
  ];

  return (
    <Box sx={{ 
      height: '100%', 
      overflowY: 'auto',
      p: 3,
      borderRight: '1px solid',
      borderColor: 'border.default',
    }}>
      <Heading as="h3" sx={{ fontSize: 2, mb: 3 }}>Agents Palette</Heading>
      
      <Text sx={{ fontWeight: 'bold', fontSize: 1, mt: 3, mb: 2, color: 'fg.muted' }}>AGENTS</Text>
      <Box sx={{ mb: 4 }}>
        {agents.map((agent) => (
          <DraggableAgentItem key={agent.id} item={agent} />
        ))}
      </Box>

      <Text sx={{ fontWeight: 'bold', fontSize: 1, mt: 3, mb: 2, color: 'fg.muted' }}>CONNECTORS</Text>
      <Box>
        {connectors.map((connector) => (
          <DraggableAgentItem key={connector.id} item={connector} />
        ))}
      </Box>
    </Box>
  );
};

export default SidebarAgents;
