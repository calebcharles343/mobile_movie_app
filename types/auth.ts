// app/types/auth.ts
export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  isVerified: boolean;
  twoFactorEnabled: boolean;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  biometricEnabled: boolean;
}
