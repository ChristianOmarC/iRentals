import { useSelector } from 'react-redux'
import { useGetAllReservationsQuery } from '../app/apiSlice'
import ReservationCard from './ReservationsCard'
const ListReservations = () => {
    const query = useSelector((state) => state.query.value)
    const { data, isLoading } = useGetAllReservationsQuery()

    const filteredData = () => {
        if (!data || !data.reservations) return []
        if (query) return data.reservations.filter((r) => r.reservation_name.includes(query))
        console.log(data)
        return data.reservations
    }

    if (isLoading) return <div>Loading...</div>

    if (data && data.reservations && data.reservations.length > 0) {
        return (
            <div className="row mt-3">
                <h1 className="mt-3 mb-5">
                    List of Reservations{' '}
                    {query && (
                        <small className="text-body-secondary">{`${query}`}</small>
                    )}
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredData().map((reservations) => (
                        <ReservationCard key={reservations.id} reservations={reservations} />
                    ))}
                </div>
            </div>
        )
    }

    return <div>Failed to fetch reservations</div>
}

export default ListReservations
