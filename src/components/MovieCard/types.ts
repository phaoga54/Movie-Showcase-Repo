import { StyleProp, ViewStyle } from 'react-native';

export interface MovieCardProps {
  id: number;
  title: string;
  posterPath: string | null;
  releaseDate: string;
  overview: string;
  onPress?: (id: number) => void;
  containerStyle?: StyleProp<ViewStyle>;
}
