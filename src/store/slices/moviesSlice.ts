import tmdbService, { Movie } from '@/src/services/tmdb.service';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MoviesState {
  movies: Movie[];
  isLoading: boolean;
  isLoadingMore: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  hasMorePages: boolean;
}

const initialState: MoviesState = {
  movies: [],
  isLoading: false,
  isLoadingMore: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  hasMorePages: false,
};

// Async thunks
export const fetchNowPlaying = createAsyncThunk(
  'movies/fetchNowPlaying',
  async (page: number = 1) => {
    const response = await tmdbService.getNowPlaying(page);
    return {
      movies: response.results,
      page: response.page,
      totalPages: response.total_pages,
    };
  }
);

export const fetchUpcoming = createAsyncThunk(
  'movies/fetchUpcoming',
  async (page: number = 1) => {
    const response = await tmdbService.getUpcoming(page);
    return {
      movies: response.results,
      page: response.page,
      totalPages: response.total_pages,
    };
  }
);

export const fetchPopular = createAsyncThunk(
  'movies/fetchPopular',
  async (page: number = 1) => {
    const response = await tmdbService.getPopular(page);
    return {
      movies: response.results,
      page: response.page,
      totalPages: response.total_pages,
    };
  }
);

export const searchMovies = createAsyncThunk(
  'movies/searchMovies',
  async ({ query, page = 1 }: { query: string; page?: number }) => {
    const response = await tmdbService.searchMovies(query, page);
    return {
      movies: response.results,
      page: response.page,
      totalPages: response.total_pages,
    };
  }
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setMovies: (state, action: PayloadAction<{ movies: Movie[] }>) => {
      state.movies= action.payload.movies;
    },
    setSearchResults: (state, action: PayloadAction<Movie[]>) => {
      state.movies = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearSearchResults: (state) => {
      state.movies = [];
    },
  },
  extraReducers: (builder) => {
    // Now Playing
    builder
      .addCase(fetchNowPlaying.pending, (state, action) => {
        const page = action.meta.arg;
        if (page === 1) {
          state.isLoading = true;
        } else {
          state.isLoadingMore = true;
        }
        state.error = null;
      })
      .addCase(fetchNowPlaying.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoadingMore = false;
        const { movies, page, totalPages } = action.payload;

        if (page === 1) {
          state.movies = movies;
        } else {
          state.movies = [...state.movies, ...movies];
        }

        state.currentPage = page;
        state.totalPages = totalPages;
        state.hasMorePages = page < totalPages;
      })
      .addCase(fetchNowPlaying.rejected, (state, action) => {
        state.isLoading = false;
        state.isLoadingMore = false;
        state.error = action.error.message || 'Failed to fetch now playing movies';
      });

    // Upcoming
    builder
      .addCase(fetchUpcoming.pending, (state, action) => {
        const page = action.meta.arg;
        if (page === 1) {
          state.isLoading = true;
        } else {
          state.isLoadingMore = true;
        }
        state.error = null;
      })
      .addCase(fetchUpcoming.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoadingMore = false;
        const { movies, page, totalPages } = action.payload;

        if (page === 1) {
          state.movies = movies;
        } else {
          state.movies = [...state.movies, ...movies];
        }

        state.currentPage = page;
        state.totalPages = totalPages;
        state.hasMorePages = page < totalPages;
      })
      .addCase(fetchUpcoming.rejected, (state, action) => {
        state.isLoading = false;
        state.isLoadingMore = false;
        state.error = action.error.message || 'Failed to fetch upcoming movies';
      });

    // Popular
    builder
      .addCase(fetchPopular.pending, (state, action) => {
        const page = action.meta.arg;
        if (page === 1) {
          state.isLoading = true;
        } else {
          state.isLoadingMore = true;
        }
        state.error = null;
      })
      .addCase(fetchPopular.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoadingMore = false;
        const { movies, page, totalPages } = action.payload;

        if (page === 1) {
          state.movies = movies;
        } else {
          state.movies = [...state.movies, ...movies];
        }

        state.currentPage = page;
        state.totalPages = totalPages;
        state.hasMorePages = page < totalPages;
      })
      .addCase(fetchPopular.rejected, (state, action) => {
        state.isLoading = false;
        state.isLoadingMore = false;
        state.error = action.error.message || 'Failed to fetch popular movies';
      });

    // Search
    builder
      .addCase(searchMovies.pending, (state, action) => {
        const page = action.meta.arg.page || 1;
        if (page === 1) {
          state.isLoading = true;
        } else {
          state.isLoadingMore = true;
        }
        state.error = null;
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoadingMore = false;
        const { movies, page, totalPages } = action.payload;

        if (page === 1) {
          state.movies = movies;
        } else {
          state.movies = [...state.movies, ...movies];
        }

        state.currentPage = page;
        state.totalPages = totalPages;
        state.hasMorePages = page < totalPages;
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.isLoading = false;
        state.isLoadingMore = false;
        state.error = action.error.message || 'Failed to search movies';
      });
  },
});

export const { setMovies, setSearchResults, setLoading, setError, clearSearchResults } = moviesSlice.actions;
export default moviesSlice.reducer;
