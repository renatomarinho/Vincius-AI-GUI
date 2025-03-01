import React, { useRef, useEffect } from 'react';
import {
  Box,
  TextInput,
  FormControl,
  Button,
  Heading,
  BorderBox
} from '@primer/react';
import { XIcon } from '@primer/octicons-react';
import './RightSidebar.css';

/**
 * A sidebar that appears on the right side of the screen
 * Used for configuring workflow elements
 */
const RightSidebar = ({ title, isOpen, onClose, onSave, children, data = {} }) => {
  const [formData, setFormData] = React.useState(data);
  const sidebarRef = useRef(null);
  
  useEffect(() => {
    console.log('RightSidebar rendered:', { isOpen, data });
    setFormData(data);
  }, [isOpen, data]);

  // Adicionar este useEffect para detectar cliques fora da sidebar
  useEffect(() => {
    if (!isOpen || !sidebarRef.current) return;
    
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        console.log('Click detected outside sidebar');
        onClose();
      }
    };
    
    // Add event listener
    document.addEventListener('mousedown', handleClickOutside);
    
    // Add escape key listener
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        console.log('Escape key pressed');
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscKey);
    
    // Clean up
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onClose]);

  // CRITICAL: Set fixed styles with !important to ensure visibility
  const sidebarStyle = {
    position: 'fixed',
    top: 0,
    right: isOpen ? '0 !important' : '-350px',
    width: '350px',
    height: '100vh',
    backgroundColor: 'white',
    boxShadow: '-3px 0 15px rgba(0, 0, 0, 0.3)',
    zIndex: 10000,
    display: isOpen ? 'block !important' : 'none',
    overflow: 'auto',
    border: '3px solid red' // VERY visible border for debugging
  };

  // DEBUG LOG
  console.log("Sidebar rendering with isOpen =", isOpen);

  // If isOpen is false, don't return null - still render to test visibility
  return (
    <div 
      className={`right-sidebar ${isOpen ? 'open' : ''}`} 
      style={sidebarStyle}
      ref={sidebarRef}
    >
      <div style={{
        background: 'red', 
        color: 'white', 
        padding: '5px', 
        textAlign: 'center',
        display: isOpen ? 'block' : 'none'
      }}>
        DEBUG: SIDEBAR IS OPEN
      </div>
      
      <Box p={3}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Heading as="h2" sx={{ fontSize: 3 }}>
            {title || 'Configuration'} {isOpen ? '(OPEN)' : '(CLOSED)'}
          </Heading>
          <Button
            aria-label="Close"
            variant="invisible"
            onClick={() => {
              console.log('Close button clicked');
              onClose();
            }}
            sx={{ padding: '4px', color: 'fg.muted' }}
          >
            <XIcon />
          </Button>
        </Box>

        <BorderBox p={3} borderRadius={2} bg="canvas.subtle">
          {/* Custom content passed as children */}
          {children || (
            <>
              <FormControl sx={{ mb: 3 }}>
                <FormControl.Label>Name</FormControl.Label>
                <TextInput
                  block
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter name"
                />
              </FormControl>
              
              <Box display="flex" justifyContent="flex-end" mt={3}>
                <Button
                  onClick={onClose}
                  variant="invisible"
                  sx={{ mr: 2 }}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={() => onSave(formData)}
                  variant="primary"
                >
                  Save Changes
                </Button>
              </Box>
            </>
          )}
        </BorderBox>
      </Box>
    </div>
  );
};

export default RightSidebar;
