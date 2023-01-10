import apiSlice from "src/app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // addNewPost: builder.mutation({
    //   invalidatesTags: ["Post"],
    //   query: (payload) => ({
    //     body: payload,
    //     headers: {
    //       "Content-type": "application/json; charset=UTF-8",
    //     },
    //     method: "POST",
    //     url: "/posts",
    //   }),
    // }),
    login: builder.mutation({
      query: (credentials) => ({
        body: { ...credentials },
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        method: "POST",
        url: "/auth/login/",
      }),
    }),
  }),
});

export const { useLoginMutation } = authApiSlice;
