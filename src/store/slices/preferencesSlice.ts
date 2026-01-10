import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type CategoryType = 'now_playing' | 'upcoming' | 'popular';
export type SortByType = 'alphabetical' | 'rating' | 'release_date';

interface PreferencesState {
  selectedCategory: CategoryType;
  sortBy: SortByType;
}

const initialState: PreferencesState = {
  selectedCategory: 'now_playing',
  sortBy: 'alphabetical',
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
