import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { setCredentials, logOut } from "@features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl:
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_PROD_URL
      : process.env.NEXT_PUBLIC_DEV_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const { access } = (getState() as any).auth.token;
    if (access) {
      headers.set("Authorization", `Bearer ${access}`);
      headers.set("Content-type", "application/json; charset=UTF-8");
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    // send refresh token to get new access token
    const refreshResult = await baseQuery(
      {
        body: {
          refresh: api.getState().auth.token.refresh,
        },
        method: "POST",
        url: "/auth/refresh/",
      },
      api,
      extraOptions,
    );
    if (refreshResult?.data) {
      // store the new token
      api.dispatch(setCredentials({ token: { ...refreshResult.data } }));
      // retry the original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }
  return result;
};

const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  keepUnusedDataFor: 60,
  tagTypes: ["Auth", "Course", "Rating"],
});

export default apiSlice;
