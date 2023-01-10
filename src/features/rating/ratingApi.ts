import apiSlice from "@features/apiSlice";

export const ratingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRating: builder.query({
      query: (id) => ({
        url: `/rating/${id}/`,
      }),
    }),
    getRatings: builder.query({
      query: () => ({
        url: "/ratings/",
      }),
    }),
  }),
});

export const { useGetRatingQuery, useGetRatingsQuery } = ratingApi;
