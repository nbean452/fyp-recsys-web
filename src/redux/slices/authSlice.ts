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
    logOut: () => initialState,
    setCredentials: (state, action) => ({
      ...state,
      ...action,
      //  const { username, token } = action.payload;
      //   state.token = token;
      //   state.username = username;
    }),
  },
});

export const { logOut, setCredentials } = authSlice.actions;

export default authSlice.reducer;
