// app/(tabs)/_layout.tsx
import { Redirect, Tabs } from "expo-router";
import Icon from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export default function TabLayout() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  // If not authenticated, redirect to auth
  // app/(tabs)/_layout.tsx - Line 14
  if (!isAuthenticated) {
    return <Redirect href="/(auth)/LoginScreen" />;
  }
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#2563eb",
        tabBarInactiveTintColor: "#64748b",
        tabBarStyle: {
          backgroundColor: "#121826",
          borderTopColor: "#1e293b",
          height: 60,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ size, color }) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Markets",
          tabBarIcon: ({ size, color }) => (
            <Icon name="trending-up" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
