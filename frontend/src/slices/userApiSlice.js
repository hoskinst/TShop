import { USER_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                body: data,
                method: 'POST',
                url: `${USER_URL}/auth`,
            }),
        }),
        logout: builder.mutation({
            method: 'POST',
            url: `${USER_URL}/logout`
        }),
        register: builder.mutation({
            query: (data) => ({
                body: data,
                method: 'POST',
                url: USER_URL,
            })
        }),
        profile: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/profile`,
                method: 'PUT',
                body: data,
            })
        }),
        getUsers: builder.query({
            query: () => ({
                url: USER_URL
            }),
            keepUnusedDataFor: 5,
            provideTags: ['Users'],
        }),
        deleteUser: builder.mutation({
            query: (userId) => ({
                method: 'DELETE',
                url: `${USER_URL}/${userId}`
            })
        }),
        getUserDetails: builder.query({
            query: (userId) => ({
                url: `${USER_URL}/${userId}`,
            }),
            keepUnusedDataFor: 5,
        }),
        updateUser: builder.mutation({
            query: ({ data }) => ({
                body: data,
                method: 'PUT',
                url: `${USER_URL}/${data._id}`
            }),
            invalidatesTags: ['Users']
        })
    }),
});

export const { 
    useGetUserDetailsQuery,
    useGetUsersQuery, 
    useDeleteUserMutation, 
    useLoginMutation, 
    useLogoutMutation, 
    useRegisterMutation, 
    useProfileMutation,
    useUpdateUserMutation,
} = usersApiSlice;