import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export interface DropdownItem {
  label: string;
  value: string;
}

export interface DropdownProps {
  data: DropdownItem[];
  value: string | undefined;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  dropdownStyle?: StyleProp<ViewStyle>;
  placeholderStyle?: StyleProp<TextStyle>;
  selectedTextStyle?: StyleProp<TextStyle>;
  labelStyle?: StyleProp<TextStyle>;
  iconColor?: string;
  maxHeight?: number;
  search?: boolean;
  searchPlaceholder?: string;
}
