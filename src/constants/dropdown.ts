import { DropdownItem } from '@/src/components/Dropdown';

export const CATEGORY_OPTIONS: DropdownItem[] = [
  { label: 'Now Playing', value: 'nowPlaying' },
  { label: 'Upcoming', value: 'upcoming' },
  { label: 'Popular', value: 'popular' },
];

export const SORT_BY_OPTIONS: DropdownItem[] = [
  { label: 'Alphabetical', value: 'alphabetical' },
  { label: 'Rating', value: 'rating' },
  { label: 'Release Date', value: 'releaseDate' },
];
