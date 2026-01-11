import { getImageUrl, IMAGE_SIZES } from '@/src/config/api.config';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

interface CastCardProps {
  name: string;
  character: string;
  profilePath: string | null;
}

export const CastCard: React.FC<CastCardProps> = ({ name, character, profilePath }) => {
  const imageUrl = getImageUrl(profilePath, IMAGE_SIZES.profile.medium);

  return (
    <View style={styles.castCard}>
      {imageUrl ? (
        <Image
          source={{ uri: imageUrl }}
          style={styles.castImage}
        />
      ) : (
        <View style={[styles.castImage, styles.castImagePlaceholder]}>
          <Ionicons name="person" size={40} color="#999" />
        </View>
      )}
      <View style={styles.castInfo}>
        <Text style={styles.castName} numberOfLines={2}>
          {name}
        </Text>
        <Text style={styles.castCharacter} numberOfLines={2}>
          {character}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  castCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    width: 160,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginRight: 16,
  },
  castImage: {
    width: 160,
    height: 240,
    backgroundColor: '#E0E0E0',
  },
  castImagePlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  castInfo: {
    padding: 12,
  },
  castName: {
    fontSize: 16,
    fontFamily: 'SourceSansPro-Bold',
    color: '#000',
    marginBottom: 4,
  },
  castCharacter: {
    fontSize: 14,
    fontFamily: 'SourceSansPro-Regular',
    color: '#666',
  },
});
