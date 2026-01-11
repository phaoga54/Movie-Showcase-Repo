import { useState, useCallback } from 'react';
import tmdbService, { MovieDetails, Credits, Movie } from '@/src/services/tmdb.service';

export const useMovieDetails = () => {
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [credits, setCredits] = useState<Credits | null>(null);
  const [recommendations, setRecommendations] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMovieDetails = useCallback(async (movieId: number) => {
    try {
      setIsLoading(true);
      setError(null);

      const details = await tmdbService.getMovieDetails(movieId);
      setMovieDetails(details);

      return details;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch movie details';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchMovieCredits = useCallback(async (movieId: number) => {
    try {
      setIsLoading(true);
      setError(null);

      const creditsData = await tmdbService.getMovieCredits(movieId);
      setCredits(creditsData);

      return creditsData;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch movie credits';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchMovieRecommendations = useCallback(async (movieId: number, page: number = 1) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await tmdbService.getMovieRecommendations(movieId, page);
      setRecommendations(response.results);

      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch recommendations';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchAllMovieData = useCallback(
    async (movieId: number) => {
      try {
        setIsLoading(true);
        setError(null);

        const [details, creditsData, recommendationsData] = await Promise.all([
          tmdbService.getMovieDetails(movieId),
          tmdbService.getMovieCredits(movieId),
          tmdbService.getMovieRecommendations(movieId),
        ]);

        setMovieDetails(details);
        setCredits(creditsData);
        setRecommendations(recommendationsData.results);

        return { details, credits: creditsData, recommendations: recommendationsData.results };
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch movie data';
        setError(errorMessage);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return {
    movieDetails,
    credits,
    recommendations,
    isLoading,
    error,
    fetchMovieDetails,
    fetchMovieCredits,
    fetchMovieRecommendations,
    fetchAllMovieData,
  };
};
