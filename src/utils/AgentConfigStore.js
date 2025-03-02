/**
 * Store for persisting agent configurations across the application
 * Uses node IDs as unique identifiers to maintain configuration state
 */
class AgentConfigStore {
  constructor() {
    this.configStore = new Map();
    
    // Try to load from localStorage if available
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const savedConfig = localStorage.getItem('agentConfigurations');
        if (savedConfig) {
          const parsedConfig = JSON.parse(savedConfig);
          
          // Convert the object back to a Map
          Object.keys(parsedConfig).forEach(key => {
            this.configStore.set(key, parsedConfig[key]);
          });
          
          console.log('[AgentConfigStore] Loaded configurations from localStorage', this.configStore);
        }
      } catch (error) {
        console.error('[AgentConfigStore] Error loading from localStorage:', error);
      }
    }
  }
  
  /**
   * Get configuration for a specific node
   * @param {string} nodeId - The node ID
   * @returns {Object|null} The node configuration or null if not found
   */
  getConfig(nodeId) {
    if (!nodeId) return null;
    return this.configStore.get(nodeId) || null;
  }
  
  /**
   * Save configuration for a specific node
   * @param {string} nodeId - The node ID
   * @param {Object} config - The configuration to save
   */
  saveConfig(nodeId, config) {
    if (!nodeId || !config) return;
    
    console.log(`[AgentConfigStore] Saving config for ${nodeId}:`, config);
    this.configStore.set(nodeId, {...config});
    
    // Save to localStorage if available
    this._persistToStorage();
  }
  
  /**
   * Clear configuration for a specific node
   * @param {string} nodeId - The node ID
   */
  clearConfig(nodeId) {
    if (!nodeId) return;
    
    this.configStore.delete(nodeId);
    this._persistToStorage();
  }
  
  /**
   * Clear all configurations
   */
  clearAll() {
    this.configStore.clear();
    this._persistToStorage();
  }
  
  /**
   * Persist the configuration store to localStorage
   * @private
   */
  _persistToStorage() {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        // Convert Map to Object for JSON serialization
        const configObj = {};
        this.configStore.forEach((value, key) => {
          configObj[key] = value;
        });
        
        localStorage.setItem('agentConfigurations', JSON.stringify(configObj));
      } catch (error) {
        console.error('[AgentConfigStore] Error saving to localStorage:', error);
      }
    }
  }
}

// Export a singleton instance
export default new AgentConfigStore();
