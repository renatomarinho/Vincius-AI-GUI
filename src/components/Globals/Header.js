import React from 'react';
import { Header as PrimerHeader, Box, StyledOcticon, Text } from '@primer/react';

const Header = () => {
  return (
    <PrimerHeader>
      <PrimerHeader.Item>
        <PrimerHeader.Link href="/" sx={{ fontSize: 2 }}>
          <Text>Vincius AI</Text>
        </PrimerHeader.Link>
      </PrimerHeader.Item>
      <Box sx={{ display: 'flex', flexGrow: 1 }} />
      <PrimerHeader.Item>
        <PrimerHeader.Link href="/workflow">Workflow</PrimerHeader.Link>
      </PrimerHeader.Item>
      <PrimerHeader.Item>
        <PrimerHeader.Link href="/agents">Agents</PrimerHeader.Link>
      </PrimerHeader.Item>
      <PrimerHeader.Item>
        <PrimerHeader.Link href="/settings">Settings</PrimerHeader.Link>
      </PrimerHeader.Item>
    </PrimerHeader>
  );
};

export default Header;
