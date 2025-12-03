// app/hooks/use-color-scheme.web.ts
import { useEffect, useState } from "react";

// This is a web-specific implementation of useColorScheme
// It uses the CSS prefers-color-scheme media query

export default function useColorScheme() {
  const [colorScheme, setColorScheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    // Check if we're on web
    if (typeof window === "undefined") {
      return;
    }

    // Create media query for dark mode
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    // Set initial value
    setColorScheme(mediaQuery.matches ? "dark" : "light");

    // Create event listener for changes
    const handler = (event: MediaQueryListEvent) => {
      setColorScheme(event.matches ? "dark" : "light");
    };

    // Add event listener (modern browsers)
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handler);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handler);
    }

    // Cleanup
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handler);
      } else {
        // Fallback for older browsers
        mediaQuery.removeListener(handler);
      }
    };
  }, []);

  return colorScheme;
}
