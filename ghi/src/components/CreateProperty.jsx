import { useState } from 'react'
import { useCreatePropertyMutation } from '../app/apiSlice'

const CreatePropertyForm = () => {
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zip, setZip] = useState('')
    const [bedrooms, setBedrooms] = useState(0)
    const [bathrooms, setBathrooms] = useState(0)
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState('')
    const initialAmenities = {
        ac: false,
        heating: false,
        washer_dryer: false,
        parking: false,
        beer: false,
        wifi: false,
        pets_allowed: false,
        pool: false,
    }
    const [amenities, setAmenities] = useState(initialAmenities)

    const [addProperty, { isLoading, isSuccess, isError, error }] =
        useCreatePropertyMutation()

    const handleAmenityChange = (amenity) => {
        setAmenities((prevAmenities) => ({
            ...prevAmenities,
            [amenity]: !prevAmenities[amenity],
        }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const propertyData = {
            name,
            address: {
                address,
                city,
                state,
                zip,
            },
            bedrooms: parseInt(bedrooms, 10),
            bathrooms: parseInt(bathrooms, 10),
            price: parseFloat(price),
            description,
            amenities,
        }

        try {
            await addProperty(propertyData).unwrap()
            alert('Property added successfully')
            // Reset form if needed
        } catch (error) {
            console.error('Failed to add property: ', error)
            alert('Failed to add property')
        }
    }

    if (isLoading) return <div>Loading...</div>

    return (
        <div className="max-w-4xl mx-auto p-5">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            >
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="name"
                    >
                        Property Name
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name"
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="address"
                        >
                            Address
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="address"
                            type="text"
                            placeholder="Address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                    <div>
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="city"
                        >
                            City
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="city"
                            type="text"
                            placeholder="City"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </div>
                    <div>
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="state"
                        >
                            State
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="state"
                            type="text"
                            placeholder="State"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                        />
                    </div>
                    <div>
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="zip"
                        >
                            ZIP Code
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="zip"
                            type="text"
                            placeholder="ZIP Code"
                            value={zip}
                            onChange={(e) => setZip(e.target.value)}
                        />
                    </div>
                </div>
                <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="bedrooms"
                        >
                            Bedrooms
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="bedrooms"
                            type="number"
                            placeholder="Number of Bedrooms"
                            value={bedrooms}
                            onChange={(e) => setBedrooms(e.target.value)}
                        />
                    </div>
                    <div>
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="bathrooms"
                        >
                            Bathrooms
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="bathrooms"
                            type="number"
                            placeholder="Number of Bathrooms"
                            value={bathrooms}
                            onChange={(e) => setBathrooms(e.target.value)}
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="price"
                    >
                        Price
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="price"
                        type="number"
                        placeholder="Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="description"
                    >
                        Description
                    </label>
                    <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="description"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>
                <div className="mb-4">
                    <span className="block text-gray-700 text-sm font-bold mb-2">
                        Amenities
                    </span>
                    {Object.keys(initialAmenities).map((amenityKey) => (
                        <div key={amenityKey} className="mb-2">
                            <label className="flex items-center space-x-3">
                                <input
                                    type="checkbox"
                                    checked={amenities[amenityKey]}
                                    onChange={() =>
                                        handleAmenityChange(amenityKey)
                                    }
                                    className="form-checkbox h-5 w-5"
                                />
                                <span>
                                    {amenityKey
                                        .replace(/_/g, ' ')
                                        .toUpperCase()}
                                </span>
                            </label>
                        </div>
                    ))}
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                        disabled={isLoading}
                    >
                        Add Property
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CreatePropertyForm
