import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const iRentalApi = createApi({
    reducerPath: 'iRentalApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_API_HOST}`,
        credentials: 'include',
    }),
    endpoints: (builder) => ({
        getToken: builder.query({
            query: () => ({
                url: '/token',
            }),
            provideTags: ['Account', 'Review'],
        }),
        signup: builder.mutation({
            query: (body) => ({
                url: '/api/accounts',
                body,
                method: 'POST',
            }),
        }),
        login: builder.mutation({
            query: (info) => {
                let formData = null
                if (info instanceof HTMLElement) {
                    formData = new FormData(info)
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
                }
            },
            invalidateTags: (result) => {
                return (result && ['Account']) || []
            },
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/token',
                method: 'DELETE',
            }),
            invalidateTags: ['Account'],
        }),
        getAllProperties: builder.query({
            query: () => '/api/properties',
        }),
        getPropertyById: builder.query({
            query: (id) => `/api/properties/${id}`,
            providesTags: (result, error, id) => [{ type: 'Property', id: id }],
        }),
        updateProperty: builder.mutation({
            query: ({ id, ...put }) => ({
                url: `/api/properties/${id}`,
                method: 'PUT',
                body: put,
            }),
        }),
        deleteProperty: builder.query({
            query: (id) => `/api/properties/${id}`,
            method: 'DELETE',
        }),
        createProperty: builder.mutation({
            query: (body) => ({
                url: `/api/properties`,
                body,
                method: 'POST',
            }),
        }),
        getAllReservations: builder.query({
            query: () => '/api/reservations',
        }),
        getReservationById: builder.query({
            query: (id) => `/api/reservations/${id}`,
            providesTags: (result, error, id) => [{ type: 'Reservation', id }],
        }),
        updateReservation: builder.query({
            query: ({ id, ...put }) => ({
                url: `/api/reservations/${id}`,
                method: 'PUT',
                body: put,
            }),
        }),
        deleteReservation: builder.query({
            query: (id) => `/api/reservations/${id}`,
            method: 'DELETE',
        }),
        createReservation: builder.mutation({
            query: (body) => ({
                url: `/api/reservations`,
                body,
                method: 'POST',
            }),
        }),
    }),
})

export const {
    useGetAllReservationsQuery,
    useGetPropertyByIdQuery,
    useGetTokenQuery,
    useUpdatePropertyMutation,
    useSignupMutation,
    useLoginMutation,
    useLogoutMutation,
    useGetAllPropertiesQuery,
    useCreatePropertyMutation,
    useCreateReservationMutation,

} = iRentalApi
