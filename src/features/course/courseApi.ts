import apiSlice from "@features/apiSlice";

export const courseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCourse: builder.query({
      query: (code) => ({
        url: `/course/${code}/`,
      }),
    }),
    getCourses: builder.query({
      query: () => ({
        url: "/courses/",
      }),
    }),
  }),
});

export const { useGetCoursesQuery, useGetCourseQuery } = courseApi;
