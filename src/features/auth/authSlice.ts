import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dateJoined: null,
  email: "",
  firstName: "",
  id: 0,
  isActive: null,
  isStaff: null,
  isSuperuser: null,
  lastLogin: null,
  lastName: "",
  takenCourse: [],
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
    setAuth: (state, action) => ({
      ...state,
      ...action.payload,
    }),
  },
});

export const { logOut, setAuth } = authSlice.actions;

export default authSlice.reducer;
