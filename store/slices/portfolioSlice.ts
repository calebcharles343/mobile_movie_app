// app/store/slices/portfolioSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PortfolioItem, PortfolioState } from "../../types/portfolio";

// Dummy portfolio data
const dummyPortfolio: PortfolioItem[] = [
  {
    id: "1",
    cryptoId: "bitcoin",
    amount: 0.5,
    value: 21628.39,
    purchasePrice: 41200,
    currentPrice: 43256.78,
    change: 1056.39,
    changePercentage: 5.12,
  },
  {
    id: "2",
    cryptoId: "ethereum",
    amount: 3.2,
    value: 7506.14,
    purchasePrice: 2200,
    currentPrice: 2345.67,
    change: 466.14,
    changePercentage: 6.63,
  },
  {
    id: "3",
    cryptoId: "solana",
    amount: 25,
    value: 2561.25,
    purchasePrice: 90,
    currentPrice: 102.45,
    change: 311.25,
    changePercentage: 13.83,
  },
];

const initialState: PortfolioState = {
  items: dummyPortfolio,
  totalValue: 31695.78,
  totalChange: 1833.78,
  totalChangePercentage: 6.14,
  isLoading: false,
};

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    addToPortfolio: (state, action: PayloadAction<PortfolioItem>) => {
      state.items.push(action.payload);
      state.totalValue += action.payload.value;
    },
    removeFromPortfolio: (state, action: PayloadAction<string>) => {
      const item = state.items.find(
        (i: PortfolioItem) => i.id === action.payload
      );
      if (item) {
        state.totalValue -= item.value;
        state.items = state.items.filter(
          (i: PortfolioItem) => i.id !== action.payload
        );
      }
    },
    updatePortfolioValue: (state) => {
      // Update values based on current prices
      let total = 0;
      state.items.forEach((item: PortfolioItem) => {
        // In real app, fetch current price from API
        item.currentPrice =
          item.currentPrice * (1 + Math.random() * 0.02 - 0.01);
        item.value = item.amount * item.currentPrice;
        item.change = item.value - item.amount * item.purchasePrice;
        item.changePercentage =
          (item.change / (item.amount * item.purchasePrice)) * 100;
        total += item.value;
      });
      state.totalValue = total;
    },
  },
});

export const { addToPortfolio, removeFromPortfolio, updatePortfolioValue } =
  portfolioSlice.actions;

export default portfolioSlice.reducer;
