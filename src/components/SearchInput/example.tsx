import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import SearchInput from './index';

/**
 * Example usage of the SearchInput component
 */
export const SearchInputExample = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
    // Add your search logic here
    // For example:
    // - Call an API with the search query
    // - Filter local data
    // - Navigate to search results screen
  };

  return (
    <View style={styles.container}>
      <SearchInput
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSearch={handleSearch}
        placeholder="Search movies..."
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});
