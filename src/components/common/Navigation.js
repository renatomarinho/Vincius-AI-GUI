import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Link } from '@primer/react';

const Navigation = () => {
  return (
    <Box as="nav" sx={{ display: 'flex', mx: 4 }}>
      <Box sx={{ display: 'flex', gap: 3 }}>
        <Link as={RouterLink} to="/" sx={{ color: 'fg.default', textDecoration: 'none', fontWeight: 'medium' }}>
          Home
        </Link>
        <Link as={RouterLink} to="/about" sx={{ color: 'fg.default', textDecoration: 'none', fontWeight: 'medium' }}>
          About
        </Link>
        <Link as={RouterLink} to="/components" sx={{ color: 'fg.default', textDecoration: 'none', fontWeight: 'medium' }}>
          Components
        </Link>
        <Link as={RouterLink} to="/dashboard" sx={{ color: 'fg.default', textDecoration: 'none', fontWeight: 'medium' }}>
          Dashboard
        </Link>
      </Box>
    </Box>
  );
};

export default Navigation;
