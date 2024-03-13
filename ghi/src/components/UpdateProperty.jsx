import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useGetPropertyByIdQuery, useUpdatePropertyMutation } from '../app/apiSlice'

const UpdateProperty = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: property, isLoading: loadingProperty, isError, error } = useGetPropertyByIdQuery(id);
    const [updateProperty, { isLoading: updatingProperty }] = useUpdatePropertyMutation();
    const [amenities, setAmenities] = useState(amenities)



    const [formData, setFormData] = useState({
        name: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        bedrooms: '',
        bathrooms: '',
        price: '',
        description: '',
        amenities: {
            ac: false,
            heating: false,
            washer_dryer: false,
            parking: false,
            beer: false,
            wifi: false,
            pets_allowed: false,
            pool: false,
        }

    })

    //Will get the data from property{}
    useEffect(() => {
        if (property) {
            setFormData({
                name: property.name,
                address: property.address.address,
                city: property.address.city,
                state: property.address.state,
                zip: property.address.zip,
                bedrooms: property.bedrooms,
                bathrooms: property.bathrooms,
                price: property.price,
                description: property.description,
                amenities: property.amenities || formData.amenities,
            });
        }
    }, [property]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setFormData(prevFormData => ({
                ...prevFormData,
                amenities: {
                    ...prevFormData.amenities,
                    [name]: checked,
                },
            }));
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

     const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateProperty({ id, ...formData }).unwrap();
            alert('Property updated successfully!');
            navigate(`/properties/${id}`);
        } catch (error) {
            console.error('Error updating property:', error);
        }
    };

    if (loadingProperty) {
        return <div>Loading...</div>
    }

    if (!property) {
        return <div>property not found</div>
    }

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
                        disabled={updatePropertyLoading}
                    //onClick={handleSubmit}
                    >
                        Update Property
                    </button>
                </div>
            </form>
        </div>
    )
}


export default UpdateProperty
