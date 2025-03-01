import React from 'react';

const BotIcon = ({ size = 16, ...props }) => {
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
      <path d="M1 5a1 1 0 0 1 1-1h2.75c-.583-.402-1.016-.933-1.204-1.621a2 2 0 0 1 3.694-1.466 3.5 3.5 0 0 1 7.88-1.289A1.5 1.5 0 0 1 14 .5V2h.25A1.75 1.75 0 0 1 16 3.75v2.5A1.75 1.75 0 0 1 14.25 8H14v.25c0 .414-.336.75-.75.75H5.56l-.94 3.69A1.25 1.25 0 0 1 3.41 14h-.163a1.25 1.25 0 0 1-1.228-1.517L3 9H2a1 1 0 0 1-1-1Zm3.5-4a.5.5 0 0 0-.5.5V2h1.17c.339-.155.732-.23 1.151-.23h.183a4.5 4.5 0 0 1 3.013 1.155 1.751 1.751 0 0 1 .555-.1A2.5 2.5 0 0 0 7.7.553a.5.5 0 0 0-.2-.053Zm1 5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Zm7 0a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Z"/>
    </svg>
  );
};

export default BotIcon;
