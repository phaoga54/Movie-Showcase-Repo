import Logo from '@/src/assets/svg/Logo.svg';
import Dropdown from '@/src/components/Dropdown';
import { MovieListComponent } from '@/src/components/MovieListComponent';
import { getImageUrl, IMAGE_SIZES } from '@/src/config/api.config';
import { SORT_BY_OPTIONS } from '@/src/constants/dropdown';
import { useWatchlistSort, WatchlistSortBy } from '@/src/hooks/useWatchlistSort';
import { RootStackParamList } from '@/src/navigation/RootNavigator';
import tmdbService, { AccountDetails } from '@/src/services/tmdb.service';
import { useAppDispatch, useAppSelector } from '@/src/store';
import { removeFromWatchlist } from '@/src/store/slices/watchlistSlice';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function WatchlistScreen() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp>();
  const [accountDetails, setAccountDetails] = useState<AccountDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get watchlist from Redux
  const watchlistMovies = useAppSelector(state => state.watchlist.movies);

  // Use watchlist sort hook
  const { sortedMovies, sortBy, setSortBy, sortOrder, toggleSortOrder } = useWatchlistSort(watchlistMovies);

  useEffect(() => {
    fetchAccountDetails();
  }, []);

  const fetchAccountDetails = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const details = await tmdbService.getAccountDetails();
      setAccountDetails(details);
    } catch (err) {
      setError('Failed to load account details');
      console.error('Error fetching account details:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const getAvatarUrl = () => {
    if (accountDetails?.avatar?.tmdb?.avatar_path) {
      return getImageUrl(accountDetails.avatar.tmdb.avatar_path, IMAGE_SIZES.profile.medium);
    }
    if (accountDetails?.avatar?.gravatar?.hash) {
      return `https://www.gravatar.com/avatar/${accountDetails.avatar.gravatar.hash}?s=185`;
    }
    return null;
  };

  const getInitials = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  const getMemberSince = () => {
    return 'January 2026';
  };

  const handleSortByChange = (value: string) => {
    setSortBy(value as WatchlistSortBy);
  };

  const handleMoviePress = (id: number) => {
    navigation.navigate('MovieDetails', { movieId: id });
  };

  const handleDeleteMovie = (id: number) => {
    dispatch(removeFromWatchlist(id));
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.logoContainer}>
          <Logo width={81} height={58} />
        </View>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#00B4E4" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error || !accountDetails) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.logoContainer}>
          <Logo width={81} height={58} />
        </View>
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>{error || 'Failed to load account'}</Text>
        </View>
      </SafeAreaView>
    );
  }

  const avatarUrl = getAvatarUrl();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.logoContainer}>
        <Logo width={81} height={58} />
      </View>

      {/* User Info Header */}
      <View style={styles.userHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>

        <View style={[styles.avatarContainer,{flexDirection:'row'}]}>
          {avatarUrl ? (
            <Image source={{ uri: avatarUrl }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarInitials}>{getInitials(accountDetails.username)}</Text>
            </View>
          )}

        <View style={[styles.userInfo,{marginLeft:25}]}>
          <Text style={styles.userName}>{accountDetails.username}</Text>
          <Text style={styles.memberSince}>Member since {getMemberSince()}</Text>
        </View>
        </View>

      </View>

      {/* My Watchlist Section */}
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>My Watchlist</Text>

        {/* Filter and Sort Controls */}
        {watchlistMovies.length > 0 && (
          <View style={styles.filterContainer}>
            <Text style={styles.filterLabel}>Sort by:</Text>
            <View style={styles.dropdownWrapper}>
              <Dropdown
                data={SORT_BY_OPTIONS}
                value={sortBy}
                onChange={handleSortByChange}
                placeholder="Rating"
              />
            </View>
            <Text style={styles.orderLabel}>Order:</Text>
            <TouchableOpacity onPress={toggleSortOrder} style={styles.orderButton}>
              <Ionicons
                name={sortOrder === 'asc' ? 'arrow-up' : 'arrow-down'}
                size={24}
                color="#000"
              />
            </TouchableOpacity>
          </View>
        )}

        {/* Movie List */}
        <MovieListComponent
          data={sortedMovies}
          isLoading={false}
          isLoadingMore={false}
          hasMorePages={false}
          error={null}
          onMoviePress={handleMoviePress}
          onEndReached={() => {}}
          onDelete={handleDeleteMovie}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  logoContainer: {
    marginBottom: 24,
    alignSelf: 'center',
  },
  userHeader: {
    backgroundColor: '#042541',
    paddingTop: 16,
    paddingBottom: 32,
    paddingHorizontal: 16,
  },
  backButton: {
    marginBottom: 16,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 65,
    height: 65,
    borderRadius: 50,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#9C27B0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInitials: {
    fontSize: 48,
    fontFamily: 'SourceSansPro-Bold',
    color: 'white',
  },
  userInfo: {
  },
  userName: {
    fontSize: 28,
    fontFamily: 'SourceSansPro-Bold',
    color: 'white',
    marginBottom: 4,
  },
  memberSince: {
    fontSize: 16,
    fontFamily: 'SourceSansPro-Regular',
    color: '#FFFFFF99',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontFamily: 'SourceSansPro-Bold',
    color: '#000',
    marginBottom: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    paddingVertical: 8,
  },
  filterLabel: {
    fontSize: 16,
    fontFamily: 'SourceSansPro-Regular',
    color: '#999',
    marginRight: 12,
  },
  dropdownWrapper: {
    flex: 1,
    marginRight: 16,
  },
  orderLabel: {
    fontSize: 16,
    fontFamily: 'SourceSansPro-Regular',
    color: '#999',
    marginRight: 12,
  },
  orderButton: {
    padding: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    fontFamily: 'SourceSansPro-Regular',
    color: '#999',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    fontFamily: 'SourceSansPro-Regular',
    color: '#CCC',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    fontFamily: 'SourceSansPro-Regular',
    color: '#666',
  },
  errorText: {
    fontSize: 16,
    fontFamily: 'SourceSansPro-Regular',
    color: '#C00',
  },
});
