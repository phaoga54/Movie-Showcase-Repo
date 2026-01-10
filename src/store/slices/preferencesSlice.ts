import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type CategoryType = 'nowPlaying' | 'upcoming' | 'popular';
export type SortByType = 'alphabetical' | 'rating' | 'releaseDate';

interface PreferencesState {
  selectedCategory: CategoryType;
  sortBy?: SortByType;
}

const initialState: PreferencesState = {
  selectedCategory: 'nowPlaying',
};

const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<CategoryType>) => {
      state.selectedCategory = action.payload;
    },
    setSortBy: (state, action: PayloadAction<SortByType>) => {
      state.sortBy = action.payload;
    },
  },
});

export const { setCategory, setSortBy } = preferencesSlice.actions;
export default preferencesSlice.reducer;
