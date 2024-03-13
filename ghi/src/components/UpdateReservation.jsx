import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import {
    useGetReservationByIdQuery,
    useUpdateReservationMutation,
} from '../app/apiSlice'

const UpdateReservation = () => {
    const { id } = useParams()
    const { data: reservation, isLoading: reservationLoading } =
        useGetReservationByIdQuery(id)
    const [updateReservation, { isLoading: updateLoading }] =
        useUpdateReservationMutation()

    const [formData, setFormData] = useState({
        checkin: '',
        checkout: '',
        reservation_name: '',

    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        try {
             updateReservation({ id: id, ...formData })
        } catch (error) {
            console.error('Error updating reservation:', error)
        }
    }

    if (reservationLoading) {
        return <div>Loading...</div>
    }

    if (!reservation) {
        return <div>Reservation not found</div>
    }

    return (
        <div className="max-w-4xl mx-auto p-5">
            <h1>Update Reservation</h1>
            <form onSubmit={handleSubmit}
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label htmlFor="checkin"
                        className="block text-gray-700 text-sm font-bold mb-2"
                    >
                        Check-in:
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="date"
                        id="checkin"
                        name="checkin"
                        value={formData.checkin}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="checkout"
                        className="block text-gray-700 text-sm font-bold mb-2"
                    >
                        Check-out:
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="date"
                        id="checkout"
                        name="checkout"
                        value={formData.checkout}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="reservation_name"
                        className="block text-gray-700 text-sm font-bold mb-2"
                    >
                        Reservation Name:
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        id="reservation_name"
                        name="reservation_name"
                        value={formData.reservation_name}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="property_id"
                        className="block text-gray-700 text-sm font-bold mb-2"
                    >
                        Property ID:
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        id="property_id"
                        name="property_id"
                        value={formData.property_id}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="account_id"
                        className="block text-gray-700 text-sm font-bold mb-2"
                    >
                        Account ID:
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        id="account_id"
                        name="account_id"
                        value={formData.account_id}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" disabled={updateLoading}>
                    {updateLoading ? 'Updating...' : 'Update Reservation'}
                </button>
            </form>
        </div>
    )
}

export default UpdateReservation
