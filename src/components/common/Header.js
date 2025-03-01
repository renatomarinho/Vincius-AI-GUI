import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Header as PrimerHeader, Box, Button } from '@primer/react';
import { MoonIcon, SunIcon } from '@primer/octicons-react';
import { useTheme } from '../../context/ThemeContext';
import Navigation from './Navigation';
import Logo from './Logo';

const Header = () => {
  const { colorMode, toggleTheme } = useTheme();

  return (
    <PrimerHeader sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <RouterLink to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Logo />
          </RouterLink>
        </Box>
        
        <Navigation />
        
        <Button 
          variant="invisible"
          onClick={toggleTheme} 
          aria-label={`Switch to ${colorMode === 'day' ? 'dark' : 'light'} mode`}
        >
          {colorMode === 'day' ? <MoonIcon /> : <SunIcon />}
        </Button>
      </Box>
    </PrimerHeader>
  );
};

export default Header;
