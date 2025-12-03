import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  InteractionManager,
  StatusBar,
  Text,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

function SplashScreen() {
  const [bgReady, setBgReady] = useState(false);

  useEffect(() => {
    // Ensure logo renders before background mounts
    InteractionManager.runAfterInteractions(() => {
      setBgReady(true);
    });

    const timer = setTimeout(() => {
      router.replace("/explore");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex-1 bg-black">
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      {/* Top Section */}
      <View style={{ height: height * 0.6, position: "relative" }}>
        {/* Background (mounted after logo to prevent flicker) */}
        {bgReady && (
          <View
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              zIndex: 0,
            }}
          >
            <ImageBackground
              source={require("@/assets/images/iwc-splash-bg.png")}
              className="w-full h-full"
              resizeMode="cover"
              style={{
                transform: [{ scale: 1.3 }], // same zoom look
              }}
            >
              {/* Dark overlay */}
              <View className="absolute inset-0 bg-black/60" />

              {/* Gradient overlays */}
              <View className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-black/70 to-transparent" />
              <View className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent" />
            </ImageBackground>
          </View>
        )}

        {/* Logo ALWAYS on top */}
        <View
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 100,
            elevation: 20,
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

      {/* Bottom Text Section */}
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
