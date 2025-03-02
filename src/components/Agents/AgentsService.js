import { 
  DatabaseIcon, 
  CodeIcon, 
  FilterIcon, 
  GearIcon, 
  GraphIcon, 
  HubotIcon, 
  TableIcon, 
  PulseIcon,
  FileIcon,
  TerminalIcon,
  BroadcastIcon
} from '@primer/octicons-react';

/**
 * Service responsible for providing agent data and categories
 */
class AgentsService {
  /**
   * Get all agent categories with their respective agents
   * @returns {Array} Array of agent categories
   */
  getAgentCategories() {
    return [
      {
        name: 'Sources',
        nodes: [
          { 
            type: 'input', 
            name: 'Database Source', 
            icon: DatabaseIcon, 
            inputs: [], 
            outputs: ['data'],
            agent_config: {
              description: {
                title: 'Description',
                type: 'textarea',
                value: 'Connects to database systems and extracts data'
              },
              responsible_department: {
                title: 'Responsible Department',
                type: 'text',
                value: 'Data Engineering'
              },
              prompt: {
                title: 'Prompt Instructions',
                type: 'textarea',
                value: 'Configure database connection and query parameters'
              },
              model: {
                title: 'Model Name',
                type: 'text',
                value: 'data-connector-v1'
              },
              max_tokens: {
                title: 'Max Tokens',
                type: 'number',
                value: 2000
              },
              temperature: {
                title: 'Temperature',
                type: 'number',
                value: 0.2
              },
              guidelines: {
                title: 'Usage Guidelines',
                type: 'textarea',
                value: 'Use secure connection strings and parameterized queries'
              }
            }
          },
          { 
            type: 'input', 
            name: 'API Source', 
            icon: BroadcastIcon, 
            inputs: [], 
            outputs: ['data'],
            agent_config: {
              description: {
                title: 'Description',
                type: 'textarea',
                value: 'Fetches data from external APIs and web services'
              },
              responsible_department: {
                title: 'Responsible Department',
                type: 'text',
                value: 'Integration Team'
              },
              prompt: {
                title: 'Prompt Instructions',
                type: 'textarea',
                value: 'Configure API endpoint and authentication'
              },
              model: {
                title: 'Model Name',
                type: 'text',
                value: 'api-connector-v1'
              },
              max_tokens: {
                title: 'Max Tokens',
                type: 'number',
                value: 1500
              },
              temperature: {
                title: 'Temperature',
                type: 'number',
                value: 0.1
              },
              guidelines: {
                title: 'Usage Guidelines',
                type: 'textarea',
                value: 'Implement rate limiting and error handling for API requests'
              }
            }
          },
        ],
      },
      {
        name: 'Processing',
        nodes: [
          { 
            type: 'process', 
            name: 'Filter Data', 
            icon: FilterIcon, 
            inputs: ['data'], 
            outputs: ['filtered'],
            agent_config: {
              description: {
                title: 'Description',
                type: 'textarea',
                value: 'Filters out unnecessary data based on specified conditions'
              },
              responsible_department: {
                title: 'Responsible Department',
                type: 'text',
                value: 'Data Analysis'
              },
              prompt: {
                title: 'Prompt Instructions',
                type: 'textarea',
                value: 'Define filter conditions and thresholds'
              },
              model: {
                title: 'Model Name',
                type: 'text',
                value: 'data-filter-v2'
              },
              max_tokens: {
                title: 'Max Tokens',
                type: 'number',
                value: 1000
              },
              temperature: {
                title: 'Temperature',
                type: 'number',
                value: 0.0
              },
              guidelines: {
                title: 'Usage Guidelines',
                type: 'textarea',
                value: 'Use efficient filtering algorithms for large datasets'
              }
            }
          },
          { 
            type: 'process', 
            name: 'Transform', 
            icon: CodeIcon, 
            inputs: ['data'], 
            outputs: ['transformed'],
            agent_config: {
              description: {
                title: 'Description',
                type: 'textarea',
                value: 'Transforms data structure and format for downstream use'
              },
              responsible_department: {
                title: 'Responsible Department',
                type: 'text',
                value: 'Data Processing'
              },
              prompt: {
                title: 'Prompt Instructions',
                type: 'textarea',
                value: 'Define data transformation rules'
              },
              model: {
                title: 'Model Name',
                type: 'text',
                value: 'transformer-v3'
              },
              max_tokens: {
                title: 'Max Tokens',
                type: 'number',
                value: 2500
              },
              temperature: {
                title: 'Temperature',
                type: 'number',
                value: 0.3
              },
              guidelines: {
                title: 'Usage Guidelines',
                type: 'textarea',
                value: 'Maintain data integrity throughout transformation operations'
              }
            }
          },
          { 
            type: 'process', 
            name: 'Aggregate', 
            icon: TableIcon, 
            inputs: ['data'], 
            outputs: ['aggregated'],
            agent_config: {
              description: {
                title: 'Description',
                type: 'textarea',
                value: 'Performs statistical aggregations on datasets'
              },
              responsible_department: {
                title: 'Responsible Department',
                type: 'text',
                value: 'Business Intelligence'
              },
              prompt: {
                title: 'Prompt Instructions',
                type: 'textarea',
                value: 'Specify aggregation metrics and grouping dimensions'
              },
              model: {
                title: 'Model Name',
                type: 'text',
                value: 'aggregator-v2'
              },
              max_tokens: {
                title: 'Max Tokens',
                type: 'number',
                value: 1800
              },
              temperature: {
                title: 'Temperature',
                type: 'number',
                value: 0.1
              },
              guidelines: {
                title: 'Usage Guidelines',
                type: 'textarea',
                value: 'Use memory-efficient aggregation methods for large datasets'
              }
            }
          },
          { 
            type: 'process', 
            name: 'AI Agent', 
            icon: HubotIcon, 
            inputs: ['prompt'], 
            outputs: ['response'],
            agent_config: {
              description: {
                title: 'Description',
                type: 'textarea',
                value: 'Handles natural language processing tasks using AI'
              },
              responsible_department: {
                title: 'Responsible Department',
                type: 'text',
                value: 'AI/ML Team'
              },
              prompt: {
                title: 'Prompt Instructions',
                type: 'textarea',
                value: 'Provide instructions for the AI model'
              },
              model: {
                title: 'Model Name',
                type: 'text',
                value: 'gpt-4-turbo'
              },
              max_tokens: {
                title: 'Max Tokens',
                type: 'number',
                value: 8000
              },
              temperature: {
                title: 'Temperature',
                type: 'number',
                value: 0.7
              },
              guidelines: {
                title: 'Usage Guidelines',
                type: 'textarea',
                value: 'Ensure prompts are clear and specific for best results'
              }
            }
          },
        ],
      },
      {
        name: 'Outputs',
        nodes: [
          { 
            type: 'output', 
            name: 'Visualization', 
            icon: GraphIcon, 
            inputs: ['data'], 
            outputs: [],
            agent_config: {
              description: {
                title: 'Description',
                type: 'textarea',
                value: 'Creates visual representations of processed data'
              },
              responsible_department: {
                title: 'Responsible Department',
                type: 'text',
                value: 'Data Visualization'
              },
              prompt: {
                title: 'Prompt Instructions',
                type: 'textarea',
                value: 'Configure visualization type and parameters'
              },
              model: {
                title: 'Model Name',
                type: 'text',
                value: 'viz-engine-v2'
              },
              max_tokens: {
                title: 'Max Tokens',
                type: 'number',
                value: 3000
              },
              temperature: {
                title: 'Temperature',
                type: 'number',
                value: 0.2
              },
              guidelines: {
                title: 'Usage Guidelines',
                type: 'textarea',
                value: 'Follow data visualization best practices for clarity'
              }
            }
          },
          { 
            type: 'output', 
            name: 'Export Data', 
            icon: DatabaseIcon, 
            inputs: ['data'], 
            outputs: [],
            agent_config: {
              description: {
                title: 'Description',
                type: 'textarea',
                value: 'Exports processed data to external storage systems'
              },
              responsible_department: {
                title: 'Responsible Department',
                type: 'text',
                value: 'Data Engineering'
              },
              prompt: {
                title: 'Prompt Instructions',
                type: 'textarea',
                value: 'Configure export destination and format'
              },
              model: {
                title: 'Model Name',
                type: 'text',
                value: 'export-handler-v1'
              },
              max_tokens: {
                title: 'Max Tokens',
                type: 'number',
                value: 1500
              },
              temperature: {
                title: 'Temperature',
                type: 'number',
                value: 0.0
              },
              guidelines: {
                title: 'Usage Guidelines',
                type: 'textarea',
                value: 'Ensure proper error handling during export operations'
              }
            }
          },
          { 
            type: 'output', 
            name: 'API Output', 
            icon: TerminalIcon, 
            inputs: ['data'], 
            outputs: [],
            agent_config: {
              description: {
                title: 'Description',
                type: 'textarea',
                value: 'Exposes processed data through API endpoints'
              },
              responsible_department: {
                title: 'Responsible Department',
                type: 'text',
                value: 'API Management'
              },
              prompt: {
                title: 'Prompt Instructions',
                type: 'textarea',
                value: 'Define API response structure'
              },
              model: {
                title: 'Model Name',
                type: 'text',
                value: 'api-publisher-v2'
              },
              max_tokens: {
                title: 'Max Tokens',
                type: 'number',
                value: 2000
              },
              temperature: {
                title: 'Temperature',
                type: 'number',
                value: 0.1
              },
              guidelines: {
                title: 'Usage Guidelines',
                type: 'textarea',
                value: 'Implement proper security and authentication for API endpoints'
              }
            }
          },
        ],
      },
      {
        name: 'Utilities',
        nodes: [
          { 
            type: 'utility', 
            name: 'Custom Script', 
            icon: CodeIcon, 
            inputs: ['input'], 
            outputs: ['output'],
            agent_config: {
              description: {
                title: 'Description',
                type: 'textarea',
                value: 'Executes custom code for specialized processing'
              },
              responsible_department: {
                title: 'Responsible Department',
                type: 'text',
                value: 'Development Team'
              },
              prompt: {
                title: 'Prompt Instructions',
                type: 'textarea',
                value: 'Provide custom script or code snippet'
              },
              model: {
                title: 'Model Name',
                type: 'text',
                value: 'code-runner-v3'
              },
              max_tokens: {
                title: 'Max Tokens',
                type: 'number',
                value: 5000
              },
              temperature: {
                title: 'Temperature',
                type: 'number',
                value: 0.2
              },
              guidelines: {
                title: 'Usage Guidelines',
                type: 'textarea',
                value: 'Ensure code is properly sanitized and resource usage is limited'
              }
            }
          },
          { 
            type: 'utility', 
            name: 'Monitoring', 
            icon: PulseIcon, 
            inputs: ['data'], 
            outputs: ['alerts'],
            agent_config: {
              description: {
                title: 'Description',
                type: 'textarea',
                value: 'Monitors system metrics and generates alerts'
              },
              responsible_department: {
                title: 'Responsible Department',
                type: 'text',
                value: 'Operations'
              },
              prompt: {
                title: 'Prompt Instructions',
                type: 'textarea',
                value: 'Define monitoring thresholds and alert conditions'
              },
              model: {
                title: 'Model Name',
                type: 'text',
                value: 'monitor-system-v1'
              },
              max_tokens: {
                title: 'Max Tokens',
                type: 'number',
                value: 1000
              },
              temperature: {
                title: 'Temperature',
                type: 'number',
                value: 0.0
              },
              guidelines: {
                title: 'Usage Guidelines',
                type: 'textarea',
                value: 'Set appropriate thresholds to avoid alert fatigue'
              }
            }
          },
          { 
            type: 'utility', 
            name: 'Configuration', 
            icon: GearIcon, 
            inputs: ['settings'], 
            outputs: ['config'],
            agent_config: {
              description: {
                title: 'Description',
                type: 'textarea',
                value: 'Manages system-wide configuration parameters'
              },
              responsible_department: {
                title: 'Responsible Department',
                type: 'text',
                value: 'System Administration'
              },
              prompt: {
                title: 'Prompt Instructions',
                type: 'textarea',
                value: 'Specify configuration parameters'
              },
              model: {
                title: 'Model Name',
                type: 'text',
                value: 'config-manager-v2'
              },
              max_tokens: {
                title: 'Max Tokens',
                type: 'number',
                value: 1200
              },
              temperature: {
                title: 'Temperature',
                type: 'number',
                value: 0.0
              },
              guidelines: {
                title: 'Usage Guidelines',
                type: 'textarea',
                value: 'Keep sensitive configuration information encrypted'
              }
            }
          },
        ],
      },
    ];
  }

  /**
   * Get a specific agent by type and name
   * @param {string} type - The agent type
   * @param {string} name - The agent name
   * @returns {Object|null} The agent object or null if not found
   */
  getAgentByTypeAndName(type, name) {
    console.log(`[AgentsService] Looking for agent with type: ${type}, name: ${name}`);
    const categories = this.getAgentCategories();
    
    for (const category of categories) {
      const agent = category.nodes.find(node => 
        // Check if either type matches or name matches
        (node.type === type) || (node.name === name)
      );
      
      if (agent) {
        console.log(`[AgentsService] Found agent:`, agent);
        return agent;
      }
    }
    
    console.log(`[AgentsService] No agent found for type: ${type}, name: ${name}`);
    return null;
  }
  
  /**
   * Get a list of all available agents
   * @returns {Array} Array of all agent objects
   */
  getAllAgents() {
    const categories = this.getAgentCategories();
    const allAgents = [];
    
    for (const category of categories) {
      allAgents.push(...category.nodes);
    }
    
    return allAgents;
  }
}

// Export a singleton instance
export default new AgentsService();
