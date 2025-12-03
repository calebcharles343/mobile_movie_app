// app/types/crypto.ts
export interface CryptoCurrency {
  id: string;
  symbol: string;
  name: string;
  image: string;
  currentPrice: number;
  priceChange24h: number;
  priceChangePercentage24h: number;
  marketCap: number;
  marketCapRank: number;
  volume24h: number;
  circulatingSupply: number;
  totalSupply: number | null;
  sparkline7d: number[];
}

export interface CryptoState {
  cryptos: CryptoCurrency[];
  favorites: string[];
  isLoading: boolean;
  error: string | null;
  selectedCrypto: CryptoCurrency | null;
}
