import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { setCredentials, logOut } from "@features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl:
    process.env.REACT_APP_ENVIRONMENT === "PRODUCTION"
      ? "https://capstone-api.nbenedictcodes.com"
      : "http://localhost:9000",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const { token } = (getState() as any).auth;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 403) {
    console.log("sending refresh token");
    // send refresh token to get new access token
    const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);
    console.log("refreshResult:", refreshResult);
    if (refreshResult?.data) {
      const { user } = api.getState().auth;
      // store the new token
      api.dispatch(setCredentials({ ...refreshResult.data, user }));
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
  // eslint-disable-next-line no-unused-vars
  endpoints: (builder) => ({}),
});

export default apiSlice;
