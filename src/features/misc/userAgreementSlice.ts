import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  agreed: true,
};

export const userAgreementSlice = createSlice({
  initialState,
  name: "userAgreement",
  reducers: {
    clearUserAgreement: () => initialState,
    setUserAgreement: (state, action) => ({
      ...state,
      agreed: action.payload,
    }),
  },
});

export const { clearUserAgreement, setUserAgreement } =
  userAgreementSlice.actions;

export default userAgreementSlice.reducer;
