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
            providesTags: ['Account'],
        }),
        signup: builder.mutation({
            query: (body) => ({
                url: '/api/accounts',
                body,
                method: 'POST',
            }),
            invalidatesTags: ['Account']
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
            invalidatesTags: (result) => {
                return (result && ['Account']) || []
            },
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/token',
                method: 'DELETE',
            }),
            invalidatesTags: ['Account']
        }),
        getAllProperties: builder.query({
            query: () => '/api/properties',
            providesTags: (id) => [{ type: 'Property', id: id },'Property', 'Account'],
        }),
        getPropertyById: builder.query({
            query: (id) => `/api/properties/${id}`,
            providesTags: (id) => [{ type: 'Property', id: id }, 'Property', 'Account'],
        }),
        updateProperty: builder.mutation({
            query(data) {
            const { id, ...body } = data 
            return {
                url: `/api/properties/${id}`,
                method: 'PUT',
                body,
            }
        },
            invalidatesTags: ({result, error, id }) => [{ type: 'Property', id }, 'Account'],
        }),
        deleteProperty: builder.mutation({
        query: (id) => ({
            url: `/api/properties/${id}`,
            method: 'DELETE',
        }),
        invalidatesTags: (id) => [{ type: 'Property', id: id },'Property', 'Account'],
        }),
        createProperty: builder.mutation({
            query: (body) => ({
                url: `/api/properties`,
                body,
                method: 'POST',
            }),
            invalidatesTags:['Property']
        }),
        getAllReservations: builder.query({
            query: () => '/api/reservations',
            providesTags: (id) => [{ type: 'Reservation', id: id },'Reservation', 'Account'],
        }),
        getReservationById: builder.query({
            query: (id) => `/api/reservations/${id}`,
            providesTags: (id) => [{ type: 'Reservation', id: id }, 'Account'],
        }),
        updateReservation: builder.mutation({
            query(data) {
            const { id, ...body } = data 
            return {
                url: `/api/reservations/${id}`,
                method: 'PUT',
                body,
            }
        },
            invalidatesTags: ({result, error, id}) => [{ type: 'Reservation', id }, 'Account'],
        }),
        deleteReservation: builder.mutation({
            query: (id) =>({
            url: `/api/reservations/${id}`,
            method: 'DELETE',
            }),
            invalidatesTags: (id) => [{ type: 'Reservation', id: id },'Reservation', 'Account'],
        }),
        createReservation: builder.mutation({
            query: (body) => ({
                url: `/api/reservations`,
                body,
                method: 'POST',
            }),
            invalidatesTags:['Reservation', 'Account']
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
    useGetReservationByIdQuery,
    useUpdateReservationMutation,
    useDeleteReservationMutation,
    useDeletePropertyMutation,
} = iRentalApi