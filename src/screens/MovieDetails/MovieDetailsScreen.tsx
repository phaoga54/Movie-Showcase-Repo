import { RootStackParamList } from '@/src/navigation/RootNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'MovieDetails'>;

export default function MovieDetailsScreen({ route }: Props) {
  const { movieId } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Movie Details Screen</Text>
      <Text style={styles.subText}>Movie ID: {movieId}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subText: {
    fontSize: 14,
    marginTop: 8,
    color: '#666',
  },
});
