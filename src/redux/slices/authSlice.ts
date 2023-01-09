import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  firstName: "",
  id: null,
  isLoading: false,
  lastName: "",
  token: {
    access: "",
    refresh: "",
  },
  username: "",
};

export const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    clearAuth: () => initialState,
    setAuth: (state, action) => ({
      ...state,
      ...action,
    }),
  },
});

export const { clearAuth, setAuth } = authSlice.actions;

export default authSlice.reducer;
