// app/store/slices/cryptoSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CryptoCurrency, CryptoState } from "../../types/crypto";

// Dummy crypto data
const dummyCryptos: CryptoCurrency[] = [
  {
    id: "bitcoin",
    symbol: "btc",
    name: "Bitcoin",
    image: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
    currentPrice: 43256.78,
    priceChange24h: 1245.32,
    priceChangePercentage24h: 2.95,
    marketCap: 846257894123,
    marketCapRank: 1,
    volume24h: 32456789123,
    circulatingSupply: 19456789,
    totalSupply: 21000000,
    sparkline7d: [42000, 42500, 43000, 42800, 43200, 43100, 43256],
  },
  {
    id: "ethereum",
    symbol: "eth",
    name: "Ethereum",
    image: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
    currentPrice: 2345.67,
    priceChange24h: 56.78,
    priceChangePercentage24h: 2.48,
    marketCap: 281567890123,
    marketCapRank: 2,
    volume24h: 15478912345,
    circulatingSupply: 120156789,
    totalSupply: null,
    sparkline7d: [2300, 2320, 2335, 2328, 2340, 2342, 2345],
  },
  {
    id: "solana",
    symbol: "sol",
    name: "Solana",
    image: "https://cryptologos.cc/logos/solana-sol-logo.png",
    currentPrice: 102.45,
    priceChange24h: 5.67,
    priceChangePercentage24h: 5.86,
    marketCap: 45678901234,
    marketCapRank: 5,
    volume24h: 3456789123,
    circulatingSupply: 445678901,
    totalSupply: 534000000,
    sparkline7d: [95, 96, 98, 100, 101, 102, 102.45],
  },
];

const initialState: CryptoState = {
  cryptos: dummyCryptos,
  favorites: ["bitcoin", "ethereum"],
  isLoading: false,
  error: null,
  selectedCrypto: dummyCryptos[0],
};

const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {
    setCryptos: (state, action: PayloadAction<CryptoCurrency[]>) => {
      state.cryptos = action.payload;
    },
    addFavorite: (state, action: PayloadAction<string>) => {
      if (!state.favorites.includes(action.payload)) {
        state.favorites.push(action.payload);
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter(
        (id: string) => id !== action.payload
      );
    },
    setSelectedCrypto: (state, action: PayloadAction<CryptoCurrency>) => {
      state.selectedCrypto = action.payload;
    },
    updateCryptoPrice: (
      state,
      action: PayloadAction<{ id: string; price: number; change: number }>
    ) => {
      const crypto = state.cryptos.find(
        (c: CryptoCurrency) => c.id === action.payload.id
      );
      if (crypto) {
        crypto.currentPrice = action.payload.price;
        crypto.priceChange24h = action.payload.change;
      }
    },
  },
});

export const {
  setCryptos,
  addFavorite,
  removeFavorite,
  setSelectedCrypto,
  updateCryptoPrice,
} = cryptoSlice.actions;

export default cryptoSlice.reducer;
