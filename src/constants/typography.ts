import { TextStyle } from 'react-native';

export const fontFamily = {
  regular: 'SourceSansPro-Regular',
  italic: 'SourceSansPro-Italic',
  light: 'SourceSansPro-Light',
  lightItalic: 'SourceSansPro-LightItalic',
  semibold: 'SourceSansPro-Semibold',
  semiboldItalic: 'SourceSansPro-SemiboldItalic',
  bold: 'SourceSansPro-Bold',
  boldItalic: 'SourceSansPro-BoldItalic',
  extraLight: 'SourceSansPro-ExtraLight',
  extraLightItalic: 'SourceSansPro-ExtraLightItalic',
  black: 'SourceSansPro-Black',
  blackItalic: 'SourceSansPro-BlackItalic',
} as const;

export const typography = {
  h1: {
    fontFamily: fontFamily.bold,
    fontSize: 32,
    lineHeight: 40,
  } as TextStyle,
  h2: {
    fontFamily: fontFamily.bold,
    fontSize: 28,
    lineHeight: 36,
  } as TextStyle,
  h3: {
    fontFamily: fontFamily.semibold,
    fontSize: 24,
    lineHeight: 32,
  } as TextStyle,
  h4: {
    fontFamily: fontFamily.semibold,
    fontSize: 20,
    lineHeight: 28,
  } as TextStyle,
  h5: {
    fontFamily: fontFamily.semibold,
    fontSize: 18,
    lineHeight: 24,
  } as TextStyle,
  h6: {
    fontFamily: fontFamily.semibold,
    fontSize: 16,
    lineHeight: 22,
  } as TextStyle,
  body1: {
    fontFamily: fontFamily.regular,
    fontSize: 16,
    lineHeight: 24,
  } as TextStyle,
  body2: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    lineHeight: 20,
  } as TextStyle,
  caption: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    lineHeight: 16,
  } as TextStyle,
  button: {
    fontFamily: fontFamily.semibold,
    fontSize: 16,
    lineHeight: 24,
  } as TextStyle,
};
