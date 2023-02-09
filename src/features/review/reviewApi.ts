import { Pagination, Filter } from "@constants/types";
import apiSlice from "@features/apiSlice";

export const reviewApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createReview: builder.mutation({
      query: (body) => ({
        body,
        method: "POST",
        url: "/review/add/",
      }),
    }),
    getReview: builder.query({
      query: (id) => ({
        url: `/review/${id}/`,
      }),
    }),
    getReviews: builder.query({
      query: ({ limit, offset }: Pagination & Filter) => ({
        url: `/reviews/?limit=${limit}&offset=${offset}`,
      }),
    }),
  }),
});

export const {
  useGetReviewQuery,
  useGetReviewsQuery,
  useCreateReviewMutation,
} = reviewApi;
