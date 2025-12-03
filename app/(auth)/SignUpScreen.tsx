// app/(auth)/SignUpScreen.tsx
import React from "react";
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
import { useDispatch } from "react-redux";
import { router } from "expo-router";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { registerSuccess } from "../../store/slices/authSlice"; // Relative import

const signUpSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  phone: yup
    .string()
    .matches(/^[0-9]+$/, "Please enter a valid phone number")
    .min(10, "Phone number must be at least 10 digits")
    .required("Phone number is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain uppercase, lowercase, and number"
    )
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

type SignUpFormData = yup.InferType<typeof signUpSchema>;

function SignUpScreen() {
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<SignUpFormData>({
    resolver: yupResolver(signUpSchema),
  });

  const onSubmit = (data: SignUpFormData) => {
    console.log("Sign up data:", data);

    // Dummy user data
    const dummyUser = {
      id: "1",
      email: data.email,
      name: data.name,
      phone: data.phone,
      isVerified: false,
      twoFactorEnabled: false,
      createdAt: new Date().toISOString(),
    };

    dispatch(
      registerSuccess({
        user: dummyUser,
        token: "dummy-jwt-token",
      })
    );

    // Navigate to OTP verification with email as param
    router.push({
      pathname: "/VerifyOTPScreen" as any,
      params: { email: data.email },
    });
  };

  const handleLogin = () => {
    router.push("/LoginScreen" as any);
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
          <Text className="text-4xl font-bold text-white mb-2">
            Create Account
          </Text>
          <Text className="text-gray-400 text-lg">
            Join the future of finance
          </Text>
        </View>

        {/* Form */}
        <View className="px-8">
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            autoCapitalize="words"
            value={watch("name")}
            onChangeText={(text) => setValue("name", text)}
            error={errors.name?.message}
          />

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
            label="Phone Number"
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
            value={watch("phone")}
            onChangeText={(text) => setValue("phone", text)}
            error={errors.phone?.message}
          />

          <Input
            label="Password"
            placeholder="Create a strong password"
            secureTextEntry
            value={watch("password")}
            onChangeText={(text) => setValue("password", text)}
            error={errors.password?.message}
          />

          <Input
            label="Confirm Password"
            placeholder="Confirm your password"
            secureTextEntry
            value={watch("confirmPassword")}
            onChangeText={(text) => setValue("confirmPassword", text)}
            error={errors.confirmPassword?.message}
          />

          {/* Terms */}
          <View className="flex-row items-start mb-6">
            <Text className="text-gray-400 text-sm">
              By creating an account, you agree to our{" "}
              <Text className="text-crypto-primary">Terms of Service</Text> and{" "}
              <Text className="text-crypto-primary">Privacy Policy</Text>
            </Text>
          </View>

          {/* Create Account Button */}
          <Button size="lg" onPress={handleSubmit(onSubmit)} className="mb-6">
            Create Account
          </Button>

          {/* Login Link */}
          <View className="flex-row justify-center">
            <Text className="text-gray-400">Already have an account? </Text>
            <TouchableOpacity onPress={handleLogin}>
              <Text className="text-crypto-primary font-medium">Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default SignUpScreen;
