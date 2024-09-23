import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// base API configuration
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://mechanical-keyboards-server.vercel.app/api/products",
  }),
  tagTypes: ["Products", "Product", "filteredItem"],
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

    // Query to get a product by ID
    fetchSingleProductById: builder.query({
      query: (productId) => ({
        url: `/${productId}`,
        method: "GET",
      }),
      providesTags: ["Product"],
    }),

    // Mutation to delete a product by ID
    removeProduct: builder.mutation({
      query: (productId) => ({
        url: `/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products", "Product", "filteredItem"],
    }),

    // Query to fetch products with filters applied
    fetchFilteredItems: builder.query({
      query: (filterParams) => {
        const searchParams = new URLSearchParams();
        if (filterParams?.search)
          searchParams.append("search", filterParams.search);
        if (filterParams?.minPrice)
          searchParams.append("minPrice", filterParams.minPrice);
        if (filterParams?.maxPrice)
          searchParams.append("maxPrice", filterParams.maxPrice);
        if (filterParams?.sortBy)
          searchParams.append("sortBy", filterParams.sortBy);

        return {
          url: "/",
          method: "GET",
          params: searchParams,
        };
      },
      providesTags: ["filteredItem"],
    }),

    // Mutation to update an existing product
    updateProduct: builder.mutation({
      query: ({ productId, data }) => ({
        url: `/${productId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Products", "Product", "filteredItem"],
    }),
  }),
});

// Export hooks for API endpoints
export const {
  useFetchAllProductsQuery,
  useFetchFilteredItemsQuery,
  useFetchSingleProductByIdQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useRemoveProductMutation,
} = baseApi;
