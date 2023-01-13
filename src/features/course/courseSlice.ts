import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  search: string;
}

const initialState: InitialState = {
  search: "",
};

export const courseSlice = createSlice({
  initialState,
  name: "course",
  reducers: {
    clearSearch: (state) => ({
      ...state,
      search: initialState.search,
    }),
    setSearch: (state, action) => ({
      ...state,
      search: action.payload,
    }),
  },
});

export const { clearSearch, setSearch } = courseSlice.actions;

export default courseSlice.reducer;
