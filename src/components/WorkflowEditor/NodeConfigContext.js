import React, { createContext, useContext, useState, useCallback } from 'react';

// Create a context for node configuration
const NodeConfigContext = createContext();

// Provider component
export const NodeConfigProvider = ({ children }) => {
  const [configNode, setConfigNode] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // The configuration function that will be available globally
  const configureNode = useCallback((node) => {
    console.log('Global configureNode called with:', node);
    setConfigNode(node);
    setIsSidebarOpen(true);
  }, []);

  const closeSidebar = useCallback(() => {
    setIsSidebarOpen(false);
  }, []);

  const saveNodeConfig = useCallback((updatedNode) => {
    // This will be implemented in the WorkflowEditor component
    console.log('saveNodeConfig needs to be implemented by consumer');
  }, []);

  const value = {
    configNode,
    setConfigNode,
    isSidebarOpen,
    setIsSidebarOpen,
    configureNode,
    closeSidebar,
    saveNodeConfig
  };

  return (
    <NodeConfigContext.Provider value={value}>
      {children}
    </NodeConfigContext.Provider>
  );
};

// Custom hook for using the context
export const useNodeConfig = () => {
  const context = useContext(NodeConfigContext);
  if (!context) {
    throw new Error('useNodeConfig must be used within a NodeConfigProvider');
  }
  return context;
};
