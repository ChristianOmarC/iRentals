import React from 'react'
import { useGetAllReservationsQuery } from '../app/apiSlice'
import ReservationCard from './ReservationsCard'

const ListReservations = () => {
    const { data, isLoading, isSuccess } = useGetAllReservationsQuery()
    if (isLoading) {
        return <div>Loading...</div>
    }
    if (!isSuccess) {
        return <div>Failed to fetch reservations</div>
    }
    if (!data || !Array.isArray(data)) {
        return <div>No reservations found</div>
    }
    return (
        <div>
            <h1>List of Reservations</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.map((reservation) => (
                    <ReservationCard
                        key={reservation.id}
                        reservation={reservation}
                    />
                ))}
            </div>
        </div>
    )
}
export default ListReservations