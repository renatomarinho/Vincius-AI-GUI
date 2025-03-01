import React from 'react';
import styled from 'styled-components';

const StyledNodeHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  border-bottom: 1px solid var(--color-border-default, #d0d7de);
`;

const StyledNodeHeaderIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  color: var(--color-fg-muted, #57606a);
`;

const StyledNodeHeaderTitle = styled.div`
  flex: 1;
  font-weight: 600;
  font-size: 14px;
  color: var(--color-fg-default, #24292f);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const NodeHeader = ({ className, children }) => {
  return <StyledNodeHeader className={className}>{children}</StyledNodeHeader>;
};

export const NodeHeaderIcon = ({ children }) => {
  return <StyledNodeHeaderIcon>{children}</StyledNodeHeaderIcon>;
};

export const NodeHeaderTitle = ({ children }) => {
  return <StyledNodeHeaderTitle>{children}</StyledNodeHeaderTitle>;
};
