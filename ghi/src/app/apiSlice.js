import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const iRentalApi = createApi({
  reducerPath: 'iRentalApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_HOST}`,
    credentials: 'include'
  }),
    endpoints: (builder) => ({
        getToken: builder.query({
            query: () => ({
                url: '/token',
            }),
            provideTags: ['Account']
        }),
        signup: builder.mutation({
            query : body => ({
                url: '/api/accounts',
                body,
                method: 'POST',
            }),
        }),
        login: builder.mutation({
            query: info => {
                let formData = null;
                if (info instanceof HTMLElement) {
                    formData = new FormData(info);
                } else {
                    formData = new FormData()
                    formData.append('username', info.username)
                    formData.append('password', info.password)
                }
                return {
                    url: '/token',
                    body: formData,
                    method: 'POST',
                    credentials: 'include',
                };
            },
            invalidateTags: result => {
                return (result && ['Account']) || [];
            },
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/token',
                method: 'DELETE',
            }),
            invalidateTags: ['Account']
        }),
        getAllProperties: builder.query({
            query: () => '/api/properties',
        }),
  }),
});

export const {
    useGetTokenQuery,
    useSignupMutation,
    useLoginMutation,
    useLogoutMutation,
    useGetAllPropertiesQuery,

 } = iRentalApi;
