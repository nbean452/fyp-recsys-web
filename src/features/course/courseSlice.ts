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
    clearCourse: () => initialState,
    clearSearch: (state) => ({
      ...state,
      search: initialState.search,
    }),
    setCourses: (state, action) => ({
      ...state,
      courses: action.payload,
    }),
    setSearch: (state, action) => ({
      ...state,
      search: action.payload,
    }),
  },
});

export const { clearCourse, clearSearch, setCourses, setSearch } =
  searchSlice.actions;

export default searchSlice.reducer;
