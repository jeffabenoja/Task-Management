import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  tagTypes: ["Boards"], // Consistently define 'Boards' tag
  endpoints: (builder) => ({
    getBoards: builder.query({
      query: () => "/boards/get",
      transformResponse: (res) => res.boards, // Return the boards directly
      providesTags: (result) =>
        result ? [{ type: "Boards", id: "LIST" }] : ["Boards"], // Provide the 'Boards' tag for cache invalidation
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
      invalidatesTags: [{ type: "Boards", id: "LIST" }], // Invalidate 'Boards' to refetch the list
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
      invalidatesTags: [{ type: "Boards", id: "LIST" }], // Invalidate 'Boards' to refetch the list
    }),

    deleteBoard: builder.mutation({
      query: (boardId) => ({
        url: `/boards/delete/${boardId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Boards", id: "LIST" }], // Invalidate 'Boards' to refetch the list
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
      invalidatesTags: [{ type: "Boards", id: "LIST" }], // Invalidate 'Boards' to refetch the list
    }),

    updateSubtask: builder.mutation({
      query: (subtask) => ({
        url: `/task/updateSubtask/${subtask.id}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: subtask,
      }),
      async onQueryStarted({ id, subtasks }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled

          dispatch(
            api.util.updateQueryData("getBoards", undefined, (draft) => {
              const task = draft
                .flatMap(
                  (board) => board.columns.flatMap((col) => col.tasks) // Flatten all tasks from all columns
                )
                .find((task) => task._id === id) // Find the specific task by id

              if (task) {
                task.subtasks = subtasks // Update subtasks if the task is found
              }
            })
          )
        } catch (error) {
          console.error("Error updating subtask:", error)
        }
      },
    }),
  }),
})

export default api
