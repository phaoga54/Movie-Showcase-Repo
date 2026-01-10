import { useCallback, useState } from 'react';
import { DropdownItem } from './types';

interface UseDropdownProps {
  data: DropdownItem[];
  value: string | undefined;
  onChange: (value: string) => void;
}

export const useDropdown = ({ data, value, onChange }: UseDropdownProps) => {
  const [isFocus, setIsFocus] = useState(false);

  const handleFocus = useCallback(() => {
    setIsFocus(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsFocus(false);
  }, []);

  const handleChange = useCallback(
    (item: DropdownItem) => {
      onChange(item.value);
      setIsFocus(false);
    },
    [onChange]
  );

  const selectedItem = data.find((item) => item.value === value);

  return {
    isFocus,
    handleFocus,
    handleBlur,
    handleChange,
    selectedItem,
  };
};
