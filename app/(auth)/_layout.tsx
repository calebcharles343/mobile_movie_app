// app/(auth)/_layout.tsx
import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SplashScreen" />
      <Stack.Screen name="LoginScreen" />
      <Stack.Screen name="SignUpScreen" />
      <Stack.Screen name="ForgotPasswordScreen" />
      <Stack.Screen name="VerifyOTPScreen" />
    </Stack>
  );
}
