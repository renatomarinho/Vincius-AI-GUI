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
          { type: 'input', name: 'Database Source', icon: DatabaseIcon, inputs: [], outputs: ['data'] },
          { type: 'input', name: 'API Source', icon: BroadcastIcon, inputs: [], outputs: ['data'] },
          { type: 'input', name: 'File Input', icon: FileIcon, inputs: [], outputs: ['data'] },
        ],
      },
      {
        name: 'Processing',
        nodes: [
          { type: 'process', name: 'Filter Data', icon: FilterIcon, inputs: ['data'], outputs: ['filtered'] },
          { type: 'process', name: 'Transform', icon: CodeIcon, inputs: ['data'], outputs: ['transformed'] },
          { type: 'process', name: 'Aggregate', icon: TableIcon, inputs: ['data'], outputs: ['aggregated'] },
          { type: 'process', name: 'AI Agent', icon: HubotIcon, inputs: ['prompt'], outputs: ['response'] },
        ],
      },
      {
        name: 'Outputs',
        nodes: [
          { type: 'output', name: 'Visualization', icon: GraphIcon, inputs: ['data'], outputs: [] },
          { type: 'output', name: 'Export Data', icon: DatabaseIcon, inputs: ['data'], outputs: [] },
          { type: 'output', name: 'API Output', icon: TerminalIcon, inputs: ['data'], outputs: [] },
        ],
      },
      {
        name: 'Utilities',
        nodes: [
          { type: 'utility', name: 'Custom Script', icon: CodeIcon, inputs: ['input'], outputs: ['output'] },
          { type: 'utility', name: 'Monitoring', icon: PulseIcon, inputs: ['data'], outputs: ['alerts'] },
          { type: 'utility', name: 'Configuration', icon: GearIcon, inputs: ['settings'], outputs: ['config'] },
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
    const categories = this.getAgentCategories();
    
    for (const category of categories) {
      const agent = category.nodes.find(node => node.type === type && node.name === name);
      if (agent) {
        return agent;
      }
    }
    
    return null;
  }
}

// Export a singleton instance
export default new AgentsService();
