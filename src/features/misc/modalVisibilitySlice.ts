import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginVisible: false,
  registerVisible: false,
};

export const modalVisibilitySlice = createSlice({
  initialState,
  name: "modalVisibility",
  reducers: {
    clearModalVisibility: () => initialState,
    setLoginModalVisibility: (state, action) => ({
      ...state,
      loginVisible: action.payload,
    }),
    setRegisterModalVisibility: (state, action) => ({
      ...state,
      registerVisible: action.payload,
    }),
  },
});

export const {
  clearModalVisibility,
  setLoginModalVisibility,
  setRegisterModalVisibility,
} = modalVisibilitySlice.actions;

export default modalVisibilitySlice.reducer;
