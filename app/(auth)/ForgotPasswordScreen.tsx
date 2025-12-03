// app/(auth)/ForgotPasswordScreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { router } from "expo-router";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

const forgotPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
});

type ForgotPasswordFormData = yup.InferType<typeof forgotPasswordSchema>;

function ForgotPasswordScreen() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ForgotPasswordFormData>({
    resolver: yupResolver(forgotPasswordSchema),
  });

  const onSubmit = (data: ForgotPasswordFormData) => {
    console.log("Reset password for:", data.email);
    setIsSubmitted(true);

    // Simulate API call
    setTimeout(() => {
      router.push({
        pathname: "/(auth)/VerifyOTPScreen",
        params: { email: data.email },
      });
    }, 1500);
  };

  const handleBackToLogin = () => {
    router.push("/(auth)/LoginScreen");
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
        <View className="px-8 pt-20 pb-8">
          <TouchableOpacity onPress={handleBackToLogin} className="mb-6">
            <Text className="text-crypto-primary text-lg">← Back</Text>
          </TouchableOpacity>

          <Text className="text-4xl font-bold text-white mb-2">
            Forgot Password
          </Text>
          <Text className="text-gray-400 text-lg">
            Enter your email to reset your password
          </Text>
        </View>

        {/* Form */}
        <View className="px-8">
          {isSubmitted ? (
            <View className="items-center py-8">
              <View className="w-20 h-20 bg-green-500/20 rounded-full items-center justify-center mb-6">
                <Text className="text-4xl">✓</Text>
              </View>
              <Text className="text-2xl font-bold text-white mb-2">
                Check Your Email
              </Text>
              <Text className="text-gray-400 text-center mb-8">
                We've sent password reset instructions to your email address
              </Text>
              <Button variant="outline" size="lg" onPress={handleBackToLogin}>
                Back to Login
              </Button>
            </View>
          ) : (
            <>
              <Input
                label="Email Address"
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={watch("email")}
                onChangeText={(text) => setValue("email", text)}
                error={errors.email?.message}
              />

              <Text className="text-gray-400 text-sm mb-6">
                You'll receive an email with instructions on how to reset your
                password.
              </Text>

              <Button
                size="lg"
                onPress={handleSubmit(onSubmit)}
                className="mb-6"
              >
                Send Reset Instructions
              </Button>

              {/* Support */}
              <View className="mt-8 pt-6 border-t border-gray-800">
                <Text className="text-gray-400 text-center mb-4">
                  Need help? Contact our support team
                </Text>
                <Button
                  variant="ghost"
                  size="md"
                  onPress={() => console.log("Contact support")}
                >
                  Contact Support
                </Button>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default ForgotPasswordScreen;
