import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Box } from '@primer/react';
import styles from './WorkflowEditor.module.css';

const CustomNode = ({ data, id }) => {
  const { label, type, inputs = [], outputs = [], icon: Icon } = data;
  
  return (
    <div className={`${styles.customNode} ${styles[type]}`}>
      <div className={styles.nodeHeader}>
        {Icon && <Icon size={16} className={styles.nodeIcon} />}
        <div className={styles.nodeTitle}>{label}</div>
        <div className={styles.nodeType}>{type}</div>
      </div>
      
      <div className={styles.handles}>
        {inputs.length > 0 && (
          <Box mb={2}>
            {inputs.map((input, index) => (
              <Handle
                key={`${id}-input-${index}`}
                type="target"
                position={Position.Left}
                id={input}
                style={{ top: 60 + index * 20 }}
              />
            ))}
          </Box>
        )}
        
        {outputs.length > 0 && (
          <Box>
            {outputs.map((output, index) => (
              <Handle
                key={`${id}-output-${index}`}
                type="source"
                position={Position.Right}
                id={output}
                style={{ top: 60 + index * 20 }}
              />
            ))}
          </Box>
        )}
      </div>
    </div>
  );
};

export default memo(CustomNode);
