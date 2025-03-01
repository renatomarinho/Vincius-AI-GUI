import React from 'react';

const ApiIcon = ({ size = 16, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      width={size}
      height={size}
      fill="currentColor"
      style={{ display: 'inline-block', verticalAlign: 'text-bottom' }}
      {...props}
    >
      <path d="M2 2h12a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zm0 1v10h12V3H2zm2.5 5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0-2a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1zm7 2a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0-2a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1zm-3.5 5c-.28 0-.5-.22-.5-.5v-5c0-.28.22-.5.5-.5s.5.22.5.5v5c0 .28-.22.5-.5.5z"/>
    </svg>
  );
};

export default ApiIcon;
