import { Filter, Pagination } from "@constants/types";
import apiSlice from "@features/apiSlice";

export const courseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCourse: builder.query({
      query: (code) => ({
        url: `/course/${code}/`,
      }),
    }),
    getCourses: builder.query({
      query: ({ limit, offset }: Pagination & Filter) => ({
        url: `/courses/?limit=${limit}&offset=${offset}`,
      }),
    }),
  }),
});

export const { useGetCoursesQuery, useGetCourseQuery } = courseApi;
