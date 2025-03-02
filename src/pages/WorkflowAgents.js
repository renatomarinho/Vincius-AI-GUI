import React from 'react';
import WorkflowEditor from '../components/WorkflowEditor';
import { Box } from '@primer/react';

const WorkflowAgents = () => {
  return (
    <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
      <WorkflowEditor />
    </Box>
  );
};

export default WorkflowAgents;
