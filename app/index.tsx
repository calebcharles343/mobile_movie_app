import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 gap-8 justify-center items-center p-4">
      <View className="w-64 items-center">
        <Text className="text-5xl text-primary">IWC</Text>
        <Text className="text-5xl text-primary">Exchanger</Text>
      </View>
      <Text className="text-xl text-center text-primary">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore{" "}
      </Text>
      {/* <Link href="/onboarding">Onboarding</Link>
      <Link href="/movies/avengers">Avenger Movie</Link> */}
    </View>
  );
}
