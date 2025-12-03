// src/components/ui/Card.tsx
import React from "react";
import { View, ViewProps } from "react-native";

interface CardProps extends ViewProps {
  children: React.ReactNode;
  variant?: "default" | "outline";
}

const Card: React.FC<CardProps> = ({
  children,
  variant = "default",
  className = "",
  ...props
}) => {
  const variantClasses = {
    default: "bg-crypto-card-dark",
    outline: "bg-transparent border border-gray-700",
  };

  return (
    <View
      className={`rounded-xl p-4 ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </View>
  );
};

export default Card;
