import React from 'react'
import { useState } from 'react'
import { useCreateReservationMutation } from '../app/apiSlice'

const CreateReservation = () => {
    const [checkin, setCheckin ] = useState('')
    const [checkout, setCheckout ] = useState('')
    const [reservation_name, setReservationName ] = useState('')
    const [property_id, setPropertyId] =  useState('')
    const [guest_id, setGuestId] = useState('')

    const [addReservation, { isLoading, isSuccess, isError, error }] =
        useCreateReservationMutation()



    const handleSubmit = async (event) => {
        event.preventDefault()
        const reservationData = {
            checkin,
            checkout,
            reservation_name,
            property_id,
            guest_id,
        }
        console.log(reservationData)
        //setGuestId(self.account_id)
        try {
            await addReservation(reservationData).unwrap()
            alert('Reservation added successfully')
            // Reset form if needed
        } catch (error) {
            console.error('Failed to add reservation: ', error)
            alert('Failed to add reservation')
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
                        htmlFor="reservation_name"
                    >
                        Reservation Name
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="reservation_name"
                        type="text"
                        placeholder="Reservation Name"
                        value={reservation_name}
                        onChange={(e) => setReservationName(e.target.value)}
                    />
                </div>
                    <div>
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="checkin"
                        >
                            Check In
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="checkin"
                            required type="date"
                            placeholder="Check In"
                            value={checkin}
                            onChange={(e) => setCheckin(e.target.value)}
                        />
                    </div>
                    <div>
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="checkout"
                        >
                            Check Out
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="checkout"
                            required type="date"
                            placeholder="Check Out"
                            value={checkout}
                            onChange={(e) => setCheckout(e.target.value)}
                        />
                    </div>
                    <div>
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="property_id"
                        >
                            Property
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="property_id"
                            type="text"
                            placeholder="property_id"
                            value={property_id}
                            onChange={(e) => setPropertyId(e.target.value)}
                        />
                    </div>
                    <div>
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="guest_id"
                        >
                            Guest ID
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="guest_id"
                            type="text"
                            placeholder="guest_id"
                            value={guest_id}
                            onChange={(e) => setGuestId(e.target.value)}
                        />
                    </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                        disabled={isLoading}
                    >
                        Add Reservation
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CreateReservation
