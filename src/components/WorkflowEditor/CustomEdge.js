import React from 'react';
import { BaseEdge, getBezierPath } from '@xyflow/react';
import styles from './WorkflowEditor.module.css';

const CustomEdge = ({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, style = {}, selected, onClick }) => {
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

  // Clickable invisible path with larger stroke width for easier selection
  const handleEdgeClick = (evt) => {
    evt.stopPropagation();
    console.log('Edge clicked in component:', id);
  };

  return (
    <>
      <BaseEdge path={edgePath} style={edgeStyle} />
      
      {/* Invisible wider path for easier clicking */}
      <path
        d={edgePath}
        stroke="transparent"
        strokeWidth={10}
        fill="none"
        onClick={handleEdgeClick}
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
    </>
  );
};

export default CustomEdge;
