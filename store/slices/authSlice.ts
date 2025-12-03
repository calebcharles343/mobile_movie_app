// app/store/slices/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, User } from "../../types/auth";

// Dummy user data
const dummyUser: User = {
  id: "1",
  email: "demo@crypto.com",
  name: "John Crypto",
  phone: "+1234567890",
  isVerified: true,
  twoFactorEnabled: false,
  createdAt: new Date().toISOString(),
};

const initialState: AuthState = {
  user: dummyUser,
  token: "dummy-jwt-token",
  isAuthenticated: false, // Start with false for auth flow
  isLoading: false,
  error: null,
  biometricEnabled: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
    registerSuccess: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    updateProfile: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    setBiometricEnabled: (state, action: PayloadAction<boolean>) => {
      state.biometricEnabled = action.payload;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  registerSuccess,
  updateProfile,
  setBiometricEnabled,
} = authSlice.actions;

export default authSlice.reducer;
