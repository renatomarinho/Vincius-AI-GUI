import React from 'react';
import WorkflowAgents from '../pages/WorkflowAgents';
import Jobs from '../pages/Jobs';
import Insights from '../pages/Insights';
import Settings from '../pages/Settings';

const projectRoutes = [
  {
    path: '',
    element: <WorkflowAgents />,
    name: 'Workflow'
  },
  {
    path: 'jobs',
    element: <Jobs />,
    name: 'Jobs'
  },
  {
    path: 'insights',
    element: <Insights />,
    name: 'Insights'
  },
  {
    path: 'settings',
    element: <Settings />,
    name: 'Settings'
  }
];

export default projectRoutes;
