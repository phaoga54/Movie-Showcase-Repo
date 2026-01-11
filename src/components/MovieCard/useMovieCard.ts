import { useCallback } from 'react';

interface UseMovieCardProps {
  id: number;
  onPress?: (id: number) => void;
}

export const useMovieCard = ({ id, onPress }: UseMovieCardProps) => {
  const handlePress = useCallback(() => {
    onPress?.(id);
  }, [id, onPress]);

  const formatDate = (dateString: string): string => {
    if (!dateString) return '';

    try {
      const date = new Date(dateString);
      const day = date.getDate();
      const month = date.toLocaleString('en-US', { month: 'long' });
      const year = date.getFullYear();

      return `${day} ${month} ${year}`;
    } catch (error) {
      return dateString;
    }
  };

  return {
    handlePress,
    formatDate,
  };
};
