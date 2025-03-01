import React, { createContext, useState, useContext } from 'react';
import { ThemeProvider as PrimerThemeProvider } from '@primer/react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [colorMode, setColorMode] = useState(() => {
    const savedMode = localStorage.getItem('colorMode');
    return savedMode || 'day';
  });
  
  const [dayScheme, setDayScheme] = useState(() => {
    const savedScheme = localStorage.getItem('dayScheme');
    return savedScheme || 'light';
  });
  
  const [nightScheme, setNightScheme] = useState(() => {
    const savedScheme = localStorage.getItem('nightScheme');
    return savedScheme || 'dark';
  });

  const toggleTheme = () => {
    setColorMode(prevMode => {
      const newMode = prevMode === 'day' ? 'night' : 'day';
      localStorage.setItem('colorMode', newMode);
      return newMode;
    });
  };
  
  const changeColorScheme = (mode, scheme) => {
    if (mode === 'day') {
      setDayScheme(scheme);
      localStorage.setItem('dayScheme', scheme);
    } else {
      setNightScheme(scheme);
      localStorage.setItem('nightScheme', scheme);
    }
  };

  return (
    <ThemeContext.Provider value={{ 
      colorMode, 
      toggleTheme, 
      dayScheme, 
      nightScheme, 
      changeColorScheme 
    }}>
      <PrimerThemeProvider 
        colorMode={colorMode} 
        dayScheme={dayScheme} 
        nightScheme={nightScheme} 
        preventSSRMismatch
      >
        {children}
      </PrimerThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
