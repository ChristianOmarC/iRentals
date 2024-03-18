import React from 'react'
import { Link } from 'react-router-dom'
import { FaStar } from 'react-icons/fa';

const PropertyCard = ({ property }) => {
    const {
        name,
        description,
        price,
        bedrooms,
        bathrooms,
        address,
        amenities,
        id,
        rating,
    } = property

    const renderStars = () => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            if (i < rating) {
                stars.push(<FaStar key={i} className="text-yellow-500" />);
            } else {
                stars.push(<FaStar key={i} className="text-gray-300" />);
            }
        }
        return stars;
    };

    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
            {property.image && (
                <img src={property.image} alt={name} className="w-full h-48 object-cover" />
            )}
            <div className="p-4">
                <Link to={`/properties/${id}`} className="block text-xl font-bold mb-2 hover:text-blue-500">
                    {name}
                </Link>
                <p className="text-gray-600 mb-4">{description.slice(0, 100)}...</p>
                <div className="mb-4">
                    <p className="font-bold">Price: ${price}</p>
                    <p>Bedrooms: {bedrooms}</p>
                    <p>Bathrooms: {bathrooms}</p>
                </div>
                <div className="mb-4">
                    <p>
                        Address: {address.city}, {address.state}
                    </p>
                </div>
                <div>
                    <h3 className="font-bold mb-2">Amenities</h3>
                    <div className="grid grid-cols-2 gap-2">
                        {Object.entries(amenities).map(([key, value]) => (
                            <div key={key} className="flex items-center">
                                <span className="mr-2">{key}:</span>
                                <span className={`inline-block ${value ? 'bg-green-500' : 'bg-red-500'} rounded-full px-2 py-1 text-xs font-bold text-white`}>
                                    {value ? 'Yes' : 'No'}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="px-6 py-4">
                <div className="flex items-center">
                    {renderStars()}
                    <span className="ml-2">{rating.toFixed(1)}</span>
                </div>
            </div>
        </div>
    )
}

export default PropertyCard
