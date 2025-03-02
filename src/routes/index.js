import React from 'react';
import { Routes, Route } from 'react-router-dom';
import projectRoutes from './projectRoutes';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Project routes */}
      {projectRoutes.map((route) => (
        <Route 
          key={route.path} 
          path={route.path} 
          element={route.element} 
        />
      ))}
    </Routes>
  );
};

export default AppRoutes;
