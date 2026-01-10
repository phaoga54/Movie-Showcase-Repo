import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown as RNDropdown } from 'react-native-element-dropdown';
import { DropdownItem, DropdownProps } from './types';
import { useDropdown } from './useDropdown';

export const DropdownUI: React.FC<DropdownProps> = ({
  data,
  value,
  onChange,
  placeholder = 'Select item', 
  disabled = false,
  containerStyle,
  dropdownStyle,
  selectedTextStyle, 
  iconColor = '#000000',
  maxHeight = 300,
}) => {
  const { isFocus, handleFocus, handleBlur, handleChange } = useDropdown({
    data,
    value,
    onChange,
  });

  const renderItem = (item: DropdownItem) => {
    const isSelected = item.value === value;
    return (
      <View
        style={[
          styles.itemContainer,
          isSelected && styles.itemContainerSelected,
        ]}
      >
        <Text
          style={[
            styles.itemText,
            isSelected && styles.itemTextSelected,
          ]}
        >
          {item.label}
        </Text>
      </View>
    );
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <RNDropdown
        style={[
          styles.dropdown,
          dropdownStyle,
        ]}
        containerStyle={styles.dropdownContainer}
        selectedTextStyle={[styles.selectedTextStyle, selectedTextStyle]}
        itemContainerStyle={{ backgroundColor: 'white' }}
        data={data}
        activeColor='white'
        maxHeight={maxHeight}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? placeholder : '...'}
        placeholderStyle={styles.selectedTextStyle}
        value={value}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        disable={disabled}
        renderItem={renderItem}
        renderRightIcon={() => (
          <Ionicons
            name={isFocus ? 'chevron-down' : 'chevron-up'}
            size={24}
            color={iconColor}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontFamily: 'SourceSansPro-Semibold',
    color: '#374151',
    marginBottom: 8,
  },
  dropdown: {
    height: 60,
    borderColor: '#E5E5E5',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
  },
  dropdownFocused: {
    borderColor: '#E5E5E5',
    borderWidth: 1,
  },
  dropdownContainer: {
    borderRadius: 5,
    borderColor: '#E3E3E3',
    borderWidth: 1,
    backgroundColor:'white',
    paddingVertical:8
  },
  placeholderStyle: {
    fontSize: 18,
    fontFamily: 'SourceSansPro-Regular',
    color: '#000000',
  },
  selectedTextStyle: {
    fontSize: 16,
    fontFamily: 'SourceSansPro-SemiBold',
    color: '#000000',
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    fontFamily: 'SourceSansPro-Regular',
    borderRadius: 8,
  },
  iconStyle: {
    width: 24,
    height: 24,
  },
  itemContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#F8F8F8',
    marginVertical: 4,
    marginHorizontal:16,
    borderRadius:3
  },
  itemContainerSelected: {
    backgroundColor: '#4DB5E0', 
    
  },
  itemText: {
    fontSize: 14,
    fontFamily: 'SourceSansPro-Regular',
    color: '#000000',
  },
  itemTextSelected: {
    color: '#FFFFFF',
  },
});
