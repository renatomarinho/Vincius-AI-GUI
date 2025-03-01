import React, { useEffect, useRef, useState } from 'react';
import './AgentSidebar.css';

/**
 * Sidebar para configuração de agentes que funciona independentemente do fluxo React principal
 * Fornece uma alternativa robusta quando a sidebar principal falhar
 */
const AgentSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [nodeData, setNodeData] = useState(null);
  const [nodeName, setNodeName] = useState('');
  const sidebarRef = useRef(null);
  
  useEffect(() => {
    // Define a sidebar API no objeto window
    window.emergencySidebar = {
      open: (data) => {
        console.log('Opening agent sidebar with data:', data);
        setNodeData(data);
        setNodeName(data?.data?.label || '');
        setIsOpen(true);
      },
      close: () => {
        setIsOpen(false);
      },
      isVisible: () => isOpen
    };
    
    // Função para fechar ao pressionar ESC
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        window.emergencySidebar.close();
      }
    };
    
    // Função para fechar ao clicar fora
    const handleOutsideClick = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target) && isOpen) {
        window.emergencySidebar.close();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleOutsideClick);
    
    // Atalho Alt+S para abrir/fechar
    const handleAltS = (e) => {
      if (e.altKey && e.key === 's') {
        if (isOpen) {
          window.emergencySidebar.close();
        } else {
          window.emergencySidebar.open({
            id: 'keyboard-triggered',
            data: { label: 'Aberto com Alt+S' }
          });
        }
      }
    };
    
    document.addEventListener('keydown', handleAltS);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleAltS);
    };
  }, [isOpen]);
  
  const handleSave = () => {
    if (nodeData && window.updateNodeName) {
      window.updateNodeName(nodeData.id, nodeName);
      console.log('Saved node with new name:', nodeName);
    }
    window.emergencySidebar.close();
  };
  
  return (
    <div 
      ref={sidebarRef}
      className={`agent-sidebar ${isOpen ? 'open' : ''}`}
    >
      <div className="agent-sidebar-header">
        <strong>Agent Configuration</strong>
        <button 
          onClick={() => window.emergencySidebar.close()}
          className="close-button"
        >
          X
        </button>
      </div>
      <div className="agent-sidebar-content">
        <h2>Node Settings</h2>
        <p>Configure your workflow node.</p>
        
        <div className="node-info">
          {nodeData && (
            <>
              <div className="node-details">
                <p><strong>ID:</strong> {nodeData.id || 'No ID'}</p>
                <p><strong>Type:</strong> {nodeData.type || 'No Type'}</p>
              </div>
              
              <div className="form-control">
                <label htmlFor="agent-node-name">Node Name:</label>
                <input
                  id="agent-node-name"
                  type="text"
                  value={nodeName}
                  onChange={(e) => setNodeName(e.target.value)}
                />
              </div>
            </>
          )}
        </div>
        
        <div className="button-group">
          <button 
            onClick={() => window.emergencySidebar.close()}
            className="cancel-button"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            className="save-button"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgentSidebar;
