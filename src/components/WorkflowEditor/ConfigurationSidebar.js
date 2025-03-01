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
import styles from './WorkflowEditor.module.css';

const ConfigurationSidebar = ({ node, isOpen, onClose, onSave }) => {
  const [nodeName, setNodeName] = React.useState(node?.data?.label || '');
  const sidebarRef = useRef(null);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Update node name when the node changes
  useEffect(() => {
    if (node) {
      setNodeName(node.data?.label || '');
    }
  }, [node]);

  const handleSave = () => {
    if (!node) return;
    
    onSave({
      ...node,
      data: {
        ...node.data,
        label: nodeName
      }
    });
  };

  if (!isOpen) return null;

  return (
    <Box
      ref={sidebarRef}
      className={styles.configSidebar}
      bg="canvas.default"
      borderLeft="1px solid"
      borderColor="border.default"
      width={320}
      height="100%"
      position="absolute"
      top={0}
      right={0}
      p={3}
      sx={{ 
        overflowY: 'auto',
        boxShadow: '-2px 0 8px rgba(0, 0, 0, 0.05)',
        zIndex: 1000, // Increased from 10 to 1000 to ensure visibility
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Heading as="h3" sx={{ fontSize: 2 }}>
          Node Configuration
        </Heading>
        <Button 
          aria-label="Close" 
          variant="invisible"
          onClick={onClose}
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
            value={nodeName}
            onChange={(e) => setNodeName(e.target.value)}
            placeholder="Enter agent name"
            aria-label="Agent name"
            sx={{ mb: 3 }}
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
          <Button onClick={handleSave}>Save Changes</Button>
        </Box>
      </BorderBox>
    </Box>
  );
};

export default ConfigurationSidebar;
