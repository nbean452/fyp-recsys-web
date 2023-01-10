import apiSlice from "@features/apiSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (username) => ({
        url: `/users/${username}`,
      }),
    }),
    getUsers: builder.query({
      query: () => ({
        url: "/users/",
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        body: { ...credentials },
        method: "POST",
        url: "/auth/login/",
      }),
    }),
    register: builder.mutation({
      query: (credentials) => ({
        body: { ...credentials },
        method: "POST",
        url: "/auth/register/",
      }),
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetUsersQuery,
  useLoginMutation,
  useRegisterMutation,
} = authApi;
