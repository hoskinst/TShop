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
                url: `${USER_URL}/register`,
            })
        }),
        profile: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/profile`,
                method: 'PUT',
                body: data,
            })
        })
    }),
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useProfileMutation } = usersApiSlice;