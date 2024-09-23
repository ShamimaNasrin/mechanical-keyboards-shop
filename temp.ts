import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the base API configuration
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/products",
  }),
  tagTypes: ["Products", "FilterProducts", "Product"],
  endpoints: (builder) => ({
    // Mutation to add a new product
    addProduct: builder.mutation({
      query: (productData) => ({
        url: "/",
        method: "POST",
        body: productData,
      }),
      invalidatesTags: ["Products"],
    }),

    // Query to fetch all products
    fetchAllProducts: builder.query({
      query: () => ({
        url: "/",
        method: "GET",
      }),
      providesTags: ["Products"],
    }),

    // Query to fetch products with filters applied
    fetchFilteredProducts: builder.query({
      query: (filterParams) => {
        const searchParams = new URLSearchParams();
        if (filterParams?.search)
          searchParams.append("search", filterParams.search);
        if (filterParams?.sortBy)
          searchParams.append("sortBy", filterParams.sortBy);
        if (filterParams?.minPrice)
          searchParams.append("minPrice", filterParams.minPrice);
        if (filterParams?.maxPrice)
          searchParams.append("maxPrice", filterParams.maxPrice);

        return {
          url: "/",
          method: "GET",
          params: searchParams,
        };
      },
      providesTags: ["FilterProducts"],
    }),

    // Query to get a product by ID
    fetchProductById: builder.query({
      query: (productId) => ({
        url: `/${productId}`,
        method: "GET",
      }),
      providesTags: ["Product"],
    }),

    // Mutation to update an existing product
    updateProduct: builder.mutation({
      query: ({ productId, updatedData }) => ({
        url: `/${productId}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: ["Products", "FilterProducts", "Product"],
    }),

    // Mutation to delete a product by ID
    removeProduct: builder.mutation({
      query: (productId) => ({
        url: `/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products", "FilterProducts", "Product"],
    }),
  }),
});

// Export hooks for API endpoints
export const {
  useFetchAllProductsQuery,
  useFetchFilteredProductsQuery,
  useFetchProductByIdQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useRemoveProductMutation,
} = baseApi;
