import React from 'react';
import { Button, ActionMenu, ActionList } from '@primer/react';
import { KebabHorizontalIcon } from '@primer/octicons-react';
import styled from 'styled-components';

const StyledNodeHeaderActions = styled.div`
  display: flex;
  gap: 4px;
`;

export const NodeHeaderAction = React.forwardRef(
  ({ children, variant = 'invisible', ...props }, ref) => {
    return (
      <Button
        ref={ref}
        variant={variant}
        size="small"
        sx={{ padding: '4px' }}
        {...props}
      >
        {children}
      </Button>
    );
  }
);

NodeHeaderAction.displayName = 'NodeHeaderAction';

export const NodeHeaderMenuAction = ({ label, children }) => {
  return (
    <ActionMenu>
      <ActionMenu.Anchor>
        <NodeHeaderAction aria-label={label}>
          <KebabHorizontalIcon size={16} />
        </NodeHeaderAction>
      </ActionMenu.Anchor>

      <ActionMenu.Overlay>
        <ActionList>{children}</ActionList>
      </ActionMenu.Overlay>
    </ActionMenu>
  );
};

export const DropdownMenuLabel = ({ children }) => {
  return <ActionList.Header>{children}</ActionList.Header>;
};

export const DropdownMenuSeparator = () => {
  return <ActionList.Divider />;
};

export const DropdownMenuItem = ({ children }) => {
  return <ActionList.Item>{children}</ActionList.Item>;
};

export const NodeHeaderActions = ({ children }) => {
  return <StyledNodeHeaderActions>{children}</StyledNodeHeaderActions>;
};
