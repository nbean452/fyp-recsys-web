import { createSlice } from "@reduxjs/toolkit";

import { CourseWithRating, BaseInitialState } from "@constants/types";

interface InitialState extends BaseInitialState {
  course: CourseWithRating | {};
  courses: CourseWithRating[];
  totalCourses: number;
}

const initialState: InitialState = {
  course: {},
  courses: [],
  isActionLoading: false,
  isActionSuccess: false,
  isError: false,
  isLoading: false,
  search: "",
  totalCourses: 0,
};

export const searchSlice = createSlice({
  initialState,
  name: "course",
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
