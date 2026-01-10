import MovieDetailsScreen from '@/src/screens/MovieDetails/MovieDetailsScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import BottomTabNavigator from './BottomTabNavigator';

export type RootStackParamList = {
  MainTabs: undefined;
  MovieDetails: { movieId: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainTabs"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MovieDetails"
        component={MovieDetailsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
