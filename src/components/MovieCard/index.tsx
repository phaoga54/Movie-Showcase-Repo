import React from 'react';
import { MovieCardUI } from './MovieCardUI';
import { MovieCardProps } from './types';

export const MovieCard: React.FC<MovieCardProps> = (props) => {
  return <MovieCardUI {...props} />;
};

export { useMovieCard } from './useMovieCard';
export type { MovieCardProps } from './types';

export default MovieCard;
