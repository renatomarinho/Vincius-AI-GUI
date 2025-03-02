/**
 * Utility functions for edge management in the Workflow Editor
 */

// Create a global edge deletion registry
window.__WORKFLOW_EDGE_UTILS__ = window.__WORKFLOW_EDGE_UTILS__ || {
  deletionCallbacks: []
};

/**
 * Register a callback to be invoked when an edge is deleted
 * @param {Function} callback Function that takes edgeId and deletes the edge
 * @returns {Function} Function to unregister the callback
 */
export const registerEdgeDeletionCallback = (callback) => {
  if (typeof callback !== 'function') {
    console.error('Edge deletion callback must be a function');
    return () => {};
  }
  
  window.__WORKFLOW_EDGE_UTILS__.deletionCallbacks.push(callback);
  
  // Return unsubscribe function
  return () => {
    window.__WORKFLOW_EDGE_UTILS__.deletionCallbacks = 
      window.__WORKFLOW_EDGE_UTILS__.deletionCallbacks.filter(cb => cb !== callback);
  };
};

/**
 * Delete an edge by its ID
 * This will trigger all registered callbacks
 * @param {string} edgeId The ID of the edge to delete
 */
export const deleteEdgeById = (edgeId) => {
  console.log('Edge deletion utility: Deleting edge', edgeId);
  
  // First dispatch the event for backward compatibility
  const event = new CustomEvent('workflow-edge:delete', { 
    detail: { edgeId } 
  });
  window.dispatchEvent(event);
  
  // Then call all registered callbacks
  window.__WORKFLOW_EDGE_UTILS__.deletionCallbacks.forEach(callback => {
    try {
      callback(edgeId);
    } catch (error) {
      console.error('Error in edge deletion callback:', error);
    }
  });
  
  return true;
};

// Expose the deleteEdgeById function globally
window.deleteEdgeById = deleteEdgeById;
