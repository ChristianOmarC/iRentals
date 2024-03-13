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
                <button type="submit" disabled={updateLoading}>
                    {updateLoading ? 'Updating...' : 'Update Reservation'}
                </button>
            </form>
        </div>
    )
}

export default UpdateReservation
