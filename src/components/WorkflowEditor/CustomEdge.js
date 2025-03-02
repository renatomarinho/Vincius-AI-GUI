import React from 'react';
import { BaseEdge, getBezierPath, EdgeLabelRenderer } from '@xyflow/react';
import styles from './WorkflowEditor.module.css';

const CustomEdge = ({ 
  id, 
  sourceX, 
  sourceY, 
  targetX, 
  targetY, 
  sourcePosition, 
  targetPosition, 
  style = {}, 
  selected, 
  markerEnd,
  data
}) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  // Apply different styles for selected edges
  const edgeStyle = {
    ...style,
    stroke: selected ? '#ff0072' : style.stroke || '#555',
    strokeWidth: selected ? 2 : 1,
  };

  // Edge delete handler - we'll use the global ReactFlow instance
  const onEdgeClick = (evt) => {
    evt.stopPropagation();
    
    // Dispatch a custom event that the workflow editor can listen to
    const event = new CustomEvent('workflow-edge:delete', { 
      detail: { edgeId: id } 
    });
    window.dispatchEvent(event);
  };

  return (
    <>
      <BaseEdge path={edgePath} style={edgeStyle} markerEnd={markerEnd} />
      
      {/* Invisible wider path for easier clicking */}
      <path
        d={edgePath}
        stroke="transparent"
        strokeWidth={10}
        fill="none"
        style={{ cursor: 'pointer' }}
      />
      
      {selected && (
        <path
          d={edgePath}
          strokeDasharray="5,5"
          stroke="#ff0072"
          fill="none"
          strokeWidth={1}
          className={styles.animated}
          style={{ pointerEvents: 'none' }}
        />
      )}
      
      {/* Delete button in the middle of the edge */}
      <EdgeLabelRenderer>
        <div
          className={styles.edgeButtonContainer}
          style={{
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
          }}
        >
          <button 
            className={styles.edgeDeleteButton} 
            onClick={onEdgeClick}
            title="Delete connection"
          >
            ×
          </button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

export default CustomEdge;
