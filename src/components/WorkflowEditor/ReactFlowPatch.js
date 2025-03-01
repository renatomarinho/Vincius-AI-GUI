/**
 * This file contains patches for React Flow to prevent common errors
 */

import React, { useEffect } from 'react';

// Monkey patch Object.keys to handle null/undefined values safely
const originalObjectKeys = Object.keys;
const safeObjectKeys = function(obj) {
  if (obj === null || obj === undefined) {
    console.warn('Attempted to use Object.keys on null or undefined');
    return [];
  }
  return originalObjectKeys(obj);
};

/**
 * A component that applies patches to fix React Flow issues
 * - Should be rendered near the top of your application
 */
export const ReactFlowPatchProvider = ({ children }) => {
  useEffect(() => {
    // Apply patches when the component mounts
    Object.keys = safeObjectKeys;
    
    // Remove patches when component unmounts
    return () => {
      Object.keys = originalObjectKeys;
    };
  }, []);
  
  return <>{children}</>;
};
