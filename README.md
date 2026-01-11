# Movie Database App

A React Native movie database application built with Expo and TheMovieDB API.

## Tech Stack

- **Expo** - Used for fast-paced development
- **React Navigation** - Navigation library
- **Redux Toolkit** - State management
- **Redux Persist** - Persist state to AsyncStorage
- **Axios** - HTTP client with interceptors
- **TypeScript** - Type safety

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory with the following:

```
TMDB_ACCESS_TOKEN=your_api_read_access_token_here
```

**How to get your TMDB API token:**

1. Create an account at [TheMovieDB](https://www.themoviedb.org/signup)
2. Go to Settings > API
3. Generate an API key
4. Copy the **API Read Access Token** (not the API Key)
5. Paste it in your `.env` file

⚠️ **Important:** Never commit your `.env` file to version control. It's already included in `.gitignore`.

**Testing your token:**

Run the app after adding your token. If you see "Invalid or missing API token" errors, verify:
- You copied the **API Read Access Token** (not the regular API Key)
- The token is correctly pasted in `.env` without extra spaces
- You restarted the development server after adding the `.env` file

### 3. Run the App

```bash
npm start
```

Then press:
- `i` for iOS simulator
- `a` for Android emulator
- Scan QR code with Expo Go app on your phone

## Project Structure

```
├── navigation/          # React Navigation setup
├── screens/            # Screen components
├── store/              # Redux store and slices
├── services/           # API services (Axios)
├── config/             # Configuration files
├── assets/svg/         # SVG files
└── App.tsx             # Main app component
```

## Using SVG Files

You can import and use SVG files directly as React components:

```tsx
import StarIcon from '@/assets/svg/example.svg';

// In your component:
<StarIcon width={24} height={24} fill="#FFD700" />
```

## API Integration & Architecture Decisions

### The Challenge: TMDB API Limitations

**Problem 1: No unified endpoint for category + search**
- Category endpoints (`/movie/now_playing`, `/movie/upcoming`, `/movie/popular`) don't accept text search queries
- Search endpoint (`/search/movie`) doesn't support category filtering
- Cannot combine "search for 'Batman' in 'Now Playing' movies" in a single API call

**Problem 2: Inconsistent sorting support**
- Attempted to use TMDB's `sort_by` parameter (e.g., `title.asc`, `vote_average.desc`)
- Category endpoints theoretically support `sort_by` but implementation is unreliable
- Search endpoint doesn't support `sort_by` at all
- Would require different sorting logic for different endpoints

### My Solution

**Two-path approach:**
1. **With search text**: Call `/search/movie?query={text}` (ignores category selection)
2. **Without search text**: Call category endpoint (e.g., `/movie/now_playing`)

**Client-side sorting:**
- Fetch unsorted data from API
- Apply sorting locally based on user's "Sort By" selection:
  - Alphabetical: Sort by title A-Z
  - Rating: Sort by vote_average (highest first)
  - Release Date: Sort by release_date (newest first)

**State management:**
- Single `movies[]` array in Redux (not separate arrays per category)
- Sorting applied via `useMemo` for performance
- Consistent behavior across both search and category browsing

### Tradeoffs

**Pros:**
- Simple, predictable behavior
- Consistent sorting across all API responses
- No dependency on unreliable API parameters

**Cons:**
- Cannot search within a specific category (TMDB limitation)
- Sorting happens client-side (but dataset is small, so performance is fine)

## Features

- Browse movies by category (Now Playing, Upcoming, Popular)
- Search movies
- View movie details
- Add/remove movies to watchlist
- Persistent preferences and watchlist
