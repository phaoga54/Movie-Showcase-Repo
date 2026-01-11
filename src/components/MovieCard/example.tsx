/**
 * Example usage of the MovieCard component
 */

import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import MovieCard from './index';

// Example 1: Single Movie Card
export const SingleMovieCardExample = () => {
  const handlePress = (id: number) => {
    console.log('Movie pressed:', id);
  };

  return (
    <View style={styles.container}>
      <MovieCard
        id={346698}
        title="Barbie"
        posterPath="/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg"
        releaseDate="2023-07-19"
        overview="Barbie and Ken are having the time of their lives in the colorful and seemingly perfect world of Barbie Land."
        onPress={handlePress}
      />
    </View>
  );
};

// Example 2: List of Movie Cards
export const MovieListExample = () => {
  const movies = [
    {
      id: 346698,
      title: 'Barbie',
      poster_path: '/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg',
      release_date: '2023-07-19',
      overview:
        'Barbie and Ken are having the time of their lives in the colorful and seemingly perfect world of Barbie Land.',
    },
    {
      id: 298618,
      title: 'The Flash',
      poster_path: '/rktDFPbfHfUbArZ6OOOKsXcv0Bm.jpg',
      release_date: '2023-06-13',
      overview:
        'When his attempt to save his family inadvertently alters the future, Barry Allen becomes trapped in a reality in which General Zod has returned.',
    },
  ];

  const handlePress = (id: number) => {
    console.log('Navigate to movie:', id);
  };

  return (
    <FlatList
      data={movies}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <MovieCard
          id={item.id}
          title={item.title}
          posterPath={item.poster_path}
          releaseDate={item.release_date}
          overview={item.overview}
          onPress={handlePress}
        />
      )}
      contentContainerStyle={styles.listContainer}
    />
  );
};

// Example 3: Movie Card with No Poster
export const NoPostMovieCardExample = () => {
  return (
    <View style={styles.container}>
      <MovieCard
        id={1}
        title="Movie Without Poster"
        posterPath={null}
        releaseDate="2023-01-01"
        overview="This movie doesn't have a poster image."
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  listContainer: {
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
});
