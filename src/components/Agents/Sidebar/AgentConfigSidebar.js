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
import './Sidebar.css';

const AgentConfigSidebar = ({ agent, isOpen, onClose, onSave }) => {
  const [agentName, setAgentName] = React.useState('');
  const sidebarRef = useRef(null);

  // Debug logging for troubleshooting
  useEffect(() => {
    console.log('AgentConfigSidebar rendered with:', { agent, isOpen });
  }, [agent, isOpen]);

  // Update agent name when the agent changes
  useEffect(() => {
    if (agent) {
      console.log('Setting agent name to:', agent.data?.label);
      setAgentName(agent.data?.label || '');
    }
  }, [agent]);

  const handleSave = () => {
    if (!agent) {
      console.warn('Cannot save: no agent selected');
      return;
    }
    
    console.log('Saving agent with new name:', agentName);
    onSave({
      ...agent,
      data: {
        ...agent.data,
        label: agentName
      }
    });
  };

  // Inline styles with !important to override everything
  const containerStyles = {
    position: 'fixed',
    top: '0',
    right: isOpen ? '0' : '-320px',
    width: '320px',
    height: '100vh',
    backgroundColor: 'white',
    boxShadow: '-2px 0 15px rgba(0, 0, 0, 0.2)',
    zIndex: '9999',
    display: isOpen ? 'block' : 'none',
    border: '2px solid red', // For debugging
    transition: 'right 0.3s ease',
  };

  // If the sidebar isn't open, don't render anything
  if (!isOpen) {
    return null;
  }

  return (
    <div 
      className="agent-config-sidebar"
      ref={sidebarRef}
      style={containerStyles}
    >
      <Box 
        bg="canvas.default"
        borderLeft="1px solid"
        borderColor="border.default"
        width="100%"
        height="100%"
        p={3}
        sx={{ 
          overflowY: 'auto',
          boxShadow: '-2px 0 8px rgba(0, 0, 0, 0.05)',
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Heading as="h3" sx={{ fontSize: 2 }}>
            Agent Configuration (FIXED)
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
          <FormControl>
            <FormControl.Label>Agent Name</FormControl.Label>
            <TextInput
              block
              value={agentName || ''}
              onChange={(e) => {
                console.log('Name changed:', e.target.value);
                setAgentName(e.target.value);
              }}
              placeholder="Enter agent name"
              aria-label="Agent name"
              sx={{ mb: 3 }}
            />
          </FormControl>

          <Box display="flex" justifyContent="flex-end" mt={3}>
            <Button 
              onClick={() => onClose()} 
              variant="invisible"
              sx={{ mr: 2 }}
            >
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </Box>
        </BorderBox>
      </Box>
    </div>
  );
};

export default AgentConfigSidebar;
