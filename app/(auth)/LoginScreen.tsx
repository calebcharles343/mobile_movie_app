// app/(auth)/LoginScreen.tsx
import { yupResolver } from "@hookform/resolvers/yup";
import { router } from "expo-router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { loginSuccess } from "../../store/slices/authSlice"; // Relative import

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

type LoginFormData = yup.InferType<typeof loginSchema>;

function LoginScreen() {
  const dispatch = useDispatch();
  const [isBiometric, setIsBiometric] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "demo@crypto.com",
      password: "password123",
    },
  });

  const onSubmit = (data: LoginFormData) => {
    console.log("Login data:", data);

    // Dummy user data
    const dummyUser = {
      id: "1",
      email: data.email,
      name: "John Crypto",
      phone: "+1234567890",
      isVerified: true,
      twoFactorEnabled: false,
      createdAt: new Date().toISOString(),
    };

    dispatch(
      loginSuccess({
        user: dummyUser,
        token: "dummy-jwt-token",
      })
    );

    // Navigate to tabs using Expo Router
    router.replace("/(tabs)" as any);
  };

  const handleSignUp = () => {
    router.push("/(auth)/SignUpScreen");
  };

  const handleForgotPassword = () => {
    router.push("/(auth)/ForgotPasswordScreen");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-crypto-dark py-28"
    >
      <StatusBar barStyle="light-content" backgroundColor="#0a0e17" />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Form */}
        <View className="px-8">
          <Input
            label="Email"
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={watch("email")}
            onChangeText={(text) => setValue("email", text)}
            error={errors.email?.message}
          />

          <Input
            label="Password"
            placeholder="Enter your password"
            secureTextEntry
            value={watch("password")}
            onChangeText={(text) => setValue("password", text)}
            error={errors.password?.message}
          />

          {/* Forgot Password */}
          <TouchableOpacity
            onPress={handleForgotPassword}
            className="self-end mb-6"
          >
            <Text className="text-crypto-primary font-medium">
              Forgot Password?
            </Text>
          </TouchableOpacity>

          {/* Sign In Button */}
          <Button size="lg" onPress={handleSubmit(onSubmit)} className="mb-4">
            Sign In
          </Button>

          {/* Sign Up Link */}
          <View className="flex-row justify-center">
            <Text className="text-gray-400">Don't have an account? </Text>
            <TouchableOpacity onPress={handleSignUp}>
              <Text className="text-crypto-primary font-medium">Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default LoginScreen;
