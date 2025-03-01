import React from 'react';
import PropTypes from 'prop-types';
import './NodeHeader.css';

// NodeHeaderIcon component
export const NodeHeaderIcon = ({ icon, children }) => {
  return <span className="node-icon">{children || icon || null}</span>;
};

NodeHeaderIcon.propTypes = {
  icon: PropTypes.node,
  children: PropTypes.node,
};

// NodeHeaderTitle component
export const NodeHeaderTitle = ({ title, type, children }) => {
  return (
    <div className="node-title-container">
      {children || (
        <>
          <span className="node-title">{title || 'Untitled'}</span>
          {type && <span className="node-type">{type}</span>}
        </>
      )}
    </div>
  );
};

NodeHeaderTitle.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  children: PropTypes.node,
};

// NodeHeaderActions component
export const NodeHeaderActions = ({ children }) => {
  return <div className="node-header-actions">{children}</div>;
};

NodeHeaderActions.propTypes = {
  children: PropTypes.node,
};

// NodeHeaderMenuAction component
export const NodeHeaderMenuAction = ({ label, children, onClick }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleMenu = (e) => {
    if (e) e.stopPropagation();
    setIsOpen(!isOpen);
  };

  // Close menu when clicking outside
  React.useEffect(() => {
    if (!isOpen) return;
    
    const handleClickOutside = () => {
      setIsOpen(false);
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="node-header-menu-action">
      <button 
        className="menu-button" 
        onClick={onClick || toggleMenu} 
        aria-label={label || "Menu"}
      >
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 4.5C2 4.22386 2.22386 4 2.5 4H12.5C12.7761 4 13 4.22386 13 4.5C13 4.77614 12.7761 5 12.5 5H2.5C2.22386 5 2 4.77614 2 4.5ZM2 7.5C2 7.22386 2.22386 7 2.5 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H2.5C2.22386 8 2 7.77614 2 7.5ZM2 10.5C2 10.2239 2.22386 10 2.5 10H12.5C12.7761 10 13 10.2239 13 10.5C13 10.7761 12.7761 11 12.5 11H2.5C2.22386 11 2 10.7761 2 10.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
        </svg>
      </button>
      {isOpen && (
        <div className="dropdown-menu" onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      )}
    </div>
  );
};

NodeHeaderMenuAction.propTypes = {
  label: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
};

// Dropdown Menu components
export const DropdownMenuLabel = ({ children }) => (
  <div className="dropdown-menu-label">{children}</div>
);

DropdownMenuLabel.propTypes = {
  children: PropTypes.node,
};

export const DropdownMenuSeparator = () => (
  <div className="dropdown-menu-separator"></div>
);

export const DropdownMenuItem = ({ children, onClick }) => (
  <div className="dropdown-menu-item" onClick={onClick}>{children}</div>
);

DropdownMenuItem.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
};

// NodeHeaderDeleteAction component
export const NodeHeaderDeleteAction = ({ onClick }) => {
  return (
    <button 
      className="delete-button" 
      onClick={onClick || (() => {})} 
      aria-label="Delete"
    >
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H3.5C3.22386 4 3 3.77614 3 3.5ZM3.5 5C3.22386 5 3 5.22386 3 5.5V12.5C3 12.7761 3.22386 13 3.5 13H11.5C11.7761 13 12 12.7761 12 12.5V5.5C12 5.22386 11.7761 5 11.5 5H3.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
      </svg>
    </button>
  );
};

NodeHeaderDeleteAction.propTypes = {
  onClick: PropTypes.func,
};

// Main NodeHeader component
export const NodeHeader = ({ title, type, icon, color, className, children, ...props }) => {
  // Use an empty object as default for any props that might be passed through
  const safeProps = props || {};
  const safeClassName = className || "";
  
  // If children are provided, render them; otherwise, render the default structure
  if (children) {
    return (
      <div 
        className={`node-header ${safeClassName}`} 
        style={{ backgroundColor: color || '#1a192b' }}
        {...safeProps}
      >
        {children}
      </div>
    );
  }

  return (
    <div 
      className={`node-header ${safeClassName}`} 
      style={{ backgroundColor: color || '#1a192b' }}
      {...safeProps}
    >
      <NodeHeaderIcon icon={icon} />
      <NodeHeaderTitle title={title} type={type} />
    </div>
  );
};

NodeHeader.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  icon: PropTypes.node,
  color: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
};

// Keep default export for backward compatibility
export default NodeHeader;
