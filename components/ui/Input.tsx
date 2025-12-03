// src/components/ui/Input.tsx
import React from "react";
import {
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  icon?: string;
  secureTextEntry?: boolean;
  onIconPress?: () => void;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  icon,
  secureTextEntry,
  onIconPress,
  className = "",
  ...props
}) => {
  const [isSecure, setIsSecure] = React.useState(secureTextEntry);

  return (
    <View className="mb-4">
      {label && (
        <Text className="text-gray-300 text-sm font-medium mb-2">{label}</Text>
      )}
      <View className="relative">
        <TextInput
          className={`bg-gray-800 border ${
            error ? "border-crypto-danger" : "border-gray-700"
          } rounded-lg px-4 py-3 text-white ${className}`}
          placeholderTextColor="#64748b"
          secureTextEntry={isSecure}
          {...props}
        />
        {secureTextEntry && (
          <TouchableOpacity
            className="absolute right-3 top-3"
            onPress={() => setIsSecure(!isSecure)}
          >
            <Icon
              name={isSecure ? "eye-off-outline" : "eye-outline"}
              size={20}
              color="#64748b"
            />
          </TouchableOpacity>
        )}
        {icon && !secureTextEntry && (
          <TouchableOpacity
            className="absolute right-3 top-3"
            onPress={onIconPress}
          >
            <Icon name={icon} size={20} color="#64748b" />
          </TouchableOpacity>
        )}
      </View>
      {error && (
        <Text className="text-crypto-danger text-xs mt-1">{error}</Text>
      )}
    </View>
  );
};

export default Input;
