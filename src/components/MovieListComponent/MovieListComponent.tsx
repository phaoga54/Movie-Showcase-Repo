import React from 'react';
import { FlatList, StyleSheet, View, ActivityIndicator, Text, ListRenderItem } from 'react-native';
import MovieCard from '@/src/components/MovieCard';
import { Movie } from '@/src/services/tmdb.service';

interface MovieListComponentProps {
  data: Movie[];
  isLoading: boolean;
  isLoadingMore: boolean;
  hasMorePages: boolean;
  error: string | null;
  onMoviePress: (id: number) => void;
  onEndReached: () => void;
  onDelete?: (id: number) => void;
}

export const MovieListComponent: React.FC<MovieListComponentProps> = ({
  data,
  isLoading,
  isLoadingMore,
  hasMorePages,
  error,
  onMoviePress,
  onEndReached,
  onDelete,
}) => {
  const renderItem: ListRenderItem<Movie> = ({ item }) => (
    <MovieCard
      id={item.id}
      title={item.title}
      posterPath={item.poster_path}
      releaseDate={item.release_date}
      overview={item.overview}
      onPress={onMoviePress}
      onDelete={onDelete}
    />
  );

  const renderEmptyComponent = () => {
    if (error) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      );
    }

    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No movies found</Text>
      </View>
    );
  };

  const renderFooter = () => {
    if (!isLoadingMore) return null;

    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color="#4DB5E0" />
        <Text style={styles.footerText}>Loading more...</Text>
      </View>
    );
  };

  if (isLoading && data.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#4DB5E0" />
        <Text style={styles.loadingText}>Loading movies...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.listContent}
      ListEmptyComponent={renderEmptyComponent}
      ListFooterComponent={renderFooter}
      onEndReached={hasMorePages ? onEndReached : undefined}
      onEndReachedThreshold={0.5}
      showsVerticalScrollIndicator={true}
    />
  );
};

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    fontFamily: 'SourceSansPro-Regular',
    color: '#666666',
  },
  errorContainer: {
    padding: 16,
    backgroundColor: '#FEE',
    borderRadius: 8,
    margin: 16,
  },
  errorText: {
    fontSize: 14,
    fontFamily: 'SourceSansPro-Regular',
    color: '#C00',
    textAlign: 'center',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    fontFamily: 'SourceSansPro-Regular',
    color: '#999999',
  },
  footerLoader: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  footerText: {
    marginTop: 8,
    fontSize: 14,
    fontFamily: 'SourceSansPro-Regular',
    color: '#666666',
  },
});

export default MovieListComponent;
