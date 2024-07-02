import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "@/types/auth";

interface AuthState {
  user: IUser | null;
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
