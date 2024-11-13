import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { board as setBoard, signOutSuccess } from "./userSlice"

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  tagTypes: ["Boards", "Users"],
  endpoints: (builder) => ({
    // Boards Endpoints
    getBoards: builder.query({
      query: (userId) => `/boards/get/${userId}`,

      query: (userId) => {
        if (!userId) {
          console.warn("UserId is undefined, skipping API call.")
          return
        }
        return `/boards/get/${userId}`
      },

      transformResponse: (res) => res.boards,
      providesTags: [{ type: "Boards", id: "LIST" }],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setBoard(data))
        } catch (error) {
          console.error("Error fetching boards:", error)
          // Handle error (optional)
        }
      },
    }),

    createBoard: builder.mutation({
      query: (board) => ({
        url: "/boards/create",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: board,
      }),
      invalidatesTags: [{ type: "Boards", id: "LIST" }],
    }),

    updateBoard: builder.mutation({
      query: (updatedBoard) => ({
        url: `/boards/update/${updatedBoard.boardId}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: updatedBoard,
      }),
      invalidatesTags: [{ type: "Boards", id: "LIST" }],
    }),

    deleteBoard: builder.mutation({
      query: (boardId) => ({
        url: `/boards/delete/${boardId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Boards", id: "LIST" }],
    }),

    // Task Endpoints
    createTask: builder.mutation({
      query: (task) => ({
        url: "/task/create",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: task,
      }),
      invalidatesTags: [{ type: "Boards", id: "LIST" }],
    }),

    updateTask: builder.mutation({
      query: (task) => ({
        url: `task/updateSubtask/${task._id}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: task,
      }),
      invalidatesTags: [{ type: "Boards", id: "LIST" }],
    }),

    deleteTask: builder.mutation({
      query: (taskId) => ({
        url: `task/delete/${taskId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Boards", id: "LIST" }],
    }),

    // User Endpoints
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

    signOutUser: builder.mutation({
      query: () => ({
        url: "/auth/signout",
        method: "POST",
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          dispatch(signOutSuccess())
        } catch (error) {
          console.error("Error fetching boards:", error)
          // Handle error (optional)
        }
      },
    }),
  }),
})

export default api
