// app/(auth)/VerifyOTPScreen.tsx
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Button from "../../components/ui/Button";

function VerifyOTPScreen() {
  const { email } = useLocalSearchParams<{ email: string }>();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [isVerified, setIsVerified] = useState(false);
  const inputs = useRef<TextInput[]>([]);

  // And fix the timer usage:
  useEffect(() => {
    let interval: ReturnType<typeof setTimeout>;
    if (timer > 0 && !isVerified) {
      interval = setTimeout(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (interval) clearTimeout(interval);
    };
  }, [timer, isVerified]);

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }

    // Check if OTP is complete
    if (newOtp.every((digit) => digit !== "")) {
      verifyOtp(newOtp.join(""));
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const verifyOtp = (enteredOtp: string) => {
    console.log("Verifying OTP:", enteredOtp);

    // Dummy verification
    if (enteredOtp === "123456") {
      setIsVerified(true);
      setTimeout(() => {
        router.replace("/(tabs)" as any);
      }, 2000);
    } else {
      // Show error
      setOtp(["", "", "", "", "", ""]);
      inputs.current[0]?.focus();
    }
  };

  const resendOtp = () => {
    setTimer(60);
    console.log("Resending OTP to:", email);
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-crypto-dark"
    >
      <StatusBar barStyle="light-content" backgroundColor="#0a0e17" />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="px-8 pt-16 pb-8">
          <TouchableOpacity onPress={handleBack} className="mb-6">
            <Text className="text-crypto-primary text-lg">← Back</Text>
          </TouchableOpacity>

          <Text className="text-4xl font-bold text-white mb-2">Verify OTP</Text>
          <Text className="text-gray-400 text-lg mb-1">
            We've sent a 6-digit code to
          </Text>
          <Text className="text-crypto-primary font-medium text-lg">
            {email || "your email"}
          </Text>
        </View>

        {/* OTP Inputs */}
        <View className="px-8">
          {isVerified ? (
            <View className="items-center py-8">
              <View className="w-20 h-20 bg-green-500/20 rounded-full items-center justify-center mb-6">
                <Text className="text-4xl">✓</Text>
              </View>
              <Text className="text-2xl font-bold text-white mb-2">
                Verified Successfully!
              </Text>
              <Text className="text-gray-400 text-center mb-8">
                Your account has been verified
              </Text>
            </View>
          ) : (
            <>
              <View className="flex-row justify-between mb-8">
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <TextInput
                    key={index}
                    ref={(ref) => {
                      if (ref) inputs.current[index] = ref;
                    }}
                    className="w-12 h-14 bg-gray-800 border border-gray-700 rounded-lg text-white text-2xl text-center font-bold"
                    keyboardType="number-pad"
                    maxLength={1}
                    value={otp[index]}
                    onChangeText={(value) => handleOtpChange(value, index)}
                    onKeyPress={(e) => handleKeyPress(e, index)}
                    selectionColor="#2563eb"
                  />
                ))}
              </View>

              <Text className="text-gray-400 text-center mb-8">
                Enter the 6-digit code sent to your email
              </Text>

              {/* Resend Timer */}
              <View className="items-center mb-8">
                {timer > 0 ? (
                  <Text className="text-gray-400">
                    Resend code in{" "}
                    <Text className="text-crypto-primary">
                      00:{timer.toString().padStart(2, "0")}
                    </Text>
                  </Text>
                ) : (
                  <TouchableOpacity onPress={resendOtp}>
                    <Text className="text-crypto-primary font-medium">
                      Resend Code
                    </Text>
                  </TouchableOpacity>
                )}
              </View>

              <Button
                size="lg"
                onPress={() => verifyOtp(otp.join(""))}
                disabled={otp.some((digit) => digit === "")}
              >
                Verify & Continue
              </Button>
            </>
          )}

          {/* Help Text */}
          <View className="mt-8 pt-6 border-t border-gray-800">
            <Text className="text-gray-400 text-center">
              Didn't receive the code? Check your spam folder or{" "}
              <Text className="text-crypto-primary">contact support</Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default VerifyOTPScreen;
