import { useCallback, useState } from 'react';

interface UseSearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onSearch: () => void;
}

export const useSearchInput = ({ value, onChangeText, onSearch }: UseSearchInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  const handleChangeText = useCallback(
    (text: string) => {
      onChangeText(text);
    },
    [onChangeText]
  );

  const handleSearch = useCallback(() => {
    onSearch();
  }, [onSearch]);

  return {
    isFocused,
    handleFocus,
    handleBlur,
    handleChangeText,
    handleSearch,
  };
};
