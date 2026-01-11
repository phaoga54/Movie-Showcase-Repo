import { getImageUrl } from '@/src/config/api.config';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MovieCardProps } from './types';
import { useMovieCard } from './useMovieCard';

export const MovieCardUI: React.FC<MovieCardProps> = ({
  id,
  title,
  posterPath,
  releaseDate,
  overview,
  onPress,
  onDelete,
  containerStyle,
}) => {
  const { handlePress, formatDate } = useMovieCard({ id, onPress });

  const imageUrl = posterPath ? getImageUrl(posterPath, 'w342') : '';

  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={styles.posterContainer}>
        {imageUrl ? (
          <Image
            source={{ uri: imageUrl }}
            style={styles.poster}
            resizeMode="cover"
          />
        ) : (
          <View style={[styles.poster, styles.placeholderPoster]}>
            <Text style={styles.placeholderText}>No Image</Text>
          </View>
        )}
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.date}>{formatDate(releaseDate)}</Text>
        <Text style={styles.overview} numberOfLines={2}>
          {overview}
        </Text>
      </View>

      {onDelete && (
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={(e) => {
            e.stopPropagation();
            onDelete(id);
          }}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="close" size={24} color="#666" />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    maxHeight:150
  },
  posterContainer: {
    marginRight: 16,
    overflow: 'hidden',
    borderRadius: 8,
  },
  poster: {
    width: 100,
    height: 150,
  },
  placeholderPoster: {
    backgroundColor: '#E5E5E5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 12,
    fontFamily: 'SourceSansPro-Regular',
    color: '#999999',
  },
  contentContainer: {
    flex: 1, 
    marginRight:15, 
    paddingVertical:16
  },
  title: {
    fontSize: 16,
    fontFamily: 'SourceSansPro-SemiBold',
    color: '#000000',
  },
  date: {
    fontSize: 14,
    fontFamily: 'SourceSansPro-Regular',
    color: '#999999',
    marginBottom: 8,
  },
  overview: {
    fontSize: 14,
    fontFamily: 'SourceSansPro-Regular',
    color: '#000000',
    lineHeight: 20,
    marginTop:14
  },
  deleteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    padding: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
  },
});
