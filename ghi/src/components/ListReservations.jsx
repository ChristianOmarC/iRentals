// import React from 'react'
// import { useGetAllReservationsQuery } from '../app/apiSlice'
// import ReservationCard from './ReservationsCard'
// import reservationData from './data/reservationData'

// const ListReservations = () => {
//     const { data: reservations, isLoading, isSuccess, isError, error } = useGetAllReservationsQuery()

//     if (isLoading) {
//         return <div>Loading...</div>
//     }

//     if (isError) {
//         return <div>Error: {error.message}</div>
//     }

//     // if (!isSuccess || !reservations || reservations.length === 0) {
//     //     return <div>No reservations found</div>
//     // }

//     if (!reservationData || reservationData.length === 0) {
//         return <div>No Reservations Found</div>
//     }

//     return (
//         <div className="container mx-auto py-8">
//             <h1 className="text-3xl font-bold mb-6">List of Reservations</h1>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {reservationData.map((reservation) => (
//                     <ReservationCard
//                         key={reservation.id}
//                         reservation={reservation}
//                     />
//                 ))}
//             </div>
//         </div>
//     )
// }


// export default ListReservations
import React from 'react'
import { useGetAllReservationsQuery } from '../app/apiSlice'
import ReservationCard from './ReservationsCard'

const ListReservations = () => {
    const { data: reservations, isLoading, isSuccess, isError, error } = useGetAllReservationsQuery()
    console.log(reservations)
    if (isLoading) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <div>Error: {error.message}</div>
    }

    if (!isSuccess || !reservations || reservations.length === 0) {
        return <div>No reservations found</div>
    }

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-6">List of Reservations</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {reservations.reservations.map((reservation) => (
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
