# MovieCard Component

A reusable movie card component that displays movie information in a horizontal card layout.

## Features

- Displays movie poster, title, release date, and overview
- Handles missing poster images with placeholder
- Formatted date display (e.g., "19 July 2023")
- Truncated overview text (2 lines max)
- Touchable with onPress callback
- Clean, minimal design matching Figma specs

## Usage

```tsx
import MovieCard from '@/src/components/MovieCard';

<MovieCard
  id={1}
  title="Barbie"
  posterPath="/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg"
  releaseDate="2023-07-19"
  overview="Barbie and Ken are having the time of their lives in the colorful and..."
  onPress={(id) => navigation.navigate('MovieDetails', { movieId: id })}
/>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `number` | Yes | Movie ID |
| `title` | `string` | Yes | Movie title |
| `posterPath` | `string \| null` | Yes | TMDB poster path (e.g., "/poster.jpg") |
| `releaseDate` | `string` | Yes | Release date in ISO format (YYYY-MM-DD) |
| `overview` | `string` | Yes | Movie overview/description |
| `onPress` | `(id: number) => void` | No | Callback when card is pressed |
| `containerStyle` | `StyleProp<ViewStyle>` | No | Additional container styles |

## File Structure

```
MovieCard/
├── index.tsx           # Main export
├── MovieCardUI.tsx     # UI presentation
├── useMovieCard.ts     # Logic hook
├── types.ts            # TypeScript types
└── README.md           # This file
```

## Design Specs

- **Card**: White background, 8px border radius, subtle shadow
- **Poster**: 100x150px, 8px border radius
- **Title**: 18px, SourceSansPro-Bold, black
- **Date**: 14px, SourceSansPro-Regular, gray (#999)
- **Overview**: 14px, SourceSansPro-Regular, gray (#666), 2 lines max

## Integration with Redux

```tsx
import { useNavigation } from '@react-navigation/native';
import { useAppSelector } from '@/src/store';

const movies = useAppSelector(state => state.movies.nowPlaying);

{movies.map((movie) => (
  <MovieCard
    key={movie.id}
    id={movie.id}
    title={movie.title}
    posterPath={movie.poster_path}
    releaseDate={movie.release_date}
    overview={movie.overview}
    onPress={(id) => navigation.navigate('MovieDetails', { movieId: id })}
  />
))}
```
