import React from 'react';
import { SearchInputUI } from './SearchInputUI';
import { SearchInputProps } from './types';

export const SearchInput: React.FC<SearchInputProps> = (props) => {
  return <SearchInputUI {...props} />;
};

// Export types and hooks for external use
export { useSearchInput } from './useSearchInput';
export type { SearchInputProps } from './types';

export default SearchInput;
