import { useFonts as useExpoFonts } from 'expo-font';
import { fonts } from '@/src/config/fonts';

export const useFonts = () => {
  const [fontsLoaded, fontError] = useExpoFonts(fonts);

  return {
    fontsLoaded,
    fontError,
  };
};
