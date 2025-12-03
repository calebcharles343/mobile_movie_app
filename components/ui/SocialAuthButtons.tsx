import { Image } from "expo-image";
import { Href, Link } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface SocialAuthButtonsProps {
  googleHref?: Href; // <-- Use Expo Router's Href type
  facebookHref?: Href; // <-- Same here
}

export function SocialAuthButtons({
  googleHref = "/(auth)/LoginScreen",
  facebookHref = "/(auth)/LoginScreen",
}: SocialAuthButtonsProps) {
  return (
    <View className="w-full gap-4">
      {/* Google Button */}
      <Link href={googleHref} asChild>
        <TouchableOpacity className="bg-white py-3 rounded-xl border border-gray-300 active:opacity-90 flex-row items-center justify-center gap-3">
          <Image
            source={require("@/assets/images/social/google-color.png")}
            style={{ width: 20, height: 20 }}
            contentFit="contain"
          />
          <Text className="text-gray-700 text-base font-medium">
            Continue with Google
          </Text>
        </TouchableOpacity>
      </Link>

      {/* Facebook Button */}
      <Link href={facebookHref} asChild>
        <TouchableOpacity className="bg-white py-3 rounded-xl border border-gray-300 active:opacity-90 flex-row items-center justify-center gap-3">
          <Image
            source={require("@/assets/images/social/facebook-color.png")}
            style={{ width: 20, height: 20 }}
            contentFit="contain"
          />
          <Text className="text-gray-700 text-base font-medium">
            Continue with Facebook
          </Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}
