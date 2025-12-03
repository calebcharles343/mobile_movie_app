import { Image } from "expo-image";
import { Href, Link } from "expo-router";
import React, { useMemo } from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";

interface SocialAuthButtonsProps {
  googleHref?: Href;
  facebookHref?: Href;
  onGooglePress?: () => void;
  onFacebookPress?: () => void;
  loading?: boolean;
}

type SocialButtonType = "google" | "facebook";

const SOCIAL_CONFIG = {
  google: {
    label: "Continue with Google",
    icon: require("@/assets/images/social/google-color.png"),
    testID: "google-auth-button",
    textColor: "#167EE6", // gray-800
    // borderColor: "#d1d5db", // gray-300
    borderColor: "#167EE6", // gray-300
    backgroundColor: "#ffffff", // white
  },
  facebook: {
    label: "Continue with Facebook",
    icon: require("@/assets/images/social/facebook-color.png"),
    testID: "facebook-auth-button",
    textColor: "#167EE6", // gray-800
    borderColor: "#167EE6", // gray-300
    backgroundColor: "#ffffff", // white
  },
} as const;

export function SocialAuthButtons({
  googleHref = "/(auth)/LoginScreen",
  facebookHref = "/(auth)/LoginScreen",
  onGooglePress,
  onFacebookPress,
  loading = false,
}: SocialAuthButtonsProps) {
  const SocialButton = useMemo(() => {
    const Button = ({
      type,
      href,
      onPress,
    }: {
      type: SocialButtonType;
      href: Href;
      onPress?: () => void;
    }) => {
      const config = SOCIAL_CONFIG[type];
      const isAndroid = Platform.OS === "android";

      const buttonContent = (
        <TouchableOpacity
          className={`
            py-3 rounded-xl 
            border
            ${loading ? "opacity-60" : "active:opacity-90"}
            flex-row items-center justify-center
            ${isAndroid ? "android:shadow-sm" : ""}
          `}
          style={{
            backgroundColor: config.backgroundColor,
            borderColor: config.borderColor,
            marginBottom: 4, // Add spacing between buttons
          }}
          disabled={loading}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel={config.label}
          accessibilityState={{ disabled: loading }}
          testID={config.testID}
          onPress={onPress}
        >
          <Image
            source={config.icon}
            style={{ width: 20, height: 20, marginRight: 12 }}
            contentFit="contain"
            accessibilityIgnoresInvertColors
          />
          <Text
            className="text-base font-medium select-none"
            style={{ color: config.textColor }}
          >
            {config.label}
          </Text>
        </TouchableOpacity>
      );

      // If onPress is provided, use TouchableOpacity directly
      if (onPress) {
        return buttonContent;
      }

      // Otherwise use Link for navigation
      return (
        <Link href={href} asChild>
          {buttonContent}
        </Link>
      );
    };

    return Button;
  }, [loading]);

  return (
    <View
      className="w-full"
      style={{ gap: 12 }} // Increased spacing between buttons
      accessibilityRole="menu"
      accessibilityLabel="Social authentication options"
    >
      <SocialButton type="google" href={googleHref} onPress={onGooglePress} />
      <SocialButton
        type="facebook"
        href={facebookHref}
        onPress={onFacebookPress}
      />
    </View>
  );
}
