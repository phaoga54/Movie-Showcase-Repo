/**
 * Example usage of the Dropdown component
 * This file demonstrates how to use the Dropdown component in your app
 */

import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Dropdown, { DropdownItem } from './index';

// Example 1: Category Dropdown
export const CategoryDropdownExample = () => {
  const [category, setCategory] = useState<string | null>('nowPlaying');

  const categoryData: DropdownItem[] = [
    { label: 'Now Playing', value: 'nowPlaying' },
    { label: 'Upcoming', value: 'upcoming' },
    { label: 'Popular', value: 'popular' },
  ];

  return (
    <View style={styles.container}>
      <Dropdown
        data={categoryData}
        value={category}
        onChange={setCategory}
        label="Category"
        placeholder="Select a category"
      />
    </View>
  );
};

// Example 2: Sort By Dropdown
export const SortByDropdownExample = () => {
  const [sortBy, setSortBy] = useState<string | null>('alphabetical');

  const sortByData: DropdownItem[] = [
    { label: 'Alphabetical', value: 'alphabetical' },
    { label: 'Rating', value: 'rating' },
    { label: 'Release Date', value: 'releaseDate' },
  ];

  return (
    <View style={styles.container}>
      <Dropdown
        data={sortByData}
        value={sortBy}
        onChange={setSortBy}
        label="Sort By"
        placeholder="Select sort order"
      />
    </View>
  );
};

// Example 3: Searchable Dropdown
export const SearchableDropdownExample = () => {
  const [country, setCountry] = useState<string | null>(null);

  const countryData: DropdownItem[] = [
    { label: 'United States', value: 'us' },
    { label: 'United Kingdom', value: 'uk' },
    { label: 'Canada', value: 'ca' },
    { label: 'Australia', value: 'au' },
    { label: 'Germany', value: 'de' },
  ];

  return (
    <View style={styles.container}>
      <Dropdown
        data={countryData}
        value={country}
        onChange={setCountry}
        label="Country"
        placeholder="Select a country"
        search
        searchPlaceholder="Search country..."
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});
