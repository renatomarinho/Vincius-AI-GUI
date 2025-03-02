import React from 'react';
import WorkflowEditor from '../../components/WorkflowEditor';
import { PageLayout } from '@primer/react';
import Header from '../../components/Globals/Header';
import Footer from '../../components/Globals/Footer';

const WorkflowAgents = () => {
  return (
    <div>
      <PageLayout.Header>
        <Header />
      </PageLayout.Header>
      <PageLayout.Content>
        <WorkflowEditor />
      </PageLayout.Content>
      <PageLayout.Footer>
        <Footer />
      </PageLayout.Footer>
    </div>
  );
};

export default WorkflowAgents;
