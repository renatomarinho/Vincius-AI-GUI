import React, { useEffect, useRef, useState } from 'react';
import './AgentSidebar.css';
import AgentsService from '../AgentsService';
// Fix import to use the direct import instead of destructuring
import AgentConfigStore from '../../../store/AgentConfigStore';

/**
 * Sidebar para configuração de agentes que funciona independentemente do fluxo React principal
 * Fornece uma alternativa robusta quando a sidebar principal falhar
 */
const AgentSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [nodeData, setNodeData] = useState(null);
  const [nodeName, setNodeName] = useState('');
  const [agentConfig, setAgentConfig] = useState({});
  const [agentType, setAgentType] = useState('');
  const [configValues, setConfigValues] = useState({});
  const sidebarRef = useRef(null);
  const nodeIdRef = useRef(null);
  
  // Debug function to log data
  const debugLog = (message, data) => {
    console.log(`[AgentSidebar] ${message}:`, data);
  }
  
  // Fetch agent configuration when node data changes
  useEffect(() => {
    if (nodeData) {
      debugLog('Node data received', nodeData);
      
      // Save node ID for later use
      const nodeId = nodeData.id;
      nodeIdRef.current = nodeId;
      
      // Set agent type directly from nodeData
      const currentType = nodeData.type || '';
      setAgentType(currentType);
      
      // Get the node label
      const nodeLabel = nodeData.data?.label;
      setNodeName(nodeLabel || '');
      debugLog('Node label', nodeLabel);
      
      // Check if we have a stored configuration in our store
      const storedConfig = AgentConfigStore.getConfig(nodeId);
      debugLog('Config from store', storedConfig);
      
      // If no stored config, check node data
      const nodeConfig = storedConfig || nodeData.data?.agentConfig;
      debugLog('Config from node or store', nodeConfig);
      
      // Try to get agent config template from AgentsService
      let agent = null;
      
      if (currentType && nodeLabel) {
        // Try to find the agent by type and name
        agent = AgentsService.getAgentByTypeAndName(currentType, nodeLabel);
        debugLog('Agent found by type and name', agent);
      }
      
      // If not found, try by node type
      if (!agent) {
        // Get all categories and find any agent with matching type
        const categories = AgentsService.getAgentCategories();
        for (const category of categories) {
          const matchingAgent = category.nodes.find(node => node.type === currentType);
          if (matchingAgent) {
            agent = matchingAgent;
            debugLog('Agent found by type', agent);
            break;
          }
        }
      }
      
      if (agent && agent.agent_config) {
        debugLog('Using agent config from template', agent.agent_config);
        setAgentConfig(agent.agent_config);
        
        // Initialize config values, prioritizing stored values
        const initialValues = {};
        Object.keys(agent.agent_config).forEach(key => {
          // Prioritize: 1. Stored config, 2. Node config, 3. Template default value
          if (nodeConfig && nodeConfig[key] !== undefined) {
            initialValues[key] = nodeConfig[key];
          } else {
            initialValues[key] = agent.agent_config[key].value;
          }
        });
        
        setConfigValues(initialValues);
        
        // If we have no stored config yet, save the initial values
        if (!storedConfig && nodeId) {
          AgentConfigStore.saveConfig(nodeId, initialValues);
        }
      } else {
        // If we can't find the agent template but have stored config, use that
        if (nodeConfig) {
          // Create a simple config structure for each stored value
          const configStructure = {};
          Object.keys(nodeConfig).forEach(key => {
            configStructure[key] = {
              title: key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' '),
              type: typeof nodeConfig[key] === 'number' ? 'number' : 'text'
            };
          });
          setAgentConfig(configStructure);
          setConfigValues(nodeConfig);
        } else {
          // Create a basic default configuration
          const defaultConfig = {
            description: {
              title: 'Description',
              type: 'textarea'
            },
            prompt: {
              title: 'Prompt',
              type: 'textarea'
            },
            notes: {
              title: 'Notes',
              type: 'text'
            }
          };
          
          const defaultValues = {
            description: '',
            prompt: '',
            notes: ''
          };
          
          setAgentConfig(defaultConfig);
          setConfigValues(defaultValues);
          
          // Save default config to store
          if (nodeId) {
            AgentConfigStore.saveConfig(nodeId, defaultValues);
          }
        }
      }
    }
  }, [nodeData]);
  
  useEffect(() => {
    // Define a sidebar API no objeto window
    window.emergencySidebar = {
      open: (data) => {
        console.log('Opening agent sidebar with data:', data);
        // Get fresh node data if we have getNodeById function and node id
        const freshData = data.id && window.getNodeById ? window.getNodeById(data.id) : data;
        setNodeData(freshData);
        setIsOpen(true);
      },
      close: () => {
        setIsOpen(false);
      },
      isVisible: () => isOpen,
      refresh: () => {
        // Refresh current node data if we have a node ID
        if (nodeIdRef.current && window.getNodeById) {
          const freshData = window.getNodeById(nodeIdRef.current);
          if (freshData) {
            setNodeData(freshData);
          }
        }
      }
    };
    
    // Função para fechar ao pressionar ESC
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        window.emergencySidebar.close();
      }
    };
    
    // Função para fechar ao clicar fora
    const handleOutsideClick = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target) && isOpen) {
        window.emergencySidebar.close();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleOutsideClick);
    
    // Atalho Alt+S para abrir/fechar
    const handleAltS = (e) => {
      if (e.altKey && e.key === 's') {
        if (isOpen) {
          window.emergencySidebar.close();
        } else {
          window.emergencySidebar.open({
            id: 'keyboard-triggered',
            data: { label: 'Aberto com Alt+S' }
          });
        }
      }
    };
    
    document.addEventListener('keydown', handleAltS);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleAltS);
    };
  }, [isOpen]);
  
  const handleSave = () => {
    if (nodeData && nodeData.id) {
      const nodeId = nodeData.id;
      
      // Update node name if the updateNodeName function exists
      if (window.updateNodeName && nodeName) {
        window.updateNodeName(nodeId, nodeName);
      }
      
      // Save configuration to the node and store
      if (Object.keys(configValues).length > 0) {
        // First save to store to ensure persistence
        AgentConfigStore.saveConfig(nodeId, configValues);
        
        // Then update node in ReactFlow if function exists
        if (window.updateNodeConfig) {
          window.updateNodeConfig(nodeId, configValues);
        }
        
        debugLog('Saved configuration values', configValues);
      }
      
      console.log('Saved node with name:', nodeName);
      console.log('Saved configuration values:', configValues);
    }
    window.emergencySidebar.close();
  };
  
  // Handle configuration value changes
  const handleConfigChange = (key, value) => {
    setConfigValues(prevValues => ({
      ...prevValues,
      [key]: value
    }));
  };
  
  // Render appropriate input field based on type
  const renderInputField = (key, config) => {
    const inputId = `agent-config-${key}`;
    
    switch (config.type) {
      case 'textarea':
        return (
          <textarea
            id={inputId}
            value={configValues[key] || ''}
            onChange={(e) => handleConfigChange(key, e.target.value)}
            rows={4}
            className="agent-config-textarea"
          />
        );
      case 'number':
        return (
          <input
            id={inputId}
            type="number"
            value={configValues[key]}
            step="0.01" // Allow decimal steps for values like 0.21
            min="0" // Most AI parameters won't go below 0
            onChange={(e) => {
              // Handle empty, integer and decimal values properly
              const value = e.target.value;
              if (value === '') {
                handleConfigChange(key, '');
              } else {
                // Parse as float to preserve decimal values
                const numValue = parseFloat(value);
                handleConfigChange(key, isNaN(numValue) ? 0 : numValue);
              }
            }}
            className="agent-config-input"
          />
        );
      case 'text':
      default:
        return (
          <input
            id={inputId}
            type="text"
            value={configValues[key] || ''}
            onChange={(e) => handleConfigChange(key, e.target.value)}
            className="agent-config-input"
          />
        );
    }
  };
  
  return (
    <div 
      ref={sidebarRef}
      className={`agent-sidebar ${isOpen ? 'open' : ''}`}
    >
      <div className="agent-sidebar-header">
        <strong>Agent Configuration</strong>
        <button 
          onClick={() => window.emergencySidebar.close()}
          className="close-button"
        >
          X
        </button>
      </div>
      <div className="agent-sidebar-content">
        <h2>Node Settings</h2>
        <p>Configure your workflow node.</p>
        
        <div className="node-info">
          {nodeData && (
            <>
              <div className="node-details">
                <p><strong>ID:</strong> {nodeData.id || 'No ID'}</p>
                <p><strong>Type:</strong> {agentType || 'Unknown'}</p>
                <p><strong>Name:</strong> {nodeData.data?.label || 'Unnamed'}</p>
              </div>
              
              <div className="form-control">
                <label htmlFor="agent-node-name">Node Name:</label>
                <input
                  id="agent-node-name"
                  type="text"
                  value={nodeName}
                  onChange={(e) => setNodeName(e.target.value)}
                />
              </div>
              
              <div className="agent-config-section">
                <h3>Agent Configuration</h3>
                {Object.keys(agentConfig).length > 0 ? (
                  Object.keys(agentConfig).map(key => (
                    <div key={key} className="form-control">
                      <label htmlFor={`agent-config-${key}`}>
                        {agentConfig[key].title || key}:
                      </label>
                      {renderInputField(key, agentConfig[key])}
                    </div>
                  ))
                ) : (
                  <p>No configuration options available for this agent type.</p>
                )}
              </div>
            </>
          )}
        </div>
        
        <div className="button-group">
          <button 
            onClick={() => window.emergencySidebar.close()}
            className="cancel-button"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            className="save-button"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgentSidebar;
