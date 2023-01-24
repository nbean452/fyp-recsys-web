import { Filter, Pagination } from "@constants/types";
import apiSlice from "@features/apiSlice";

export const courseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCourse: builder.query({
      query: (code) => ({
        url: `/course/${code}/`,
      }),
    }),
    getCourseRecommendations: builder.query({
      query: (code) => ({
        url: `/recommend/course/${code}/`,
      }),
    }),
    getCourses: builder.query({
      providesTags: (result) =>
        result
          ? [
              ...result.results.map(({ code }: { code: string }) => ({
                code,
                type: "Course" as const,
              })),
            ]
          : ["Course"],
      query: ({
        limit = 25,
        offset = 0,
        filter = "",
      }: Pagination & Filter) => ({
        url: `/courses/?limit=${limit}&offset=${offset}&filter=${filter}`,
      }),
    }),
  }),
});

export const {
  useGetCourseRecommendationsQuery,
  useGetCoursesQuery,
  useGetCourseQuery,
} = courseApi;
