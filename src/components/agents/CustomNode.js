import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';

// Versão ultrassimplificada do nó para evitar problemas de renderização
const CustomNode = ({ data, isConnectable }) => {
  return (
    <div style={{
      padding: '10px',
      borderRadius: '5px',
      backgroundColor: 'white',
      border: '1px solid #ddd',
      width: '180px',
    }}>
      {/* Handle superior simplificado */}
      <Handle
        type="target"
        position={Position.Top}
        style={{ 
          background: '#555', 
          width: '10px', 
          height: '10px', 
          border: '2px solid #fff' 
        }}
        isConnectable={isConnectable}
      />
      
      {/* Conteúdo simples do nó */}
      <div style={{ 
        backgroundColor: data.type === 'agent' ? '#E9F2FF' : '#DEFFDE', 
        padding: '5px',
        marginBottom: '8px',
        borderRadius: '3px',
        fontWeight: 'bold',
        fontSize: '12px',
        textTransform: 'uppercase',
      }}>
        {data.type || 'Node'}
      </div>
      
      <div style={{ padding: '5px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ marginRight: '8px' }}>
            {data.icon}
          </span>
          <strong style={{ fontSize: '14px' }}>{data.label}</strong>
        </div>
        
        {data.description && (
          <div style={{ 
            fontSize: '12px', 
            color: '#666', 
            marginTop: '5px',
            lineHeight: 1.4
          }}>
            {data.description}
          </div>
        )}
      </div>
      
      {/* Handle inferior simplificado */}
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ 
          background: '#555', 
          width: '10px', 
          height: '10px', 
          border: '2px solid #fff' 
        }}
        isConnectable={isConnectable}
      />
    </div>
  );
};

export default memo(CustomNode);
