import Logo from '@/src/assets/svg/Logo.svg';
import Dropdown from '@/src/components/Dropdown';
import { MovieListComponent } from '@/src/components/MovieListComponent';
import SearchInput from '@/src/components/SearchInput';
import { CATEGORY_OPTIONS, SORT_BY_OPTIONS } from '@/src/constants/dropdown';
import { RootStackParamList } from '@/src/navigation/RootNavigator';
import { Movie } from '@/src/services/tmdb.service';
import { useAppDispatch, useAppSelector } from '@/src/store';
import { fetchNowPlaying, fetchPopular, fetchUpcoming, searchMovies } from '@/src/store/slices/moviesSlice';
import { CategoryType, setCategory, setSortBy, SortByType } from '@/src/store/slices/preferencesSlice';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function HomeScreen() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp>();
  const selectedCategory = useAppSelector(state => state.preferences.selectedCategory);
  const selectedSortBy = useAppSelector(state => state.preferences.sortBy);

  // Local state for search
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSearchQuery, setCurrentSearchQuery] = useState(''); // Track what we're currently showing

  // Get data from Redux store
  const { movies: rawMovies, isLoading, isLoadingMore, hasMorePages, currentPage, error } = useAppSelector(state => state.movies);

  // Helper function to sort movies locally
  const sortMovies = (moviesToSort: Movie[]) => {
    const sorted = [...moviesToSort];

    switch (selectedSortBy) {
      case 'alphabetical':
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      case 'rating':
        return sorted.sort((a, b) => b.vote_average - a.vote_average);
      case 'releaseDate':
        return sorted.sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime());
      default:
        return sorted;
    }
  };

  // Apply sorting to movies
  const movies = useMemo(() => sortMovies(rawMovies), [rawMovies, selectedSortBy]);

  const handleCategoryChange = (value: string) => {
    dispatch(setCategory(value as CategoryType));
  };

  const handleSortByChange = (value: string) => {
    dispatch(setSortBy(value as SortByType));
  };

  const handleMoviePress = (id: number) => {
    navigation.navigate('MovieDetails', { movieId: id });
  };

  const handleSearch = () => {
    // If search query exists, use search API
    if (searchQuery.trim()) {
      setCurrentSearchQuery(searchQuery.trim());
      dispatch(searchMovies({ query: searchQuery.trim(), page: 1 }));
    } else {
      // Otherwise, fetch based on selected category
      setCurrentSearchQuery('');
      switch (selectedCategory) {
        case 'nowPlaying':
          dispatch(fetchNowPlaying(1));
          break;
        case 'upcoming':
          dispatch(fetchUpcoming(1));
          break;
        case 'popular':
          dispatch(fetchPopular(1));
          break;
      }
    }
  };

  const handleLoadMore = () => {
    if (isLoadingMore || !hasMorePages) return;

    const nextPage = currentPage + 1;

    // If we have a search query, load more search results
    if (currentSearchQuery) {
      dispatch(searchMovies({ query: currentSearchQuery, page: nextPage }));
    } else {
      // Otherwise, load more from the current category
      switch (selectedCategory) {
        case 'nowPlaying':
          dispatch(fetchNowPlaying(nextPage));
          break;
        case 'upcoming':
          dispatch(fetchUpcoming(nextPage));
          break;
        case 'popular':
          dispatch(fetchPopular(nextPage));
          break;
      }
    }
  };

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <View style={styles.logoContainer}>
        <Logo width={81} height={58} />
      </View>

      <View style={styles.dropdownContainer}>
        <Dropdown
          data={CATEGORY_OPTIONS}
          value={selectedCategory}
          onChange={handleCategoryChange}
          placeholder="Select category"
        />

        <Dropdown
          data={SORT_BY_OPTIONS}
          value={selectedSortBy}
          onChange={handleSortByChange}
          placeholder="Sort by"
        />

        <SearchInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSearch={handleSearch}
          placeholder="Search..."
        />
      </View>
    </View>
  );

  useEffect(()=>{
    handleSearch()
  },[])
  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      <MovieListComponent
        data={movies}
        isLoading={isLoading}
        isLoadingMore={isLoadingMore}
        hasMorePages={hasMorePages}
        error={error}
        onMoviePress={handleMoviePress}
        onEndReached={handleLoadMore}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  logoContainer: {
    marginBottom: 24,
    alignSelf:"center"
  },
  dropdownContainer: {
    marginBottom: 16,
  },
});
