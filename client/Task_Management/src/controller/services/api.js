import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/",
  }),
  endpoints: (builder) => ({
    getBoards: builder.query({
      query: () => "data.json",
    }),
    // getBoard: builder.query({
    //   query: (boardName) => "data.json",
    //   transformResponse: (response) => {
    //     const boards = response.boards || [] // Adjust based on your data structure
    //     return boards.find((board) => board.name === boardName) || null
    //   },
    // }),
  }),
})

export default api

// getProductById: builder.query({
//   query: (id) => `/products/${id}`,
// }),

// addNewProduct: builder.mutation({
//   query: (newProduct) => ({
//     url: "/products/add",
//     method: "POST",
//     body: newProduct,
//   }),
// }),

// updateProduct: builder.mutation({
//   query: (updatedProduct) => ({
//     url: `/products/${updatedProduct.id}`,
//     method: "PUT",
//     body: updatedProduct,
//   }),
// }),

// deleteProduct: builder.mutation({
//   query: (id) => ({
//     url: `/products/${id}`,
//     method: "DELETE",
//   }),
// }),
