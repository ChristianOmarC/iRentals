import React from 'react';
import { useGetReservationByIdQuery, useDeleteReservationMutation, useGetPropertyByIdQuery, useGetTokenQuery } from '../app/apiSlice';
import { useParams, Link, useNavigate } from 'react-router-dom';

const ReservationDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const {
        data: reservation,
        isLoading: reservationLoading,
        isSuccess: reservationSuccess,
        isError: reservationError,
        error: reservationErrorDetails,
    } = useGetReservationByIdQuery(id);

    const [deleteReservation, { isLoading: deleteLoading, isSuccess: deleteSuccess, isError: deleteError }] = useDeleteReservationMutation();

    const { data: account, isLoading: accountLoading } = useGetTokenQuery();

    const propertyId = reservation?.property_id;
    const {
        data: property,
        isLoading: propertyLoading,
        isSuccess: propertySuccess,
        isError: propertyError,
    } = useGetPropertyByIdQuery(propertyId, { skip: !propertyId });

    const handleDeleteReservation = async () => {
        try {
            await deleteReservation(id).unwrap();
            alert('Reservation deleted successfully');
            navigate('/reservations');
        } catch (error) {
            console.error('Error deleting reservation:', error);
        }
    };

    if (reservationLoading || accountLoading || propertyLoading) {
        return <div>Loading...</div>;
    }

    if (reservationError) {
        return <div>Error: {reservationErrorDetails.message}</div>;
    }

    if (!reservationSuccess || !reservation) {
        return <div>Reservation not found</div>;
    }

    if (deleteSuccess) {
        navigate('/reservations');
    }

    const user = account?.account;

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-4">{reservation.reservation_name}</h1>
            <p className="mb-2">Check-In: {reservation.checkin}</p>
            <p className="mb-2">Check-out: {reservation.checkout}</p>
            {propertySuccess && property && (
                <>
                    <p className="mb-4">Property: {property.name}</p>
                    <p>Address: {property.address.address}, {property.address.city}, {property.address.state}, {property.address.zip}</p>
                    <p>{property.bedrooms} Bedrooms, {property.bathrooms} Bathrooms</p>
                    <p>Price: ${property.price}</p>
                    <p>Description: {property.description}</p>
                    <ul><h3 className="font-bold mb-2">Amenities</h3>
                        {Object.entries(property.amenities).map(([amenity, available]) => (
                            available && <li key={amenity}>Has: {amenity}</li>
                        ))}
                    </ul>
                    <img src={property.image} alt={property.name} />
                </>
            )}
            {propertyError && <p>Error loading property details.</p>}

            {user?.id === reservation.account_id && (
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
                        {deleteLoading ? 'Cancelling...' : 'Cancel Reservation'}
                    </button>
                </div>
            )}
            {deleteError && (
                <div className="mt-4 text-red-500">
                    Error cancelling reservation. Please try again.
                </div>
            )}
        </div>
    );
};

export default ReservationDetail;
