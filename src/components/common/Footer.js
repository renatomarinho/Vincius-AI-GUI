import React from 'react';
import { Box, Text, Link, Heading } from '@primer/react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box as="footer" sx={{ 
      bg: 'canvas.subtle',
      p: 4,
      borderTop: '1px solid',
      borderColor: 'border.default'
    }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        maxWidth: '1200px',
        mx: 'auto',
        flexDirection: ['column', 'column', 'row']
      }}>
        <Box sx={{ mb: [4, 4, 0] }}>
          <Heading sx={{ fontSize: 3, mb: 2 }}>Vincius AI GUI</Heading>
          <Text>Advanced interface for AI interaction</Text>
        </Box>
        
        <Box sx={{ mb: [4, 4, 0] }}>
          <Heading sx={{ fontSize: 2, mb: 2 }}>Links</Heading>
          <Box as="ul" sx={{ listStyle: 'none', p: 0 }}>
            <Box as="li" sx={{ mb: 1 }}>
              <Link href="/">Home</Link>
            </Box>
            <Box as="li" sx={{ mb: 1 }}>
              <Link href="/about">About</Link>
            </Box>
            <Box as="li" sx={{ mb: 1 }}>
              <Link href="/contact">Contact</Link>
            </Box>
          </Box>
        </Box>
        
        <Box>
          <Heading sx={{ fontSize: 2, mb: 2 }}>Legal</Heading>
          <Box as="ul" sx={{ listStyle: 'none', p: 0 }}>
            <Box as="li" sx={{ mb: 1 }}>
              <Link href="/terms">Terms of Service</Link>
            </Box>
            <Box as="li" sx={{ mb: 1 }}>
              <Link href="/privacy">Privacy Policy</Link>
            </Box>
          </Box>
        </Box>
      </Box>
      
      <Box sx={{ 
        textAlign: 'center', 
        mt: 4, 
        pt: 3,
        borderTop: '1px solid',
        borderColor: 'border.default'
      }}>
        <Text>&copy; {currentYear} Vincius AI. All rights reserved.</Text>
      </Box>
    </Box>
  );
};

export default Footer;
