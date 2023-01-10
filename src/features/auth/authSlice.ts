import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  firstName: "",
  id: null,
  lastName: "",
  token: {
    access: null,
    refresh: null,
  },
  username: "",
};

export const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    logOut: () => initialState,
    setCredentials: (state, action) => ({
      ...state,
      ...action.payload,
    }),
  },
});

export const { logOut, setCredentials } = authSlice.actions;

export default authSlice.reducer;
