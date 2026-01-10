import { TMDB_ACCESS_TOKEN as ENV_TOKEN } from '@env';

// TMDB API Configuration
export const TMDB_API_BASE_URL = 'https://api.themoviedb.org/3';
export const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

// Read token from environment variables (.env file)
export const TMDB_ACCESS_TOKEN = ENV_TOKEN;

// Image sizes
export const IMAGE_SIZES = {
  poster: {
    small: 'w185',
    medium: 'w342',
    large: 'w500',
    original: 'original',
  },
  backdrop: {
    small: 'w300',
    medium: 'w780',
    large: 'w1280',
    original: 'original',
  },
  profile: {
    small: 'w45',
    medium: 'w185',
    large: 'h632',
    original: 'original',
  },
};

// Helper function to get image URL
export const getImageUrl = (path: string | null, size: string = 'w500'): string => {
  if (!path) return '';
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
};
