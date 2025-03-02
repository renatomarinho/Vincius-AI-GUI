import React from 'react';
import { PageLayout } from '@primer/react';
import Header from '../components/Globals/Header';
import Footer from '../components/Globals/Footer';

const ProjectLayout = ({ children }) => {
  return (
    <div>
      <PageLayout.Header>
        <Header />
      </PageLayout.Header>
      <PageLayout.Content>
        {children}
      </PageLayout.Content>
      <PageLayout.Footer>
        <Footer />
      </PageLayout.Footer>
    </div>
  );
};

export default ProjectLayout;
