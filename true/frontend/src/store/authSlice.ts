import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../lib/api";

interface AuthState {
  user: any | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

export const signIn = createAsyncThunk(
  "auth/signIn",
  async (creds: { username: string; password: string }) => {
    const res = await api.post("/auth/signin", creds);
    return res.data;
  }
);

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (data: { username: string; password: string; displayName: string }) => {
    const res = await api.post("/auth/signup", data);
    return res.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signOut: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.accessToken || action.payload.token;
        state.loading = false;
        state.error = null;
        if (typeof window !== "undefined") {
          localStorage.setItem("token", action.payload.accessToken || action.payload.token);
        }
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "Sign in failed";
      })
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.accessToken || action.payload.token;
        state.loading = false;
        state.error = null;
        if (typeof window !== "undefined") {
          localStorage.setItem("token", action.payload.accessToken || action.payload.token);
        }
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "Sign up failed";
      });
  },
});

export const { signOut } = authSlice.actions;
export default authSlice.reducer;
