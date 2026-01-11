import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie } from '@/src/services/tmdb.service';

interface WatchlistState {
  movies: Movie[];
}

const initialState: WatchlistState = {
  movies: [],
};

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState,
  reducers: {
    addToWatchlist: (state, action: PayloadAction<Movie>) => {
      const exists = state.movies.find(movie => movie.id === action.payload.id);
      if (!exists) {
        state.movies.push(action.payload);
      }
    },
    removeFromWatchlist: (state, action: PayloadAction<number>) => {
      state.movies = state.movies.filter(movie => movie.id !== action.payload);
    },
    clearWatchlist: (state) => {
      state.movies = [];
    },
  },
});

export const { addToWatchlist, removeFromWatchlist, clearWatchlist } = watchlistSlice.actions;
export default watchlistSlice.reducer;
