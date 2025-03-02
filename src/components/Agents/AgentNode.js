import React from 'react';
import { Handle, Position } from 'reactflow';

/**
 * Custom Node component for agent nodes in ReactFlow
 * This component renders a node with input/output handles and 
 * opens the configuration sidebar when clicked
 */
const AgentNode = ({ id, data, type }) => {
  const handleClick = () => {
    // Open agent sidebar when node is clicked
    if (window.emergencySidebar) {
      // Get current node data
      const nodeData = window.getNodeById ? window.getNodeById(id) : { id, data, type };
      window.emergencySidebar.open(nodeData);
    }
  };

  return (
    <div 
      className={`agent-node agent-node-${type}`} 
      onClick={handleClick}
    >
      {/* Input handle at the top */}
      {data.inputs && data.inputs.length > 0 && (
        <Handle
          type="target"
          position={Position.Top}
          style={{ background: '#555' }}
        />
      )}
      
      {/* Node content */}
      <div className="agent-node-header">
        {data.icon && <data.icon size={16} />}
        <div className="agent-node-title">{data.label}</div>
      </div>
      
      <div className="agent-node-content">
        {data.nodeType && <div className="agent-node-type">{data.nodeType}</div>}
        {data.agentConfig && (
          <div className="agent-node-config-indicator">
            <span>Configured</span>
          </div>
        )}
      </div>
      
      {/* Output handle at the bottom */}
      {data.outputs && data.outputs.length > 0 && (
        <Handle
          type="source"
          position={Position.Bottom}
          style={{ background: '#555' }}
        />
      )}
    </div>
  );
};

export default AgentNode;
