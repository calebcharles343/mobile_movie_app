import { SocialAuthButtons } from "@/components/ui/SocialAuthButtons";
import { Image } from "expo-image";
import { Link } from "expo-router";
import React from "react";
import { StatusBar, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function LoginSignupScreen() {
  return (
    <SafeAreaView className="flex-1 justify-center items-center px-6">
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      {/* Logo */}
      <View className="items-center mb-16">
        <Image
          source={require("@/assets/images/iwc-logo.png")}
          style={{ width: 181, height: 181 }}
          contentFit="contain"
        />
      </View>

      {/* Action Buttons */}
      <View className="w-full gap-5">
        <Link href="/(auth)/LoginScreen" asChild>
          <TouchableOpacity className="bg-accent py-4 rounded-xl active:opacity-90">
            <Text className="text-white text-center text-lg font-semibold">
              Log In
            </Text>
          </TouchableOpacity>
        </Link>

        <Link href="/(auth)/SignUpScreen" asChild>
          <TouchableOpacity className="border border-accent bg-white py-4 rounded-xl active:opacity-90">
            <Text className="text-accent text-center text-lg font-semibold">
              Sign Up
            </Text>
          </TouchableOpacity>
        </Link>
      </View>

      {/* Divider */}
      <View className="py-8">
        <Text className="text-gray-500 text-sm text-center">Or</Text>
      </View>

      {/* Reusable Social Auth Buttons */}
      <SocialAuthButtons />
    </SafeAreaView>
  );
}

export default LoginSignupScreen;
