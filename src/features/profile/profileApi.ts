import apiSlice from "@features/apiSlice";

export const profileApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTakenCourse: builder.query({
      query: (username) => ({
        url: `/user/${username}/`,
      }),
    }),
    updateTakenCourse: builder.mutation({
      query: ({ username, ...body }) => ({
        body,
        method: "PUT",
        url: `user/courses/${username}/`,
      }),
    }),
  }),
});

export const { useGetTakenCourseQuery, useUpdateTakenCourseMutation } =
  profileApi;
