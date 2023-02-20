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
    updateReview: builder.mutation({
      query: ({ id, ...body }) => ({
        body,
        method: "PUT",
        url: `/review/update/${id}/`,
      }),
    }),
  }),
});

export const {
  useGetReviewQuery,
  useGetReviewsQuery,
  useUpdateReviewMutation,
  useCreateReviewMutation,
} = reviewApi;
