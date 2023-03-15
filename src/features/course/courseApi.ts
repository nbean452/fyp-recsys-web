import { Filter, Pagination } from "@constants/types";
import apiSlice from "@features/apiSlice";

export const courseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCBFRecommendations: builder.query({
      query: (code: string) => ({
        url: `/recommend/cbf/${code}/`,
      }),
    }),
    getCFRecommendations: builder.query({
      query: (id: number) => ({
        url: `/recommend/cf/${id}/`,
      }),
    }),
    getCourse: builder.query({
      query: (code: string) => ({
        url: `/course/${code}/`,
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
  useGetCBFRecommendationsQuery,
  useGetCFRecommendationsQuery,
  useGetCoursesQuery,
  useGetCourseQuery,
} = courseApi;
