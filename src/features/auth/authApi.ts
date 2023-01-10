import apiSlice from "@features/apiSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
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

export const { useLoginMutation } = authApi;
