import React, { useCallback } from 'react';
import { useNodeId, useReactFlow } from '@xyflow/react';
import { TrashIcon } from '@primer/octicons-react';
import { NodeHeaderAction } from './NodeHeaderActions';

/**
 * A custom delete action button that removes the node from the graph when clicked.
 */
export const NodeHeaderDeleteAction = React.forwardRef((props, ref) => {
  const id = useNodeId();
  const { setNodes } = useReactFlow();
 
  const handleClick = useCallback(() => {
    setNodes((prevNodes) => prevNodes.filter((node) => node.id !== id));
  }, [id, setNodes]);
 
  return (
    <NodeHeaderAction
      ref={ref}
      onClick={handleClick}
      variant="ghost"
      {...props}
    >
      <TrashIcon size={16} />
    </NodeHeaderAction>
  );
});
 
NodeHeaderDeleteAction.displayName = 'NodeHeaderDeleteAction';
