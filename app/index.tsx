import { router } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";

export default function Index() {
  useEffect(() => {
    // Auto-navigate to login after 3 seconds
    const timer = setTimeout(() => {
      router.replace("/(auth)/SplashScreen");
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex-1 justify-center items-center bg-gradient-to-b from-primary to-primary-dark"></View>
  );
}
