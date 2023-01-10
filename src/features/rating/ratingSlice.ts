import { createSlice } from "@reduxjs/toolkit";

import { BaseRating } from "@constants/types";

interface InitialState {
  rating: BaseRating | {};
  ratings: BaseRating[];
  totalRatings: number;
}

const initialState: InitialState = {
  rating: {},
  ratings: [],
  totalRatings: 0,
};

export const ratingSlice = createSlice({
  initialState,
  name: "rating",
  reducers: {
    clearRating: () => initialState,
    setRating: (state, action) => ({
      ...state,
      ...action.payload,
    }),
  },
});

export const { clearRating, setRating } = ratingSlice.actions;

export default ratingSlice.reducer;
