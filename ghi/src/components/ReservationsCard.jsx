import React from 'react'
import { Link, Route, useNavigate } from 'react-router-dom' // added route


const ReservationCard = ({ reservation }) => {
    const {
        checkin,
        checkout,
        reservation_name,
        property_id,
        guest_id,
    } = reservation

    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
            <div className="px-6 py-4">
                <Link to={`/reservations/${id}`}>
                    <div className="font-bold text-xl mb-2">{reservation_name}</div>
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
                    Reservation Name: {reservation_name}
                </span>
            </div>
        </div>
    )
}

export default ReservationCard
