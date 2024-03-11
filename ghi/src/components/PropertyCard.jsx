import React from 'react'

const PropertyCard = ({ property }) => {
    const {
        name,
        description,
        price,
        bedrooms,
        bathrooms,
        address,
        amenities,
    } = property

    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{name}</div>
                <p className="text-gray-700 text-base">{description}</p>
            </div>
            <div className="px-6 py-4">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                    {bedrooms} Bedrooms
                </span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                    {bathrooms} Bathrooms
                </span>
            </div>
            <div className="px-6 py-4">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                    {address.address}, {address.city}, {address.state}{' '}
                    {address.zip}
                </span>
            </div>
            <div className="px-6 py-4">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                    ${price}
                </span>
            </div>
            <div className="px-6 py-4">
                <div className="font-bold text-lg mb-2">Amenities</div>
                <div className="flex flex-wrap">
                    {amenities.ac && (
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                            AC
                        </span>
                    )}
                    {amenities.heating && (
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                            Heating
                        </span>
                    )}
                    {amenities.washer_dryer && (
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                            Washer/Dryer
                        </span>
                    )}
                </div>
            </div>
        </div>
    )
}

export default PropertyCard
