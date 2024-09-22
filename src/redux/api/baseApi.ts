import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/products",
  }),
  tagTypes: ["Products", "filterProducts", "Product"],
  endpoints: (builder) => ({
    // add new product
    addProduct: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: `/`,
          body: data,
        };
      },
      invalidatesTags: ["Products"],
    }),

    // get all product
    getProduct: builder.query({
      query: () => ({
        method: "GET",
        url: "/",
      }),
      providesTags: ["Products"],
    }),

    getFilterProduct: builder.query({
      query: (query) => {
        const params = new URLSearchParams();
        if (query?.search) {
          params.append("search", query.search);
        }
        if (query?.sortBy) {
          params.append("sortBy", query.sortBy);
        }
        if (query?.minPrice) {
          params.append("minPrice", query.minPrice);
        }
        if (query?.maxPrice) {
          params.append("maxPrice", query.maxPrice);
        }

        return {
          url: `/`,
          method: "GET",
          params,
        };
      },
      providesTags: ["filterProducts"],
    }),

    // Get Product By Id
    getProductById: builder.query({
      query: (productId) => ({
        url: `/${productId}`,
        method: "GET",
      }),
      providesTags: ["Product"],
    }),

    // update a product
    updateProduct: builder.mutation({
      query: ({ data, productId }) => {
        return {
          method: "PUT",
          url: `/${productId}`,
          body: data,
        };
      },
      invalidatesTags: ["Products", "filterProducts", "Product"],
    }),

    // delete a product
    deleteProduct: builder.mutation({
      query: (productId) => {
        return {
          method: "DELETE",
          url: `/${productId}`,
        };
      },
      invalidatesTags: ["Products", "filterProducts", "Product"],
    }),
  }),
});

export const {
  useGetProductQuery,
  useUpdateProductMutation,
  useAddProductMutation,
  useDeleteProductMutation,
  useGetFilterProductQuery,
  useGetProductByIdQuery,
} = baseApi;
