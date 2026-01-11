import Logo from '@/src/assets/svg/Logo.svg';
import { getImageUrl, IMAGE_SIZES } from '@/src/config/api.config';
import { useMovieDetails } from '@/src/hooks/useMovieDetails';
import { RootStackParamList } from '@/src/navigation/RootNavigator';
import { Movie } from '@/src/services/tmdb.service';
import { useAppDispatch, useAppSelector } from '@/src/store';
import { addToWatchlist, removeFromWatchlist } from '@/src/store/slices/watchlistSlice';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useMemo } from 'react';
import { ActivityIndicator, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PieChart } from "react-native-gifted-charts";
import { SafeAreaView } from 'react-native-safe-area-context';
import { CastCard } from './CastCard';

type Props = NativeStackScreenProps<RootStackParamList, 'MovieDetails'>;

export default function MovieDetailsScreen({ route, navigation }: Props) {
  const { movieId } = route.params;
  const dispatch = useAppDispatch();
  const { movieDetails, credits, isLoading, error, fetchAllMovieData } = useMovieDetails();
  const watchlistMovies = useAppSelector(state => state.watchlist.movies);

  // Check if current movie is in watchlist
  const isInWatchlist = useMemo(() => {
    return watchlistMovies.some(movie => movie.id === movieId);
  }, [watchlistMovies, movieId]);

  useEffect(() => {
    fetchAllMovieData(movieId);
  }, [movieId, fetchAllMovieData]);

  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatReleaseDate = (date: string) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const getYear = (date: string) => {
    return new Date(date).getFullYear();
  };

  const getCertification = () => {
    if (!movieDetails?.release_dates?.results) return '';
    const usRelease = movieDetails.release_dates.results.find(
      (r: any) => r.iso_3166_1 === 'US'
    );
    return usRelease?.release_dates?.[0]?.certification || '';
  };

  const getLanguageName = (code: string) => {
    const languages: { [key: string]: string } = {
      'en': 'English',
      'es': 'Spanish',
      'fr': 'French',
      'de': 'German',
      'it': 'Italian',
      'ja': 'Japanese',
      'ko': 'Korean',
      'zh': 'Chinese',
    };
    return languages[code] || code.toUpperCase();
  };

  const getCrewByJob = (job: string) => {
    if (!credits?.crew) return [];
    return credits.crew.filter((member) => member.job === job);
  };

  const formatCrewMembers = (members: any[]) => {
    return members.map((member) => ({
      name: member.name,
      jobs: credits?.crew
        .filter((c) => c.name === member.name)
        .map((c) => c.job)
        .filter((job, index, self) => self.indexOf(job) === index),
    }));
  };

  const renderCrew = () => {
    if (!credits?.crew) return null;

    const directors = getCrewByJob('Director').slice(0, 1);
    const producers = getCrewByJob('Writer').slice(0, 1);

    return (
      <View style={styles.crewSection}>
        {directors.map((director, index) => {
          const crewInfo = formatCrewMembers([director])[0];
          return (
            <View key={`director-${index}`} style={styles.crewMember}>
              <Text style={styles.crewName}>{director.name}</Text>
              <Text style={styles.crewJob}>
                {crewInfo?.jobs?.join(', ') || 'Director'}
              </Text>
            </View>
          );
        })}
        {producers.map((producer, index) => (
          <View key={`producer-${index}`} style={styles.crewMember}>
            <Text style={styles.crewName}>{producer.name}</Text>
            <Text style={styles.crewJob}>Writer</Text>
          </View>
        ))}
      </View>
    );
  };

  const handleToggleWatchlist = () => {
    if (!movieDetails) return;

    if (isInWatchlist) {
      dispatch(removeFromWatchlist(movieId));
    } else {
      // Convert MovieDetails to Movie format for watchlist
      const movieToAdd: Movie = {
        id: movieDetails.id,
        title: movieDetails.title,
        poster_path: movieDetails.poster_path,
        backdrop_path: movieDetails.backdrop_path,
        release_date: movieDetails.release_date,
        overview: movieDetails.overview,
        vote_average: movieDetails.vote_average,
        vote_count: movieDetails.vote_count,
        adult: movieDetails.adult,
        genre_ids: movieDetails.genres?.map(g => g.id) || [],
        original_language: movieDetails.original_language,
        original_title: movieDetails.original_title,
        popularity: movieDetails.popularity,
        video: movieDetails.video,
      };
      dispatch(addToWatchlist(movieToAdd));
    }
  };

  if (isLoading && !movieDetails) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#00B4E4" />
        <Text style={styles.loadingText}>Loading movie details...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!movieDetails) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Movie not found</Text>
      </View>
    );
  }

  const posterUrl = getImageUrl(movieDetails.poster_path, IMAGE_SIZES.poster.large);

  const userScore = Math.round(movieDetails.vote_average * 10);
  const pieData = [
    { value: userScore, color: '#45FF8F' },
    { value: 100 - userScore, color: '#D0D2D366' },
  ];

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.logoContainer}>
        <Logo width={81} height={58} />
      </View>
      {/* Fixed Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons
            name='chevron-back'
            size={24}
            color={'white'}
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle} numberOfLines={1}>
          {movieDetails.title} <Text style={styles.subHeaderTitle}>({getYear(movieDetails.release_date)})</Text>
        </Text>

        <View style={styles.backButton} />
      </View>

      {/* Scrollable Content */}
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.contentContainer}>
          {/* Poster and Info Section */}
          <View style={styles.topSection}>
            <View style={styles.posterContainer}>
              {posterUrl ? (
                <Image source={{ uri: posterUrl }} style={styles.poster} />
              ) : (
                <View style={[styles.poster, styles.posterPlaceholder]}>
                  <Text style={styles.posterPlaceholderText}>No Image</Text>
                </View>
              )}
            </View>

            <View style={styles.infoSection}>
              {getCertification() && (
                <View style={styles.certificationBadge}>
                  <Text style={styles.certificationText}>{getCertification()}</Text>
                </View>
              )}
              <Text style={styles.releaseDateText}>
                {formatReleaseDate(movieDetails.release_date)} (SG) • {formatRuntime(movieDetails.runtime || 0)}
              </Text>
              <Text style={styles.genresText}>
                {movieDetails.genres?.map((g: any) => g.name).join(', ')}
              </Text>
              <Text style={styles.statusText}><Text style={styles.languageTextTitle}>Status: </Text>{movieDetails.status}</Text>
              <Text style={styles.languageText}>
                <Text style={styles.languageTextTitle}>Original Language: </Text>{getLanguageName(movieDetails.original_language)}
              </Text>
            </View>
          </View>

          {/* User Score Section */}
          <View style={styles.scoreSection}>
            <View style={styles.scoreCircleContainer}>
              <View style={styles.pieChartWrapper}>
                <PieChart
                  data={pieData}
                  donut
                  radius={30}
                  innerRadius={27}
                  innerCircleColor='#042541'
                  centerLabelComponent={() => {
                    return (
                      <View style={styles.scorePercentageContainer}>
                        <Text style={styles.scorePercentage}>{userScore}</Text>
                        <Text style={styles.scorePercentageMark}>%</Text>
                      </View>
                    )
                  }}
                />
              </View>
              <Text style={styles.scoreLabel}>User Score</Text>
            </View>
            {/* Crew Information */}
            <View style={styles.crewContainer}>
              {renderCrew()}
            </View>
          </View>
          {/* Tagline */}
          {movieDetails.tagline && (
            <Text style={styles.tagline}>{movieDetails.tagline}</Text>
          )}

          {/* Overview */}
          <View style={styles.overviewSection}>
            <Text style={styles.overviewTitle}>Overview</Text>
            <Text style={styles.overviewText}>{movieDetails.overview}</Text>
          </View>


          {/* Add to Watchlist Button */}
          <TouchableOpacity style={styles.watchlistButton} onPress={handleToggleWatchlist}>
            <Ionicons
              name="bookmark"
              size={20}
              color={isInWatchlist ? "red" : "white"}
              style={styles.watchlistIcon}
            />
            <Text style={styles.watchlistText}>
              {isInWatchlist ? "Remove from Watchlist" : "Add To Watchlist"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Top Billed Cast */}
        {credits?.cast && credits.cast.length > 0 && (
          <View style={styles.castSection}>
            <Text style={styles.castTitle}>Top Billed Cast</Text>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={credits.cast.sort((a, b) => a.order - b.order).slice(0, 10)}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <CastCard
                  name={item.name}
                  character={item.character}
                  profilePath={item.profile_path}
                />
              )}
              contentContainerStyle={styles.castScrollContent}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    marginBottom: 24,
    alignSelf: "center",
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: "#0099c2",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    marginRight: 12,
  },
  backIcon: {
    fontSize: 40,
    color: 'white',
    fontWeight: 'bold',
  },
  subHeaderTitle: {
    fontSize: 20,
    fontFamily: 'SourceSansPro-Regular',
    color: 'white',
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'SourceSansPro-Bold',
    color: 'white',
    maxWidth:250
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    backgroundColor: '#00B4E4',
  },
  topSection: {
    flexDirection: 'row',
    backgroundColor: "#0099c2",
    padding: 16,
    gap: 16,
  },
  posterContainer: {
    alignItems: 'center',
  },
  poster: {
    width: 112,
    height: 150,
    borderRadius: 8,
    backgroundColor: '#0099c2',
  },
  posterPlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  posterPlaceholderText: {
    color: 'white',
    fontFamily: 'SourceSansPro-Regular',
  },
  voteStats: {
    marginTop: 8,
    fontSize: 16,
    fontFamily: 'SourceSansPro-Bold',
    color: 'white',
  },
  infoSection: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  certificationBadge: {
    borderWidth: 1,
    borderColor: '#FFFFFFB2',
    borderRadius: 3,
    paddingHorizontal: 8,
    paddingVertical: 2,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  certificationText: {
    fontSize: 16,
    fontFamily: 'SourceSansPro-Regular',
    color: '#FFFFFFB2',
  },
  releaseDateText: {
    fontSize: 16,
    fontFamily: 'SourceSansPro-Regular',
    color: 'white',
    marginBottom: 8,
  },
  genresText: {
    fontSize: 16,
    fontFamily: 'SourceSansPro-Regular',
    color: 'white',
    marginBottom: 8,
  },
  statusText: {
    fontSize: 16,
    fontFamily: 'SourceSansPro-Regular',
    color: 'white',
    marginBottom: 8,
  },
  languageText: {
    fontSize: 16,
    fontFamily: 'SourceSansPro-Regular',
    color: 'white',
  },
  languageTextTitle: {
    fontSize: 16,
    fontFamily: 'SourceSansPro-SemiBold',
    color: 'white',
  },
  scoreSection: {
    padding: 16,
    paddingTop: 16,
    flexDirection: 'row',
  },
  scoreCircleContainer: {
    alignItems: 'flex-start',
    flex: 1
  },
  pieChartWrapper: {
    padding: 4,
    alignSelf: 'flex-start',
    backgroundColor: '#042541',
    borderRadius: 1000
  },
  scorePercentageContainer: {
    flexDirection: 'row',
  },
  scorePercentageMark: {
    fontSize: 10,
    fontFamily: 'SourceSansPro-Bold',
    color: 'white',
    marginTop: 3
  },
  scorePercentage: {
    fontSize: 18,
    fontFamily: 'SourceSansPro-Bold',
    color: 'white',
  },
  scoreLabel: {
    fontSize: 18,
    fontFamily: 'SourceSansPro-Bold',
    color: 'white',
    marginTop: 8,
  },
  crewContainer: {
    flex: 1,
  },
  crewSection: {
    flex: 1,
  },
  crewMember: {
    marginBottom: 16,
  },
  crewName: {
    fontSize: 18,
    fontFamily: 'SourceSansPro-Bold',
    color: 'white',
    marginBottom: 4,
  },
  crewJob: {
    fontSize: 14,
    fontFamily: 'SourceSansPro-Regular',
    color: 'white',
  },
  tagline: {
    fontSize: 18,
    fontFamily: 'SourceSansPro-Italic',
    color: 'white',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  overviewSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  overviewTitle: {
    fontSize: 24,
    fontFamily: 'SourceSansPro-Bold',
    color: 'white',
    marginBottom: 12,
  },
  overviewText: {
    fontSize: 16,
    fontFamily: 'SourceSansPro-Regular',
    color: 'white',
    lineHeight: 24,
  },
  castSection: {
    marginBottom: 24,
  },
  castTitle: {
    fontSize: 24,
    fontFamily: 'SourceSansPro-Bold',
    color: 'black',
    paddingHorizontal: 16,
    marginVertical: 16,
  },
  castScrollContent: {
    paddingHorizontal: 16,
  },
  watchlistButton: {
    width: 300,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 8,
    paddingVertical: 12,
    marginHorizontal: 16,
    marginBottom: 32,
  },
  watchlistIcon: {
    marginRight: 8,
  },
  watchlistText: {
    fontSize: 18,
    fontFamily: 'SourceSansPro-Bold',
    color: 'white',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00B4E4',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    fontFamily: 'SourceSansPro-Regular',
    color: 'white',
  },
  errorText: {
    fontSize: 16,
    fontFamily: 'SourceSansPro-Regular',
    color: 'white',
    textAlign: 'center',
  },
});