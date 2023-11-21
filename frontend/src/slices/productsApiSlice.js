import { PRODUCT_URL } from "../constants";
import { apiSlice } from './apiSlice';

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => ({
                url: PRODUCT_URL,
            }),
            providesTags: ['Products'],
            keepUnusedDataFor: 5
        }),
        getProductDetails: builder.query({
            query: (productId) => ({
                url: `${PRODUCT_URL}/${productId}`
            }),
            keepUnusedDataFor: 5
        }),
        createProduct: builder.mutation({
            query: () => ({
                url: PRODUCT_URL,
                method: 'POST'
            }),
            invalidatesTags: ['Product'],
        }),
        updateProduct: builder.mutation({
            query: (data) => ({
                body: data,
                method: 'PUT',
                url: `${PRODUCT_URL}/${data.productId}`,
            }),
            invalidatesTags: ['Products'],
        }),
        uploadProductImage: builder.mutation({
            query: (data) => ({
                url: `${UPLOAD_URL}`,
                body: data,
                method: 'POST'
            })
        })
    }),
});

export const { 
    useCreateProductMutation,
    useGetProductDetailsQuery,
    useGetProductsQuery,
    useUpdateProductMutation,
    useUploadProductImageMutation,
 } = productsApiSlice;