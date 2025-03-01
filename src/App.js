import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, BaseStyles } from '@primer/react';
import WorkflowAgents from './pages/WorkflowAgents';
import AgentSidebar from './components/Agents/Sidebar/AgentSidebar';
import { ReactFlowPatchProvider } from './components/WorkflowEditor/ReactFlowPatch';

function App() {
  return (
    <ReactFlowPatchProvider>
      <ThemeProvider>
        <BaseStyles>
          <Router>
            <Routes>
              <Route path="/workflow-agents" element={<WorkflowAgents />} />
              <Route path="/" element={<div>Home Page</div>} />
            </Routes>
          </Router>
          
          {/* Agent sidebar will be available globally */}
          <AgentSidebar />
        </BaseStyles>
      </ThemeProvider>
    </ReactFlowPatchProvider>
  );
}

export default App;
