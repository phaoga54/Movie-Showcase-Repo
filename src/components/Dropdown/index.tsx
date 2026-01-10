import React from 'react';
import { DropdownUI } from './DropdownUI';
import { DropdownProps } from './types';

export const Dropdown: React.FC<DropdownProps> = (props) => {
  return <DropdownUI {...props} />;
};

// Export types and hooks for external use
export { useDropdown } from './useDropdown';
export type { DropdownProps, DropdownItem } from './types';

export default Dropdown;
