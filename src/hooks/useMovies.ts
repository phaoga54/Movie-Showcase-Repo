import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/store';
import { setMovies, setSearchResults, setLoading, setError } from '@/src/store/slices/moviesSlice';
import { CategoryType } from '@/src/store/slices/preferencesSlice';
import tmdbService from '@/src/services/tmdb.service';

export const useMovies = () => {
  const dispatch = useAppDispatch();
  const { nowPlaying, upcoming, popular, searchResults, isLoading, error } = useAppSelector(
    (state) => state.movies
  );

  const fetchMoviesByCategory = useCallback(
    async (category: CategoryType, page: number = 1) => {
      try {
        dispatch(setLoading(true));
        dispatch(setError(null));

        let response;
        switch (category) {
          case 'nowPlaying':
            response = await tmdbService.getNowPlaying(page);
            dispatch(setMovies({ category: 'nowPlaying', movies: response.results }));
            break;
          case 'upcoming':
            response = await tmdbService.getUpcoming(page);
            dispatch(setMovies({ category: 'upcoming', movies: response.results }));
            break;
          case 'popular':
            response = await tmdbService.getPopular(page);
            dispatch(setMovies({ category: 'popular', movies: response.results }));
            break;
        }

        return response;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch movies';
        dispatch(setError(errorMessage));
        throw err;
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch]
  );

  const searchMovies = useCallback(
    async (query: string, page: number = 1) => {
      if (!query.trim()) {
        dispatch(setSearchResults([]));
        return;
      }

      try {
        dispatch(setLoading(true));
        dispatch(setError(null));

        const response = await tmdbService.searchMovies(query, page);
        dispatch(setSearchResults(response.results));

        return response;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to search movies';
        dispatch(setError(errorMessage));
        throw err;
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch]
  );

  return {
    nowPlaying,
    upcoming,
    popular,
    searchResults,
    isLoading,
    error,
    fetchMoviesByCategory,
    searchMovies,
  };
};
