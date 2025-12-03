import { View, type ViewProps } from "react-native";

export type ThemedViewProps = ViewProps & {
  // Remove theme-related props
};

export function ThemedView({ style, ...otherProps }: ThemedViewProps) {
  return <View style={style} {...otherProps} />;
}
