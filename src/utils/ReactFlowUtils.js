/**
 * Utilities for handling ReactFlow operations
 */
import AgentsService from '../components/Agents/AgentsService';
// Fix import to use direct import instead of destructuring
import AgentConfigStore from '../store/AgentConfigStore';

// Initialize ReactFlow instance reference
let reactFlowInstance = null;

/**
 * Set the ReactFlow instance for global access
 * @param {Object} instance - The ReactFlow instance
 */
export const setReactFlowInstance = (instance) => {
  reactFlowInstance = instance;
  
  // Set global function to update node name
  window.updateNodeName = (nodeId, name) => {
    if (!reactFlowInstance) return;
    
    reactFlowInstance.setNodes((nodes) => 
      nodes.map(node => {
        if (node.id === nodeId) {
          return {
            ...node,
            data: { 
              ...node.data, 
              label: name 
            }
          };
        }
        return node;
      })
    );
  };
  
  // Set global function to update node configuration
  window.updateNodeConfig = (nodeId, configValues) => {
    if (!reactFlowInstance) {
      console.log('[ReactFlowUtils] Cannot update node config: reactFlowInstance is null');
      return;
    }
    
    console.log(`[ReactFlowUtils] Updating config for node ${nodeId}:`, configValues);
    
    // Save to config store first
    AgentConfigStore.saveConfig(nodeId, configValues);
    
    // Then update the node in ReactFlow
    reactFlowInstance.setNodes((nodes) => 
      nodes.map(node => {
        if (node.id === nodeId) {
          const updatedNode = {
            ...node,
            data: { 
              ...node.data, 
              agentConfig: configValues 
            }
          };
          console.log(`[ReactFlowUtils] Updated node:`, updatedNode);
          return updatedNode;
        }
        return node;
      })
    );
  };
  
  // Set global function to get a node by ID
  window.getNodeById = (nodeId) => {
    if (!reactFlowInstance) return null;
    
    const nodes = reactFlowInstance.getNodes();
    return nodes.find(node => node.id === nodeId) || null;
  };
};

/**
 * Get the current ReactFlow instance
 * @returns {Object|null} The ReactFlow instance or null if not set
 */
export const getReactFlowInstance = () => {
  return reactFlowInstance;
};

/**
 * Create a new node with proper configuration
 * @param {string} type - Node type
 * @param {string} nodeType - Agent node type (input, process, output, utility)
 * @param {string} label - Node label 
 * @param {Object} position - Node position {x, y}
 * @param {Object} agentData - Optional agent data from AgentsService
 * @returns {Object} New node object
 */
export const createNode = (type, nodeType, label, position, agentData) => {
  const id = `${type}-${Date.now()}`;
  console.log(`[ReactFlowUtils] Creating node with type: ${type}, label: ${label}`);
  
  // Try to get agent data from service if not provided
  if (!agentData) {
    agentData = AgentsService.getAgentByTypeAndName(type, label);
  }
  
  // Basic node structure
  const node = {
    id,
    type,
    position,
    data: {
      label,
      nodeType,
      agentConfig: {} // Initialize empty config
    }
  };
  
  // If we have agent data, add its configuration
  if (agentData && agentData.agent_config) {
    console.log(`[ReactFlowUtils] Found agent config template:`, agentData.agent_config);
    // Create initial config values using template values
    const initialConfig = {};
    
    Object.keys(agentData.agent_config).forEach(key => {
      // Use the value property from template
      if (agentData.agent_config[key].value !== undefined) {
        // Make sure to keep the value type correct, especially for numbers
        const configType = agentData.agent_config[key].type;
        const templateValue = agentData.agent_config[key].value;
        
        if (configType === 'number' && typeof templateValue === 'number') {
          // Ensure number values are stored as numbers with proper precision
          initialConfig[key] = parseFloat(templateValue.toFixed(2));
        } else {
          initialConfig[key] = templateValue;
        }
      } else {
        // Fallback for cases where value is not defined
        switch (agentData.agent_config[key].type) {
          case 'number':
            initialConfig[key] = 0;
            break;
          default:
            initialConfig[key] = '';
        }
      }
    });
    
    // Add the agent config to node data
    node.data.agentConfig = initialConfig;
    
    // Save initial config to the store
    AgentConfigStore.saveConfig(id, initialConfig);
    
    console.log(`[ReactFlowUtils] Initialized node with config:`, initialConfig);
  } else {
    console.log(`[ReactFlowUtils] No agent config template found, using default`);
    // Add some default configuration
    const defaultConfig = {
      description: '',
      notes: ''
    };
    
    node.data.agentConfig = defaultConfig;
    AgentConfigStore.saveConfig(id, defaultConfig);
  }
  
  return node;
};

/**
 * Get configuration for a node, prioritizing stored values
 * @param {string} nodeId - The node ID
 * @returns {Object} The configuration object
 */
export const getNodeConfig = (nodeId) => {
  // Try to get from config store first
  const storedConfig = AgentConfigStore.getConfig(nodeId);
  if (storedConfig) {
    return storedConfig;
  }
  
  // If not in store, try to get from ReactFlow node
  if (window.getNodeById && nodeId) {
    const node = window.getNodeById(nodeId);
    if (node && node.data && node.data.agentConfig) {
      return node.data.agentConfig;
    }
  }
  
  // Return empty object if nothing found
  return {};
};

export default {
  setReactFlowInstance,
  getReactFlowInstance,
  createNode,
  getNodeConfig
};
