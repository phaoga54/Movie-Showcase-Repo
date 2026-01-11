import apiClient from './api';

// API Response types
export interface TMDBResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  adult: boolean;
  genre_ids: number[];
  original_language: string;
  original_title: string;
  popularity: number;
  video: boolean;
}

export interface MovieDetails extends Movie {
  genres?: { id: number; name: string }[];
  runtime?: number;
  status?: string;
  tagline?: string;
  budget?: number;
  revenue?: number;
  homepage?: string;
  imdb_id?: string;
  production_companies?: Array<{ id: number; name: string; logo_path: string | null }>;
  production_countries?: Array<{ iso_3166_1: string; name: string }>;
  spoken_languages?: Array<{ english_name: string; iso_639_1: string; name: string }>;
  release_dates?: {
    results: Array<{
      iso_3166_1: string;
      release_dates: Array<{
        certification: string;
        type: number;
      }>;
    }>;
  };
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
  cast_id: number;
  credit_id: string;
  gender: number;
  known_for_department: string;
}

export interface CrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
  credit_id: string;
  gender: number;
}

export interface Credits {
  id: number;
  cast: CastMember[];
  crew: CrewMember[];
}

export interface AccountDetails {
  id: number;
  username: string;
  include_adult: boolean;
  iso_3166_1: string;
  iso_639_1: string;
  avatar?: {
    gravatar?: {
      hash: string;
    };
    tmdb?: {
      avatar_path: string | null;
    };
  };
}

// Movie API Services
export const tmdbService = {
  // Get Now Playing movies
  getNowPlaying: async (page: number = 1): Promise<TMDBResponse<Movie>> => {
    const response = await apiClient.get<TMDBResponse<Movie>>('/movie/now_playing', {
      params: { page, language: 'en-US' },
    });
    return response.data;
  },

  // Get Upcoming movies
  getUpcoming: async (page: number = 1): Promise<TMDBResponse<Movie>> => {
    const response = await apiClient.get<TMDBResponse<Movie>>('/movie/upcoming', {
      params: { page, language: 'en-US' },
    });
    return response.data;
  },

  // Get Popular movies
  getPopular: async (page: number = 1): Promise<TMDBResponse<Movie>> => {
    const response = await apiClient.get<TMDBResponse<Movie>>('/movie/popular', {
      params: { page, language: 'en-US' },
    });
    return response.data;
  },

  // Search movies
  searchMovies: async (query: string, page: number = 1): Promise<TMDBResponse<Movie>> => {
    const response = await apiClient.get<TMDBResponse<Movie>>('/search/movie', {
      params: { query, page, language: 'en-US' },
    });
    return response.data;
  },

  // Get movie details
  getMovieDetails: async (movieId: number): Promise<MovieDetails> => {
    const response = await apiClient.get<MovieDetails>(`/movie/${movieId}`, {
      params: {
        language: 'en-US',
        append_to_response: 'release_dates',
      },
    });
    return response.data;
  },

  // Get movie credits (cast and crew)
  getMovieCredits: async (movieId: number): Promise<Credits> => {
    const response = await apiClient.get<Credits>(`/movie/${movieId}/credits`, {
      params: { language: 'en-US' },
    });
    return response.data;
  },

  // Get movie recommendations
  getMovieRecommendations: async (movieId: number, page: number = 1): Promise<TMDBResponse<Movie>> => {
    const response = await apiClient.get<TMDBResponse<Movie>>(`/movie/${movieId}/recommendations`, {
      params: { page, language: 'en-US' },
    });
    return response.data;
  },

  // Get account details (requires session/authentication)
  getAccountDetails: async (accountId: number = 22641732): Promise<AccountDetails> => {
    const response = await apiClient.get<AccountDetails>(`/account/${accountId}`);
    return response.data;
  },
};

export default tmdbService;
