
import React, {useState} from 'react'
import { useGetReservationByIdQuery, useDeleteReservationMutation } from '../app/apiSlice'
import { useParams, Link, useNavigate } from 'react-router-dom'

const ReservationDetail = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const {
        data: reservation,
        isLoading,
        isSuccess,
    } = useGetReservationByIdQuery(id)
const [deleteReservation, { isLoading: loading, isError: error}] = useDeleteReservationMutation();


    if (!deleteReservation) {
        alert('Failed to delete reservation')
    } else {
        alert('Reservation Deleted')
        navigate('/reservations')
    }
// const handleDeleteReservation = async () => {
//     //id.preventDefault()
//     try {
//       await deleteReservation(id);
//       console.log(id)
//     } catch (error) {
//       console.error('Error deleting reservation:', error);
//     }
//   };

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
            <p>Property : {reservation.property_id}</p>
            <Link to={`/reservations/${id}/update`}>
                Update Reservation
            </Link>
            <button
                className="btn btn-primary fw-bolder"
                onClick={() => deleteReservation(id)}>
                Delete
            </button>

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
