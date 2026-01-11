# SearchInput Component

A reusable search input component with a text input field and search button, matching the design system of the Dropdown component.

## Features

- Text input with placeholder
- Search button with pill-shaped design
- Focus state management
- Customizable styling
- Disabled state support
- Follows the same structure as Dropdown component (UI/Logic separation)

## Usage

```tsx
import SearchInput from '@/src/components/SearchInput';

function MyComponent() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
    // Perform search logic here
  };

  return (
    <SearchInput
      value={searchQuery}
      onChangeText={setSearchQuery}
      onSearch={handleSearch}
      placeholder="Search movies..."
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | Required | Current search text value |
| `onChangeText` | `(text: string) => void` | Required | Called when text changes |
| `onSearch` | `() => void` | Required | Called when search button is pressed |
| `placeholder` | `string` | `'Search...'` | Placeholder text |
| `containerStyle` | `StyleProp<ViewStyle>` | - | Custom container styles |
| `inputStyle` | `StyleProp<ViewStyle>` | - | Custom input field styles |
| `buttonStyle` | `StyleProp<ViewStyle>` | - | Custom button styles |
| `buttonTextStyle` | `StyleProp<TextStyle>` | - | Custom button text styles |
| `placeholderTextColor` | `string` | `'#999999'` | Placeholder text color |
| `disabled` | `boolean` | `false` | Disables input and button |

## Structure

```
SearchInput/
├── index.tsx           # Main export file
├── SearchInputUI.tsx   # UI component
├── useSearchInput.ts   # Custom hook for logic
├── types.ts           # TypeScript types
└── README.md          # Documentation
```

## Styling

The component matches the styling of the Dropdown component:
- Input field: 60px height, rounded corners, white background
- Search button: 60px height, pill-shaped (borderRadius: 30), gray background
- Uses Source Sans Pro font family
- Consistent spacing and colors with the design system
