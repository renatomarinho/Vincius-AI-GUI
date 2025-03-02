import React from 'react';
import { PageLayout, TabNav } from '@primer/react';
import { useNavigate, useParams, useLocation, Outlet } from 'react-router-dom';
import Header from '../components/Globals/Header';
import Footer from '../components/Globals/Footer';

const ProjectLayout = () => {
  const navigate = useNavigate();
  const { project_name } = useParams();
  const location = useLocation();

  const tabs = [
    { name: 'Workflow', path: `/projects/${project_name}` },
    { name: 'Jobs', path: `/projects/${project_name}/jobs` },
    { name: 'Insights', path: `/projects/${project_name}/insights` },
    { name: 'Settings', path: `/projects/${project_name}/settings` }
  ];

  return (
    <PageLayout 
      containerWidth="full"
      padding="none"
      rowGap="none"
      style={{ 
        height: '100vh',
      }}
    >
      <PageLayout.Header>
        <Header />
      {project_name && (
        <TabNav>
          {tabs.map(tab => (
            <TabNav.Link
              key={tab.name}
              href={tab.path}
              selected={location.pathname === tab.path}
              onClick={(e) => {
                e.preventDefault();
                navigate(tab.path);
              }}
            >
              {tab.name}
            </TabNav.Link>
          ))}
        </TabNav>
      )}
      </PageLayout.Header>
      <PageLayout.Content 
        style={{ 
          flex: 1,
          width: '100%',
          height: 'calc(100vh - 120px)', // ajusta altura considerando header, tabs e footer
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Outlet />
      </PageLayout.Content>
      <PageLayout.Footer>
        <Footer />
      </PageLayout.Footer>
    </PageLayout>
  );
};

export default ProjectLayout;
