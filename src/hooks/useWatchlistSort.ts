import { Movie } from '@/src/services/tmdb.service';
import { useMemo, useState } from 'react';

export type WatchlistSortBy = 'rating' | 'alphabetical' | 'releaseDate';
export type SortOrder = 'asc' | 'desc';

export const useWatchlistSort = (movies: Movie[]) => {
  const [sortBy, setSortBy] = useState<WatchlistSortBy>('rating');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  const sortedMovies = useMemo(() => {
    const sorted = [...movies];

    switch (sortBy) {
      case 'alphabetical':
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'rating':
        sorted.sort((a, b) => b.vote_average - a.vote_average);
        break;
      case 'releaseDate':
        sorted.sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime());
        break;
    }

    // Apply order
    if (sortOrder === 'asc') {
      sorted.reverse();
    }

    return sorted;
  }, [movies, sortBy, sortOrder]);

  return {
    sortedMovies,
    sortBy,
    setSortBy,
    sortOrder,
    toggleSortOrder,
  };
};
