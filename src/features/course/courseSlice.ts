import { createSlice } from "@reduxjs/toolkit";

import { CourseWithRating } from "@constants/types";

interface InitialState {
  course: CourseWithRating | {};
  courses: CourseWithRating[];
  search: string;
  totalCourses: number;
}

const initialState: InitialState = {
  course: {},
  courses: [],
  search: "",
  totalCourses: 0,
};

export const courseSlice = createSlice({
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
      ...action.payload,
    }),
    setSearch: (state, action) => ({
      ...state,
      search: action.payload,
    }),
  },
});

export const { clearCourse, clearSearch, setCourses, setSearch } =
  courseSlice.actions;

export default courseSlice.reducer;
