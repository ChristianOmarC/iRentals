
import React from 'react'
import { useGetReservationByIdQuery, useDeleteReservationMutation, useGetTokenQuery } from '../app/apiSlice'
import { useParams, Link, useNavigate } from 'react-router-dom'

const ReservationDetail = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const {
        data: reservation,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetReservationByIdQuery(id)
    const [deleteReservation, { isLoading: deleteLoading, isSuccess: deleteSuccess, isError: deleteError }] = useDeleteReservationMutation();
    const { data: account, isLoading: accountLoading } = useGetTokenQuery()
    const handleDeleteReservation = async () => {
        try {
            await deleteReservation(id).unwrap()
        } catch (error) {
            console.error('Error deleting reservation:', error)
        }
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (accountLoading) {
        return <div className="text-center">Loading...</div>
    }

    if (deleteError) {
        return <div>Error: Could not cancel reservation </div>
    }

    if (!isSuccess || !reservation) {
        return <div>Reservation not found</div>
    }

    if (deleteSuccess) {
        return navigate('/reservations')
    }

    const user = account.account
    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-4">{reservation.reservation_name}</h1>
            <p className="mb-2">Check-In: {reservation.checkin}</p>
            <p className="mb-2">Check-out: {reservation.checkout}</p>
            <p className="mb-4">Property: {reservation.property_id}</p>
            {user.id === reservation.account_id && (
            <div className="flex gap-4">
                <Link
                    to={`/reservations/${id}/update`}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                    Update Reservation
                </Link>
                <button
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                    onClick={handleDeleteReservation}
                    disabled={deleteLoading}
                >
                    {deleteLoading ? 'Cancelling...' : 'Cancel'}
                </button>
            </div>)}
            {deleteSuccess && (
                <div className="mt-4 text-green-500">
                    Reservation cancelled successfully
                </div>
            )}
            {deleteError && (
                <div className="mt-4 text-red-500">
                    Error cancelling reservation. Please try again.
                </div>
            )}
        </div>
    )
}

export default ReservationDetail
