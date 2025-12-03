// app/hooks/use-color-scheme.ts
import {
  ColorSchemeName,
  useColorScheme as _useColorScheme,
} from "react-native";

// The useColorScheme hook is built-in to react-native, but we want to use it
// throughout our app in a consistent way. This hook will provide the color scheme
// (light/dark) based on the user's device settings.

export default function useColorScheme(): NonNullable<ColorSchemeName> {
  // Use the built-in hook from react-native
  const colorScheme = _useColorScheme();

  // Default to 'dark' for crypto app (prefers dark theme)
  // This can be overridden by user preferences stored in Redux
  return colorScheme ?? "dark";
}
