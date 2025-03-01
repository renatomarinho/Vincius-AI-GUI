import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Heading, Link } from '@primer/react';
import { ThreeBarsIcon, XIcon } from '@primer/octicons-react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Box
      as="aside"
      sx={{
        width: ['100%', '100%', '250px'],
        height: [isOpen ? 'auto' : '0px', isOpen ? 'auto' : '0px', 'auto'],
        overflow: ['hidden', 'hidden', 'visible'],
        transition: 'height 0.3s ease',
        position: ['relative', 'relative', 'sticky'],
        top: 0,
        borderRight: '1px solid',
        borderColor: 'border.default',
        bg: 'canvas.default',
        '@media (max-width: 768px)': {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          borderRight: 'none',
        },
      }}
    >
      <Button
        variant="invisible"
        onClick={toggleSidebar}
        sx={{
          display: ['block', 'block', 'none'],
          position: 'absolute',
          top: '10px',
          right: '10px',
        }}
      >
        {isOpen ? <XIcon /> : <ThreeBarsIcon />}
      </Button>

      <Box sx={{ p: 3 }}>
        <Heading sx={{ fontSize: 2, mb: 3 }}>Quick Navigation</Heading>
        <Box as="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
          <Box as="li" sx={{ mb: 2 }}>
            <Link as={RouterLink} to="/dashboard" sx={{ display: 'block' }}>
              Dashboard
            </Link>
          </Box>
          <Box as="li" sx={{ mb: 2 }}>
            <Link as={RouterLink} to="/projects" sx={{ display: 'block' }}>
              Projects
            </Link>
          </Box>
          <Box as="li" sx={{ mb: 2 }}>
            <Link as={RouterLink} to="/analytics" sx={{ display: 'block' }}>
              Analytics
            </Link>
          </Box>
          <Box as="li" sx={{ mb: 2 }}>
            <Link as={RouterLink} to="/settings" sx={{ display: 'block' }}>
              Settings
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
