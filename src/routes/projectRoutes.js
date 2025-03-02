import React from 'react';
import WorkflowAgents from '../pages/WorkflowAgents';

const projectRoutes = [
  {
    path: '/projects/:project_name',
    element: <WorkflowAgents />
  },
  {
    path: '/',
    element: <div>Home Page</div>
  }
];

export default projectRoutes;
