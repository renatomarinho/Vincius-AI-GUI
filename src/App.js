import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, BaseStyles } from '@primer/react';
import AgentSidebar from './components/Agents/Sidebar/AgentSidebar';
import { ReactFlowPatchProvider } from './components/WorkflowEditor/ReactFlowPatch';
import AppRoutes from './routes';

function App() {
  return (
    <ReactFlowPatchProvider>
      <ThemeProvider>
        <BaseStyles>
          <Router>
            <AppRoutes />
          </Router>
          <AgentSidebar />
        </BaseStyles>
      </ThemeProvider>
    </ReactFlowPatchProvider>
  );
}

export default App;
