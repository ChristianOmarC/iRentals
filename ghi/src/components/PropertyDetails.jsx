import React from 'react'
import { useGetPropertyByIdQuery, useDeletePropertyMutation} from '../app/apiSlice'
import { useParams, Link, useNavigate } from 'react-router-dom'

const PropertyDetails = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const { data: property, isLoading, isSuccess, isError } = useGetPropertyByIdQuery(id)
    const [deleteProperty, { isLoading: deleteLoading, isSuccess: deleteSuccess, isError: deleteError }] = useDeletePropertyMutation();

    const handleDeleteProperty = async () => {
        try {
            await deleteProperty(id).unwrap()
        } catch (error) {
            console.error('Error deleting property:', error)
        }
    }
    if (isLoading) {
        return <div className="text-center">Loading...</div>
    }

    if (isError) {
        return <div className="text-center text-red-500">Failed to fetch property details</div>
    }

    if (!property) {
        return <div className="text-center text-gray-500">Property not found</div>
    }

    return (
        <div className="container mx-auto py-8">
            <div className="mb-8">
                <Link to="/properties" className="text-blue-500 hover:underline">
                    &larr; Back to Properties
                </Link>

            </div>

            <div className="bg-white shadow-md rounded-lg p-6">
                {property.image && (
                    <img src={property.image} alt={property.name} className="w-full h-64 object-cover mb-4" />
                )}
                <h1 className="text-3xl font-bold mb-4">{property.name}</h1>
                <p className="text-gray-600 mb-4">{property.description}</p>
                <div className="mb-4">
                    <p className="text-lg font-bold">Price: ${property.price}</p>
                    <p>Bedrooms: {property.bedrooms}</p>
                    <p>Bathrooms: {property.bathrooms}</p>
                </div>
                <div className="mb-4">
                    <p>
                        Address: {property.address.address}, {property.address.city},{' '}
                        {property.address.state} {property.address.zip}
                    </p>
                </div>
                <div>
                    <h2 className="text-2xl font-bold mb-2">Amenities</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {Object.entries(property.amenities).map(([key, value]) => (
                            <div key={key} className="flex items-center">
                                <span className="mr-2">{key}:</span>
                                <span className={`inline-block ${value ? 'bg-green-500' : 'bg-red-500'} rounded-full px-2 py-1 text-xs font-bold text-white`}>
                                    {value ? 'Yes' : 'No'}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mt-8">
                    <Link
                        to={`/createreservation`}
                        className="bg-green-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    >
                        Make a Reservation
                    </Link>
                    <Link
                        to={`/properties/${id}/update`}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    >
                        Update Property
                    </Link>
                    <button
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                        onClick={handleDeleteProperty}
                        disabled={deleteLoading}
                    >
                        {deleteLoading ? 'Deleting...' : 'Delete'}
                    </button>
                    {deleteSuccess && (
                        <div className="mt-4 text-green-500">
                            Property deleted successfully
                        </div>
                    )}
                    {deleteError && (
                        <div className="mt-4 text-red-500">
                            Error deleting property. Please try again.
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default PropertyDetails
