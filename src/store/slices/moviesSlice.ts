import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie } from './watchlistSlice';

interface MoviesState {
  nowPlaying: Movie[];
  upcoming: Movie[];
  popular: Movie[];
  searchResults: Movie[];
  isLoading: boolean;
  error: string | null;
}

const initialState: MoviesState = {
  nowPlaying: [],
  upcoming: [],
  popular: [],
  searchResults: [],
  isLoading: false,
  error: null,
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setMovies: (state, action: PayloadAction<{ category: 'nowPlaying' | 'upcoming' | 'popular'; movies: Movie[] }>) => {
      state[action.payload.category] = action.payload.movies;
    },
    setSearchResults: (state, action: PayloadAction<Movie[]>) => {
      state.searchResults = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
  },
});

export const { setMovies, setSearchResults, setLoading, setError, clearSearchResults } = moviesSlice.actions;
export default moviesSlice.reducer;
