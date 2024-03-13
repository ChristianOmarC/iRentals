import React from 'react'
import { Link } from 'react-router-dom'

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
  } = property

    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
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
    </div>
  )
}

export default PropertyCard
