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

## Features

- Browse movies by category (Now Playing, Upcoming, Popular)
- Search movies
- View movie details
- Add/remove movies to watchlist
- Persistent preferences and watchlist
