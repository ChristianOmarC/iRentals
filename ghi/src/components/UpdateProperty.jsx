import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useGetPropertyByIdQuery, useGetTokenQuery, useUpdatePropertyMutation } from '../app/apiSlice'

const UpdateProperty = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: property, isLoading: loadingProperty, isError, error } = useGetPropertyByIdQuery(id);
    const [updateProperty, { isLoading: updatingProperty }] = useUpdatePropertyMutation();

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
        },
        image: '',
    });

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
                amenities: property.amenities,
                image: property.image,
            });
        }
    }, [property]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleAmenityChange = (amenityKey) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            amenities: {
                ...prevFormData.amenities,
                [amenityKey]: !prevFormData.amenities[amenityKey],
            },
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedPropertyData = {
                name: formData.name,
                address: {
                    address: formData.address,
                    city: formData.city,
                    state: formData.state,
                    zip: formData.zip,
                },
                bedrooms: parseInt(formData.bedrooms),
                bathrooms: parseFloat(formData.bathrooms),
                price: parseFloat(formData.price),
                description: formData.description,
                amenities: formData.amenities,
                image: formData.image,
            };

         await updateProperty({ id, ...updatedPropertyData });
            alert('Property updated successfully!');
            navigate(`/properties/${id}`);
        } catch (error) {
            console.error('Error updating property:', error);
        }
    };

    if (loadingProperty) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
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
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
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
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
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
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
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
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
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
                            name="zip"
                            value={formData.zip}
                            onChange={handleChange}
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
                            name="bedrooms"
                            value={formData.bedrooms}
                            onChange={handleChange}
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
                            name="bathrooms"
                            value={formData.bathrooms}
                            onChange={handleChange}
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
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
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
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <div className="mb-4">
                    <span className="block text-gray-700 text-sm font-bold mb-2">
                        Amenities
                    </span>
                    {Object.keys(formData.amenities).map((amenityKey) => (
                        <div key={amenityKey} className="mb-2">
                            <label className="flex items-center space-x-3">
                                <input
                                    type="checkbox"
                                    checked={formData.amenities[amenityKey]}
                                    onChange={() => handleAmenityChange(amenityKey)}
                                    className="form-checkbox h-5 w-5"
                                />
                                <span>
                                    {amenityKey.replace(/_/g, ' ').toUpperCase()}
                                </span>
                            </label>
                        </div>
                    ))}
                </div>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="image"
                    >
                        Image URL
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="image"
                        type="text"
                        placeholder="Image URL"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                        disabled={updatingProperty}
                    >
                        {updatingProperty ? 'Updating...' : 'Update Property'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default UpdateProperty;
