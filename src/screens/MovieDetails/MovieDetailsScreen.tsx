import { RootStackParamList } from '@/src/navigation/RootNavigator';
import { useMovieDetails } from '@/src/hooks/useMovieDetails';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'MovieDetails'>;

export default function MovieDetailsScreen({ route }: Props) {
  const { movieId } = route.params;
  const { movieDetails, isLoading, error, fetchMovieDetails } = useMovieDetails();

  useEffect(() => {
    fetchMovieDetails(movieId);
  }, [movieId, fetchMovieDetails]);

  if (isLoading && !movieDetails) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#4DB5E0" />
        <Text style={styles.loadingText}>Loading movie details...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!movieDetails) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Movie not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{movieDetails.title}</Text>
      {movieDetails.tagline && (
        <Text style={styles.tagline}>{movieDetails.tagline}</Text>
      )}
      <Text style={styles.overview}>{movieDetails.overview}</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Release Date:</Text>
        <Text style={styles.infoValue}>{movieDetails.release_date}</Text>
      </View>

      {movieDetails.runtime && (
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Runtime:</Text>
          <Text style={styles.infoValue}>{movieDetails.runtime} minutes</Text>
        </View>
      )}

      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Rating:</Text>
        <Text style={styles.infoValue}>{movieDetails.vote_average.toFixed(1)} / 10</Text>
      </View>

      {movieDetails.genres && movieDetails.genres.length > 0 && (
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Genres:</Text>
          <Text style={styles.infoValue}>
            {movieDetails.genres.map(g => g.name).join(', ')}
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    fontFamily: 'SourceSansPro-Regular',
    color: '#666666',
  },
  errorText: {
    fontSize: 16,
    fontFamily: 'SourceSansPro-Regular',
    color: '#C00',
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    fontFamily: 'SourceSansPro-Bold',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    fontFamily: 'SourceSansPro-Italic',
    color: '#666666',
    marginBottom: 16,
  },
  overview: {
    fontSize: 16,
    fontFamily: 'SourceSansPro-Regular',
    lineHeight: 24,
    marginBottom: 24,
  },
  infoContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 16,
    fontFamily: 'SourceSansPro-SemiBold',
    marginRight: 8,
    minWidth: 120,
  },
  infoValue: {
    fontSize: 16,
    fontFamily: 'SourceSansPro-Regular',
    flex: 1,
  },
});
