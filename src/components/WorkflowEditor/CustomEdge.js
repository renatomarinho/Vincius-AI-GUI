import React from 'react';
import { BaseEdge, getBezierPath, EdgeLabelRenderer } from '@xyflow/react';
import styles from './WorkflowEditor.module.css';
import { deleteEdgeById } from './edgeUtils';

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

  // Edge delete handler - use the new utility function
  const onEdgeClick = (evt) => {
    evt.stopPropagation();
    
    // Log to confirm the handler is executing
    console.log('Delete button clicked for edge:', id);
    
    try {
      // Use the utility function to delete the edge
      deleteEdgeById(id);
      
      // For immediate visual feedback
      evt.currentTarget.classList.add('deleting');
      
      console.log('Edge deletion requested successfully');
    } catch (error) {
      console.error('Error requesting edge deletion:', error);
    }
  };

  return (
    <>
      <BaseEdge 
        path={edgePath} 
        style={edgeStyle} 
        markerEnd={markerEnd}
        data-edge-id={id} 
      />
      
      {/* Invisible wider path for easier clicking */}
      <path
        d={edgePath}
        stroke="transparent"
        strokeWidth={10}
        fill="none"
        style={{ cursor: 'pointer' }}
        data-edge-id={id}
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
      
      {/* Delete button in the middle of the edge - make it more visible */}
      <EdgeLabelRenderer>
        <div
          className={styles.edgeButtonContainer}
          style={{
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            pointerEvents: 'all' // Ensure clicks are captured
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
