import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { setAuth, logOut } from "@features/auth/authSlice";
import { error } from "@utils/notification";

const getBaseUrl = () => {
  if (process.env.NODE_ENV === "production")
    return process.env.NEXT_PUBLIC_PROD_URL;
  if (process.env.NEXT_PUBLIC_IS_DOCKERIZED === "true")
    return "http://api.localhost";
  return "http://localhost:9000";
};

const baseQuery = fetchBaseQuery({
  baseUrl: getBaseUrl(),
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
      api.dispatch(setAuth({ token: { ...refreshResult.data } }));
      // retry the original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      error("Error", "Logged out from account");
      api.dispatch(logOut());
    }
  }
  return result;
};

const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  keepUnusedDataFor: 60,
  tagTypes: ["Course", "Auth", "Rating"],
});

export default apiSlice;
