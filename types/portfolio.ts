// app/types/portfolio.ts
export interface PortfolioItem {
  id: string;
  cryptoId: string;
  amount: number;
  value: number;
  purchasePrice: number;
  currentPrice: number;
  change: number;
  changePercentage: number;
}

export interface PortfolioState {
  items: PortfolioItem[];
  totalValue: number;
  totalChange: number;
  totalChangePercentage: number;
  isLoading: boolean;
}
