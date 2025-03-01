// A global event system for node configuration with DOM-based fallback

// Global handler function and state
let configureNodeHandler = null;
let isRegistered = false;
let pendingConfigurations = [];
let sidebarControls = {
  openSidebar: null,
  setConfigNode: null
};

// Debug logging for initialization
console.log('NodeConfigEvents module initialized');

// CRITICAL: Set up a global variable to access directly from any component
window.__WORKFLOW_EDITOR_CONFIG__ = {
  openSidebar: false,
  configNode: null,
  pendingRequests: [],
  process: function(node) {
    console.log('Processing node configuration via global:', node);
    // Create and dispatch a custom event that WorkflowEditor can listen for
    const event = new CustomEvent('workflow-editor:configure-node', { 
      detail: { node } 
    });
    window.dispatchEvent(event);
    return true;
  }
};

// Set the sidebar controls for direct access
export const registerSidebarControls = (openSidebar, setConfigNode) => {
  console.log('Registering sidebar controls with types:', 
    {openSidebarType: typeof openSidebar, setConfigNodeType: typeof setConfigNode});
  
  if (typeof openSidebar !== 'function' || typeof setConfigNode !== 'function') {
    console.error('Invalid sidebar controls provided:', { openSidebar, setConfigNode });
    return;
  }
  
  sidebarControls.openSidebar = openSidebar;
  sidebarControls.setConfigNode = setConfigNode;
  
  // Process any pending configurations immediately
  if (pendingConfigurations.length > 0) {
    console.log(`Processing ${pendingConfigurations.length} pending configurations via sidebar controls`);
    
    // Process the most recent request
    const mostRecent = pendingConfigurations.pop();
    setConfigNode(mostRecent);
    openSidebar(true);
    
    // Clear the rest
    pendingConfigurations = [];
  }
};

// Set the real handler function
export const setConfigureNodeHandler = (handler) => {
  console.log('Setting global node configure handler with type:', typeof handler);
  
  if (typeof handler !== 'function') {
    console.error('Invalid handler provided:', handler);
    return null;
  }
  
  // Keep a reference to the old handler
  const oldHandler = configureNodeHandler;
  
  // Set the new handler
  configureNodeHandler = handler;
  isRegistered = true;
  
  // Process any pending configurations
  if (pendingConfigurations.length > 0) {
    console.log(`Processing ${pendingConfigurations.length} pending node configurations via handler`);
    
    // Clone the array to avoid issues if handler adds more items
    const pendingToProcess = [...pendingConfigurations];
    pendingConfigurations = [];
    
    pendingToProcess.forEach(node => {
      handler(node);
    });
  }
  
  return oldHandler;
};

// Call the handler with a node
export const configureNode = (node) => {
  console.log('Global configureNode called with:', node);
  
  // Try the direct DOM approach first as a super fallback
  try {
    window.__WORKFLOW_EDITOR_CONFIG__.pendingRequests.push(node);
    const result = window.__WORKFLOW_EDITOR_CONFIG__.process(node);
    console.log('Processed via global DOM method:', result);
    if (result) return true;
  } catch (err) {
    console.error('Error using DOM fallback:', err);
  }
  
  // Check if we have a handler
  if (isRegistered && configureNodeHandler) {
    console.log('Using registered handler');
    return configureNodeHandler(node);
  }
  
  // Check if we have sidebar controls
  if (sidebarControls.openSidebar && sidebarControls.setConfigNode) {
    console.log('Using sidebar controls directly');
    sidebarControls.setConfigNode(node);
    sidebarControls.openSidebar(true);
    return true;
  }
  
  // Queue the request as a last resort
  console.log('No handler or sidebar controls available, queueing request');
  pendingConfigurations.push(node);
  
  // Try again with a longer delay - this helps with race conditions
  setTimeout(() => {
    console.log('Retrying with longer delay (1000ms)...');
    if (sidebarControls.openSidebar && sidebarControls.setConfigNode) {
      console.log('Using sidebar controls after delay');
      sidebarControls.setConfigNode(node);
      sidebarControls.openSidebar(true);
      return;
    } 
    
    if (isRegistered && configureNodeHandler) {
      console.log('Using registered handler after delay');
      configureNodeHandler(node);
      return;
    }
    
    console.log('Still no handler or controls available after delay, trying DOM method...');
    try {
      window.__WORKFLOW_EDITOR_CONFIG__.process(node);
    } catch (err) {
      console.error('Error using DOM fallback after delay:', err);
    }
  }, 1000); // Longer delay
  
  return false;
};

// Check if handler is registered
export const isHandlerRegistered = () => {
  return isRegistered;
};

// Check if sidebar controls are registered
export const areSidebarControlsRegistered = () => {
  return !!(sidebarControls.openSidebar && sidebarControls.setConfigNode);
};

// Export debug info
export const getDebugInfo = () => {
  return {
    isHandlerRegistered: isRegistered,
    hasConfigureNodeHandler: !!configureNodeHandler,
    hasSidebarControls: !!(sidebarControls.openSidebar && sidebarControls.setConfigNode),
    pendingConfigurationsCount: pendingConfigurations.length,
    domFallbackAvailable: !!window.__WORKFLOW_EDITOR_CONFIG__
  };
};
