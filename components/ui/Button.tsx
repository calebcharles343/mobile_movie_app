// components/ui/Button.tsx
import React from "react";
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  TouchableOpacityProps,
} from "react-native";

interface ButtonProps extends TouchableOpacityProps {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  loading = false,
  children,
  className = "",
  disabled,
  ...props
}) => {
  const baseStyle = "rounded-lg items-center justify-center";

  const variantStyles = {
    primary: "bg-crypto-primary",
    secondary: "bg-crypto-secondary",
    outline: "bg-transparent border border-gray-600",
    ghost: "bg-transparent",
    danger: "bg-crypto-danger",
  };

  const sizeStyles = {
    sm: "px-3 py-2",
    md: "px-4 py-3",
    lg: "px-6 py-4",
  };

  const textSizeStyles = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  const textColorStyles = {
    primary: "text-white",
    secondary: "text-white",
    outline: "text-white",
    ghost: "text-gray-300",
    danger: "text-white",
  };

  return (
    <TouchableOpacity
      className={`${baseStyle} ${variantStyles[variant]} ${sizeStyles[size]} ${
        disabled || loading ? "opacity-50" : "opacity-100"
      } ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text
          className={`font-semibold ${textSizeStyles[size]} ${textColorStyles[variant]}`}
        >
          {children}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
