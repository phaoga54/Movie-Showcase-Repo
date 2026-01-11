# Source Sans Pro Fonts

This directory contains the Source Sans Pro font family.

## Available Fonts

- **Regular**: SourceSansPro-Regular.ttf
- **Italic**: SourceSansPro-Italic.ttf
- **Light**: SourceSansPro-Light.ttf
- **Light Italic**: SourceSansPro-LightItalic.ttf
- **Semibold**: SourceSansPro-Semibold.ttf
- **Semibold Italic**: SourceSansPro-SemiboldItalic.ttf
- **Bold**: SourceSansPro-Bold.ttf
- **Bold Italic**: SourceSansPro-BoldItalic.ttf
- **ExtraLight**: SourceSansPro-ExtraLight.ttf
- **ExtraLight Italic**: SourceSansPro-ExtraLightItalic.ttf
- **Black**: SourceSansPro-Black.ttf
- **Black Italic**: SourceSansPro-BlackItalic.ttf

## Usage

### Direct Usage

```tsx
import { Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  text: {
    fontFamily: 'SourceSansPro-Regular',
    fontSize: 16,
  },
});

<Text style={styles.text}>Hello World</Text>
```

### Using Typography Constants

```tsx
import { typography } from '@/src/constants/typography';

const styles = StyleSheet.create({
  heading: {
    ...typography.h1,
  },
  body: {
    ...typography.body1,
  },
});
```

## Font Loading

Fonts are automatically loaded in `App.tsx` using the `useFonts` hook. The app shows a loading indicator while fonts are being loaded.

## License

See OFL.txt for license information.
