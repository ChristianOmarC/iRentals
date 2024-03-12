
import React from 'react'
import { useGetReservationByIdQuery, useGetPropertyByIdQuery } from '../app/apiSlice'
import { useParams } from 'react-router-dom'

const ReservationDetail = () => {
    const { id } = useParams()
    const {
        data: reservation,
        isLoading,
        isSuccess,
    } = useGetReservationByIdQuery(id)
    
// const PropertyDetails = () => {
//     const { id } = useParams()
//     const {
//         property_data: property,
//         isLoading,
//         isSuccess,
//     } = useGetPropertyByIdQuery(id)

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (!isSuccess) {
        return <div>Failed to fetch reservation details</div>
    }

    return (
        <div>
            <h1>{reservation.reservation_name}</h1>
            <p>Check-In: {reservation.checkin}</p>
            <p>Check-out: {reservation.checkout}</p>
            {/* <p>Property : {reservation.property_id.address}</p> */}
            {/* <p>
                Address: {property.address.address}, {property.address.city},{' '}
                {property.address.state} {property.address.zip}
            </p> */}
            {/* <h2>Amenities</h2>
            <ul>
                {Object.entries(property.amenities).map(([key, value]) => (
                    <li key={key}>
                        {key}: {value ? 'Yes' : 'No'}
                    </li>
                ))}
            </ul> */}
        </div>
    )
}

export default ReservationDetail
