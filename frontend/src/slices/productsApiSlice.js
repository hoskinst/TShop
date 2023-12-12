import { PRODUCT_URL, UPLOAD_URL } from "../constants";
import { apiSlice } from './apiSlice';

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: ({ keyword, pageNumber }) => ({
                params: {
                    keyword, 
                    pageNumber
                 },
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
        }),
        deleteProduct: builder.mutation({
            query: (productId) => ({
                method: 'DELETE',
                url: `${PRODUCT_URL}/${productId}`,
            })
        }),
        createProductReview: builder.mutation({
            query: (data) => ({
                body: data,
                method: 'POST',
                url: `${PRODUCT_URL}/${data.productId}/reviews`
            }),
            invalidateTags: ['Product']
        })
    }),
});

export const { 
    useCreateProductMutation,
    useCreateProductReviewMutation,
    useGetProductDetailsQuery,
    useGetProductsQuery,
    useUpdateProductMutation,
    useUploadProductImageMutation,
    useDeleteProductMutation,
 } = productsApiSlice;