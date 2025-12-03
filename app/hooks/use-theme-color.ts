// app/hooks/use-theme-color.ts
import useColorScheme from "./use-color-scheme";

// Define theme colors for both light and dark modes
const Colors = {
  light: {
    // Light theme colors for crypto app
    background: "#ffffff",
    backgroundSecondary: "#f8fafc",
    cardBackground: "#f1f5f9",
    text: "#0f172a",
    textSecondary: "#475569",
    border: "#e2e8f0",
    primary: "#2563eb",
    secondary: "#7c3aed",
    accent: "#06b6d4",
    success: "#10b981",
    danger: "#ef4444",
    warning: "#f59e0b",
    info: "#3b82f6",

    // Crypto-specific light theme
    cryptoCard: "#ffffff",
    cryptoCardBorder: "#e2e8f0",
    cryptoDarkText: "#0f172a",
    cryptoLightText: "#475569",

    // Gradients
    gradientStart: "#6366f1",
    gradientMiddle: "#8b5cf6",
    gradientEnd: "#d946ef",
  },
  dark: {
    // Dark theme colors for crypto app (default)
    background: "#0a0e17",
    backgroundSecondary: "#121826",
    cardBackground: "#1e293b",
    text: "#f8fafc",
    textSecondary: "#cbd5e1",
    border: "#334155",
    primary: "#2563eb",
    secondary: "#7c3aed",
    accent: "#06b6d4",
    success: "#10b981",
    danger: "#ef4444",
    warning: "#f59e0b",
    info: "#3b82f6",

    // Crypto-specific dark theme
    cryptoCard: "#121826",
    cryptoCardBorder: "#1e293b",
    cryptoDarkText: "#0f172a",
    cryptoLightText: "#cbd5e1",

    // Gradients
    gradientStart: "#6366f1",
    gradientMiddle: "#8b5cf6",
    gradientEnd: "#d946ef",
  },
};

export type ThemeColors = typeof Colors.light;

/**
 * Hook to get theme colors based on current color scheme
 * @returns Theme colors object for current color scheme
 */
export function useThemeColor(
  colorName: keyof ThemeColors,
  props?: { light?: string; dark?: string }
): string {
  const theme = useColorScheme();

  // If props are provided, use them, otherwise use default theme colors
  const colorFromProps = props?.[theme];
  if (colorFromProps) {
    return colorFromProps;
  }

  return Colors[theme][colorName];
}

/**
 * Hook to get all theme colors for current color scheme
 * @returns Complete theme colors object
 */
export function useThemeColors(): ThemeColors {
  const theme = useColorScheme();
  return Colors[theme];
}

/**
 * Hook to get color scheme (light/dark)
 * @returns Current color scheme
 */
export function useTheme() {
  const colorScheme = useColorScheme();
  const colors = useThemeColors();

  return {
    colorScheme,
    colors,
    isDark: colorScheme === "dark",
    isLight: colorScheme === "light",
  };
}

export default useThemeColor;
