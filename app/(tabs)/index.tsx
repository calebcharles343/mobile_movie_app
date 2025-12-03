// app/(tabs)/index.tsx
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { RootState } from "@/store";

export default function DashboardScreen() {
  const { user } = useSelector((state: RootState) => state.auth);
  const { totalValue, totalChange, totalChangePercentage } = useSelector(
    (state: RootState) => state.portfolio
  );
  const { cryptos } = useSelector((state: RootState) => state.crypto);

  return (
    <ScrollView className="flex-1 bg-crypto-dark">
      {/* Header */}
      <View className="px-6 pt-12 pb-6 flex-row justify-between items-center">
        <View>
          <Text className="text-gray-400 text-sm">Welcome back,</Text>
          <Text className="text-2xl font-bold text-white">{user?.name}</Text>
        </View>
        <TouchableOpacity className="w-10 h-10 bg-gray-800 rounded-full items-center justify-center">
          <Icon name="notifications-outline" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Portfolio Overview */}
      <Card className="mx-6 mb-6">
        <Text className="text-gray-400 text-sm mb-2">
          Total Portfolio Value
        </Text>
        <View className="flex-row items-end justify-between mb-4">
          <Text className="text-4xl font-bold text-white">
            $
            {totalValue.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Text>
          <View className="flex-row items-center">
            <Icon
              name={totalChange >= 0 ? "trending-up" : "trending-down"}
              size={20}
              color={totalChange >= 0 ? "#10b981" : "#ef4444"}
            />
            <Text
              className={`ml-1 font-semibold ${
                totalChange >= 0 ? "text-crypto-success" : "text-crypto-danger"
              }`}
            >
              {totalChange >= 0 ? "+" : ""}
              {totalChangePercentage.toFixed(2)}%
            </Text>
          </View>
        </View>
        <Text
          className={`text-sm ${
            totalChange >= 0 ? "text-crypto-success" : "text-crypto-danger"
          }`}
        >
          {totalChange >= 0 ? "+" : ""}${totalChange.toFixed(2)} today
        </Text>
      </Card>

      {/* Market Overview */}
      <View className="px-6 mb-8">
        <Text className="text-white text-lg font-semibold mb-4">
          Top Cryptocurrencies
        </Text>

        {cryptos.map((crypto) => (
          <TouchableOpacity
            key={crypto.id}
            className="flex-row items-center justify-between py-3 border-b border-gray-800"
          >
            <View className="flex-row items-center">
              <View className="w-10 h-10 rounded-full bg-gray-800 items-center justify-center mr-3">
                <Text className="text-lg">
                  {crypto.symbol.toUpperCase().charAt(0)}
                </Text>
              </View>
              <View>
                <Text className="text-white font-medium">{crypto.name}</Text>
                <Text className="text-gray-400 text-sm">
                  {crypto.symbol.toUpperCase()}
                </Text>
              </View>
            </View>

            <View className="items-end">
              <Text className="text-white font-medium">
                $
                {crypto.currentPrice.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Text>
              <Text
                className={`text-sm ${
                  crypto.priceChangePercentage24h >= 0
                    ? "text-crypto-success"
                    : "text-crypto-danger"
                }`}
              >
                {crypto.priceChangePercentage24h >= 0 ? "+" : ""}
                {crypto.priceChangePercentage24h.toFixed(2)}%
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}
