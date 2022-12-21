import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: "",
};

export const searchSlice = createSlice({
  initialState,
  name: "courseSearch",
  reducers: {
    clearSearch: () => initialState,
    setSearch: (state, action) => ({
      ...state,
      search: action.payload,
    }),
  },
});

export const { clearSearch, setSearch } = searchSlice.actions;

export default searchSlice.reducer;
