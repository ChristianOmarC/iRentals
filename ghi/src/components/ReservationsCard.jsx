import React from 'react'
import { Link } from 'react-router-dom'
import { useGetPropertyByIdQuery } from '../app/apiSlice'
const ReservationCard = ({ reservation }) => {

    const { id, checkin, checkout, reservation_name, property_id } =
        reservation
    const { data: property, isLoading, isSuccess, isError } = useGetPropertyByIdQuery(property_id)
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
            <div className="px-6 py-4">
                <Link to={`/reservations/${id}`}>
                    <div className="font-bold text-xl mb-2">
                        {reservation_name}
                    </div>
                </Link>
            </div>
            <div className="px-6 py-4">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                    Check In: {checkin}
                </span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                    Check Out: {checkout}
                </span>
            </div>
            <div className="px-3 py-1">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                    {isSuccess && (
                        <div>
                            Name: {property.name}
                            {property.address && (
                                <p>Address: {property.address.address}, {property.address.city}, {property.address.state}, {property.address.zip}</p>
                            )}
                        </div>
                    )}

                </span>

            </div>
        </div>
    )
}
export default ReservationCard
