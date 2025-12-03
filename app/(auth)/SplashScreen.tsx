import { router } from "expo-router";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Image,
  ImageBackground,
  StatusBar,
  Text,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

function SplashScreen() {
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

    const timer = setTimeout(() => {
      router.replace("/explore");
    }, 3000); // Actually fixed to 3 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex-1 bg-black">
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      {/* Background Image Container (60% of screen height) */}
      <View style={{ height: height * 0.6, position: "relative" }}>
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
      <View className="flex-1 justify-center items-center px-6">
        <View className="items-center">
          <Text className="text-5xl font-poppins-bold text-white text-center leading-tight">
            IWC{"\n"}Exchange
          </Text>

          <View className="mt-6 px-4">
            <Text className="text-text_muted text-lg text-center font-poppins-regular leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default SplashScreen;
