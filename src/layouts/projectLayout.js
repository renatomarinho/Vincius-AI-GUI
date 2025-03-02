import React from 'react';
import { TabNav } from '@primer/react';
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
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      <div style={{ width: '100%' }}>
        <Header />
        {project_name && (
          <TabNav style={{ width: '100%', borderBottom: '1px solid var(--color-border-default)' }}>
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
      </div>

      <div style={{
        flex: 1,
        overflow: 'auto',
        padding: '16px',
        width: '100%'
      }}>
        <Outlet />
      </div>

      <div style={{
        width: '100%',
        borderTop: '1px solid var(--color-border-default)'
      }}>
        <Footer />
      </div>
    </div>
  );
};

export default ProjectLayout;
