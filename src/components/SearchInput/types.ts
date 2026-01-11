import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onSearch: () => void;
  placeholder?: string;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  buttonTextStyle?: StyleProp<TextStyle>;
  placeholderTextColor?: string;
  disabled?: boolean;
}
