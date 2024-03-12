import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import {
    useGetReservationByIdQuery,
    useUpdateReservationMutation,
} from '../app/apiSlice'

const UpdateReservation = () => {
    const { reservationId } = useParams()
    const { data: reservation, isLoading: reservationLoading } =
        useGetReservationByIdQuery(reservationId)
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

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await updateReservation({ id: reservationId, ...formData })
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
        <div>
            <h1>Update Reservation</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="reservation_name">Reservation Name</label>
                    <input
                        type="text"
                        id="reservation_name"
                        name="reservation_name"
                        value={formData.reservation_name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="checkin">Check-in</label>
                    <input
                        type="text"
                        id="checkin"
                        name="checkin"
                        value={formData.checkin}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="checkout">Check-out</label>
                    <input
                        type="text"
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
