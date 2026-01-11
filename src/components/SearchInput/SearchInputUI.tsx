import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SearchInputProps } from './types';
import { useSearchInput } from './useSearchInput';

export const SearchInputUI: React.FC<SearchInputProps> = ({
  value,
  onChangeText,
  onSearch,
  placeholder = 'Search...',
  containerStyle,
  inputStyle,
  buttonStyle,
  buttonTextStyle,
  placeholderTextColor = '#999999',
  disabled = false,
}) => {
  const { isFocused, handleFocus, handleBlur, handleChangeText, handleSearch } = useSearchInput({
    value,
    onChangeText,
    onSearch,
  });

  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput
        style={[
          styles.input,
          isFocused && styles.inputFocused,
          inputStyle,
        ]}
        value={value}
        onChangeText={handleChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        editable={!disabled}
      />
      <TouchableOpacity
        style={[styles.button, buttonStyle]}
        onPress={handleSearch}
        activeOpacity={0.7}
      >
        <Text style={[styles.buttonText, buttonTextStyle]}>Search</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  input: {
    height: 60,
    borderColor: '#E5E5E5',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'SourceSansPro-Regular',
    color: '#000000',
    marginBottom: 16,
  },
  inputFocused: {
    borderColor: '#E5E5E5',
    borderWidth: 1,
  },
  button: {
    paddingVertical: 16,
    backgroundColor: '#00B4E4',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'SourceSansPro-SemiBold',
    color: 'white',
  },
});
