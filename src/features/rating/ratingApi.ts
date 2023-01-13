import { Pagination, Filter } from "@constants/types";
import apiSlice from "@features/apiSlice";

export const ratingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRating: builder.query({
      query: (id) => ({
        url: `/rating/${id}/`,
      }),
    }),
    getRatings: builder.query({
      query: ({ limit, offset }: Pagination & Filter) => ({
        url: `/ratings/?limit=${limit}&offset=${offset}`,
      }),
    }),
  }),
});

export const { useGetRatingQuery, useGetRatingsQuery } = ratingApi;
