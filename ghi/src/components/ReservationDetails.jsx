
import React from 'react'
import { useGetReservationByIdQuery } from '../app/apiSlice'
import { useParams } from 'react-router-dom'

const ReservationDetail = () => {
    const { id } = useParams()
    const {
        data: property,
        isLoading,
        isSuccess,
    } = useGetPropertyByIdQuery(id)

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (!isSuccess) {
        return <div>Failed to fetch property details</div>
    }

    return (
        <div>
            <h1>{property.name}</h1>
            <p>{property.description}</p>
            <p>Price: ${property.price}</p>
            <p>Bedrooms: {property.bedrooms}</p>
            <p>Bathrooms: {property.bathrooms}</p>
            <p>
                Address: {property.address.address}, {property.address.city},{' '}
                {property.address.state} {property.address.zip}
            </p>
            <h2>Amenities</h2>
            <ul>
                {Object.entries(property.amenities).map(([key, value]) => (
                    <li key={key}>
                        {key}: {value ? 'Yes' : 'No'}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ReservationDetail
