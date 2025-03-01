import React, { memo, useCallback } from 'react';
import { Handle, Position, useReactFlow } from '@xyflow/react';
import { Box } from '@primer/react';
import { 
  NodeHeader,
  NodeHeaderIcon, 
  NodeHeaderTitle 
} from '../Agents/NodeHeader';
import { 
  NodeHeaderActions, 
  NodeHeaderMenuAction, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator,
  NodeHeaderDeleteAction 
} from '../Agents/Actions';
import styles from './WorkflowEditor.module.css';
import { ensureObject } from './WorkflowEditorUtils';
import { configureNode } from './NodeConfigEvents';

const CustomNode = (props) => {
  const { data = {}, id, selected, isConnectable } = props;
  const safeData = ensureObject(data);
  const { label, type, inputs = [], outputs = [], icon: Icon } = safeData;
  
  const nodeId = id || `node-${Math.random().toString(36).substring(2, 9)}`;
  const reactFlowInstance = useReactFlow();
  
  const handleDeleteNode = useCallback(() => {
    reactFlowInstance.setNodes((nodes) => nodes.filter((node) => node.id !== nodeId));
    reactFlowInstance.setEdges((edges) => 
      edges.filter((edge) => edge.source !== nodeId && edge.target !== nodeId)
    );
  }, [nodeId, reactFlowInstance]);
  
  // Only update the configuration handlers
  const handleDoubleClick = useCallback((e) => {
    e.stopPropagation();
    console.log('Double clicked node:', id);
    
    // Use the emergency sidebar that's guaranteed to work
    if (window.emergencySidebar) {
      console.log('Opening agent sidebar');
      window.emergencySidebar.open(props);
      return;
    }
    
    // Fall back to the regular methods if emergency sidebar isn't available
    if (window.__WORKFLOW_EDITOR_CONFIG__) {
      console.log('Using DOM method for configuration');
      window.__WORKFLOW_EDITOR_CONFIG__.process(props);
      return;
    }
    
    const result = configureNode(props);
    if (!result) {
      console.log('Configuration request stored for later processing');
    }
  }, [props, id]);
  
  const handleConfigureClick = useCallback((e) => {
    if (e) e.stopPropagation();
    console.log('Configure clicked for node:', id);
    
    // Use the emergency sidebar that's guaranteed to work
    if (window.emergencySidebar) {
      console.log('Opening agent sidebar');
      window.emergencySidebar.open(props);
      return;
    }
    
    // Fall back to the regular methods
    if (window.__WORKFLOW_EDITOR_CONFIG__) {
      console.log('Using DOM method for configuration');
      window.__WORKFLOW_EDITOR_CONFIG__.process(props);
      return;
    }
    
    const result = configureNode(props);
    if (!result) {
      console.log('Configuration request stored for later processing');
    }
  }, [props, id]);
  
  return (
    <div 
      className={`${styles.customNode} ${styles[type] || ''}`}
      onDoubleClick={handleDoubleClick}
    >
      <NodeHeader className={styles.nodeHeader}>
        <NodeHeaderIcon>
          {Icon && <Icon size={16} />}
        </NodeHeaderIcon>
        <NodeHeaderTitle>{label || 'Unnamed Node'}</NodeHeaderTitle>
        <NodeHeaderActions>
          <NodeHeaderMenuAction label="Node options">
            <DropdownMenuLabel>Node Options</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleConfigureClick}>Configure</DropdownMenuItem>
            <DropdownMenuItem>Duplicate</DropdownMenuItem>
            <DropdownMenuItem>Preview</DropdownMenuItem>
          </NodeHeaderMenuAction>
          <NodeHeaderDeleteAction onClick={handleDeleteNode} />
        </NodeHeaderActions>
      </NodeHeader>
      
      <Box p={2}>
        <div className={styles.handles}>
          {inputs.length > 0 && (
            <Box mb={2}>
              {inputs.map((input, index) => (
                <Handle
                  key={`${nodeId}-input-${index}`}
                  type="target"
                  position={Position.Left}
                  id={input}
                  style={{ top: 60 + index * 20 }}
                  isConnectable={isConnectable}
                />
              ))}
            </Box>
          )}
          
          {outputs.length > 0 && (
            <Box>
              {outputs.map((output, index) => (
                <Handle
                  key={`${nodeId}-output-${index}`}
                  type="source"
                  position={Position.Right}
                  id={output}
                  style={{ top: 60 + index * 20 }}
                  isConnectable={isConnectable}
                />
              ))}
            </Box>
          )}
        </div>
      </Box>
    </div>
  );
};

export default memo(CustomNode);
