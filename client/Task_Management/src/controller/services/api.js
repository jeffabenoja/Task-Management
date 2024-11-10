import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  tagTypes: ["Boards"],
  endpoints: (builder) => ({
    getBoards: builder.query({
      query: () => "/boards/get",
      transformResponse: (res) => res.boards,
      providesTags: [{ type: "Boards", id: "LIST" }],
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

    // Task API
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
  }),
})

export default api
