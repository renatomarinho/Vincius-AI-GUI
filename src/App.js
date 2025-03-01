import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, BaseStyles } from '@primer/react';
import WorkflowAgents from './pages/WorkflowAgents';

function App() {
  return (
    <ThemeProvider>
      <BaseStyles>
        <Router>
          <Routes>
            <Route path="/workflow-agents" element={<WorkflowAgents />} />
            {/* Add additional routes as needed */}
            <Route path="/" element={<div>Home Page</div>} />
          </Routes>
        </Router>
      </BaseStyles>
    </ThemeProvider>
  );
}

export default App;
