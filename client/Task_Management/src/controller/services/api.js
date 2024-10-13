import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/",
  }),
  tagTypes: ["Board"], // Keep the tag type consistent
  endpoints: (builder) => ({
    getBoards: builder.query({
      query: () => "data.json",
    }),

    getBoard: builder.query({
      query: (tab) => "data.json", // Accept tab as a parameter here
      transformResponse: (response, meta, tab) => {
        // Add tab as a parameter to transformResponse
        console.log(response.boards) // Log boards to debug
        const board = response.boards.find((b) => b.slug === tab) || null // Use tab correctly
        return board // Return the found board
      },
      providesTags: (result) =>
        result ? [{ type: "Board", id: result.slug }] : [], // Provide tag based on result
    }),
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
