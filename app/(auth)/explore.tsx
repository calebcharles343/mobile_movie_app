import { Link } from "expo-router";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Image,
  ImageBackground,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

function ExploreScreen() {
  const zoomAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(zoomAnim, {
        toValue: 1.02,
        duration: 1500,
        useNativeDriver: false,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false,
      }),
    ]).start();
  }, []);

  return (
    <View className="flex-1 bg-black">
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      {/* Background Image Container (60% of screen height) */}
      <View style={{ height: height * 0.55, position: "relative" }}>
        {/* Stretched Background Image - Make sure it stays at the back */}
        <Animated.View
          style={{
            transform: [{ scale: zoomAnim }],
            width: "100%",
            height: "100%",
            position: "absolute",
            zIndex: 1, // Background at lower zIndex
          }}
        >
          <ImageBackground
            source={require("@/assets/images/iwc-splash-bg.png")}
            className="w-full h-full"
            resizeMode="cover"
            style={{
              transform: [{ scale: 1.3 }],
            }}
          >
            {/* Dark Overlay */}
            <Animated.View
              style={{ opacity: fadeAnim }}
              className="absolute inset-0 bg-black/60"
            />

            {/* Gradient Overlays */}
            <View className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-black/70 to-transparent" />
            <View className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent" />
          </ImageBackground>
        </Animated.View>

        {/* Logo - Positioned on top of everything with higher zIndex */}
        <View
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 100, // Much higher zIndex to ensure it's on top
          }}
        >
          <Image
            source={require("@/assets/images/iwc-logo.png")}
            style={{
              width: width * 0.8,
              height: (width * 0.8 * 348) / 353,
            }}
            resizeMode="contain"
          />
        </View>
      </View>

      {/* App Name & Description */}
      <View className="bg-white h-full items-center rounded-3xl z-40 py-16 px-4">
        <Text className="text-2xl   text-center leading-tight mb-4">
          Explore now {"\n"}to experience the benefits
        </Text>

        <View className="mt-2 px-16 mb-16">
          <Text className="text-gray-400 text-base text-center font-normal leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore
          </Text>
        </View>

        <Link className="w-full" href="/(auth)/Login-signup" asChild>
          <TouchableOpacity className="bg-secondary px-8 py-3 rounded-lg">
            <Text className="text-white text-center text-lg font-semibold">
              Get Started
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

export default ExploreScreen;
