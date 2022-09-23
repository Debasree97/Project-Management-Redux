import { apiSlice } from "../api/apiSlice";

export const usersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => `/users`,
    }),

    getUser: builder.query({
      query: (email) => `/users?email=${email}`,
    }),
  }),
});

export const { useGetUserQuery,useGetUsersQuery } = usersApi;
