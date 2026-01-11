# API Services

This directory contains the API client configuration and service modules for interacting with external APIs.

## Files

### `api.ts`
Base axios instance with request/response interceptors for all API calls.

**Features:**
- Automatic Authorization header injection with TMDB access token
- Request/response logging in development mode
- Error handling with status code-specific messages
- 10-second timeout

### `tmdb.service.ts`
Service module for The Movie Database (TMDB) API.

**Available Endpoints:**

#### Movie Lists
- `getNowPlaying(page?: number)` - Get now playing movies
- `getUpcoming(page?: number)` - Get upcoming movies
- `getPopular(page?: number)` - Get popular movies
- `searchMovies(query: string, page?: number)` - Search for movies

#### Movie Details
- `getMovieDetails(movieId: number)` - Get detailed information about a movie
- `getMovieCredits(movieId: number)` - Get cast and crew for a movie
- `getMovieRecommendations(movieId: number, page?: number)` - Get recommended movies

#### Account (Optional)
- `getAccountDetails()` - Get account information (requires authentication)

## Usage

### Basic Example

```typescript
import tmdbService from '@/src/services/tmdb.service';

// Fetch now playing movies
const response = await tmdbService.getNowPlaying(1);
console.log(response.results); // Array of movies

// Get movie details
const movie = await tmdbService.getMovieDetails(346698);
console.log(movie.title); // "Barbie"

// Search for movies
const searchResults = await tmdbService.searchMovies('inception');
console.log(searchResults.results);
```

### Using with Hooks

```typescript
import { useMovies } from '@/src/hooks/useMovies';

function MyComponent() {
  const { nowPlaying, isLoading, fetchMoviesByCategory } = useMovies();

  useEffect(() => {
    fetchMoviesByCategory('nowPlaying');
  }, []);

  if (isLoading) return <Loading />;

  return (
    <FlatList
      data={nowPlaying}
      renderItem={({ item }) => <MovieCard {...item} />}
    />
  );
}
```

## Environment Variables

The API requires a TMDB Access Token to be set in your `.env` file:

```
TMDB_ACCESS_TOKEN=your_api_read_access_token_here
```

**How to get your token:**
1. Sign up at https://www.themoviedb.org/signup
2. Go to Settings > API
3. Generate an API key
4. Copy the **API Read Access Token** (not the API Key)

## Error Handling

All service methods throw errors that can be caught:

```typescript
try {
  const movies = await tmdbService.getNowPlaying();
} catch (error) {
  console.error('Failed to fetch movies:', error.message);
}
```

Common error status codes:
- `401` - Invalid or missing API token
- `404` - Resource not found
- `429` - Rate limit exceeded
- `500` - Server error

## Type Definitions

All response types are exported from `tmdb.service.ts`:

```typescript
import { Movie, MovieDetails, Credits, CastMember, CrewMember } from '@/src/services/tmdb.service';
```

## API Documentation

For complete API documentation, visit:
https://developer.themoviedb.org/reference/intro/getting-started
