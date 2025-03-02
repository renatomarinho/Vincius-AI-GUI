import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProjectLayout from '../layouts/ProjectLayout';
import projectRoutes from './projectRoutes';

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/projects/:project_name/*"
        element={<ProjectLayout />}
      >
        {projectRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path.replace('/projects/:project_name', '')}
            element={route.element}
          />
        ))}
      </Route>
      <Route path="/" element={<div>Home Page</div>} />
    </Routes>
  );
};

export default AppRoutes;
