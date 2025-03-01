import React from 'react';
import WorkflowEditor from '../../components/WorkflowEditor';
import { PageLayout } from '@primer/react';

const WorkflowAgents = () => {
  return (
    <PageLayout>
      <PageLayout.Content>
        <WorkflowEditor />
      </PageLayout.Content>
    </PageLayout>
  );
};

export default WorkflowAgents;
