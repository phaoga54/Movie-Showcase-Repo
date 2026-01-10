# Dropdown Component

A reusable, self-contained dropdown component built with `react-native-element-dropdown`.

## Installation

This component requires the following dependency:

```bash
npm install react-native-element-dropdown@2.12.4
```

## Usage

```tsx
import Dropdown, { DropdownItem } from './components/Dropdown';

const data: DropdownItem[] = [
  { label: 'Now Playing', value: 'nowPlaying' },
  { label: 'Upcoming', value: 'upcoming' },
  { label: 'Popular', value: 'popular' },
];

function MyComponent() {
  const [value, setValue] = useState<string | null>(null);

  return (
    <Dropdown
      data={data}
      value={value}
      onChange={setValue}
      placeholder="Select category"
      label="Category"
    />
  );
}
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `data` | `DropdownItem[]` | Yes | - | Array of items to display |
| `value` | `string \| null` | Yes | - | Currently selected value |
| `onChange` | `(value: string) => void` | Yes | - | Callback when value changes |
| `placeholder` | `string` | No | `'Select item'` | Placeholder text |
| `label` | `string` | No | - | Label above dropdown |
| `disabled` | `boolean` | No | `false` | Disable the dropdown |
| `search` | `boolean` | No | `false` | Enable search functionality |
| `searchPlaceholder` | `string` | No | `'Search...'` | Search input placeholder |
| `maxHeight` | `number` | No | `300` | Maximum height of dropdown list |
| `containerStyle` | `StyleProp<ViewStyle>` | No | - | Container style |
| `dropdownStyle` | `StyleProp<ViewStyle>` | No | - | Dropdown style |
| `placeholderStyle` | `StyleProp<TextStyle>` | No | - | Placeholder text style |
| `selectedTextStyle` | `StyleProp<TextStyle>` | No | - | Selected text style |
| `labelStyle` | `StyleProp<TextStyle>` | No | - | Label text style |
| `iconColor` | `string` | No | `'#6B7280'` | Icon color |

## File Structure

```
Dropdown/
├── index.tsx           # Main export file (combines UI and logic)
├── DropdownUI.tsx      # UI presentation component
├── useDropdown.ts      # Logic hook
├── types.ts            # TypeScript types
└── README.md           # This file
```

## Copying to Another Project

To use this component in another project:

1. Copy the entire `Dropdown` folder to your new project
2. Install the required dependency: `npm install react-native-element-dropdown@2.12.4`
3. Import and use as shown above

The component is self-contained and doesn't rely on external project-specific code.

## Advanced Usage

### Using the Hook Directly

You can use the `useDropdown` hook separately if you need custom UI:

```tsx
import { useDropdown } from './components/Dropdown';

const { isFocus, handleFocus, handleBlur, handleChange } = useDropdown({
  data,
  value,
  onChange,
});
```

### Custom Styling

```tsx
<Dropdown
  data={data}
  value={value}
  onChange={setValue}
  containerStyle={{ marginVertical: 20 }}
  dropdownStyle={{ borderRadius: 12, borderColor: '#3B82F6' }}
  selectedTextStyle={{ fontWeight: 'bold' }}
  iconColor="#3B82F6"
/>
```
