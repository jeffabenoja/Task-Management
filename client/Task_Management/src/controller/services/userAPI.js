import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const userAPI = createApi({
  reducerPath: "user",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  endpoints: (builder) => ({
    newUser: builder.mutation({
      query: (user) => ({
        url: "/auth/register",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: user,
      }),
    }),
    signInUser: builder.mutation({
      query: (user) => ({
        url: "/auth/login",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: user,
      }),
    }),
  }),
})

export default userAPI
