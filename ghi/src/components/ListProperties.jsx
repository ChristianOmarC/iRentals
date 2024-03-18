import { useSelector, useDispatch } from 'react-redux';
import PropertyCard from './PropertyCard';
import { setQuery } from '../app/querySlice';
import { useState } from 'react';
import propertyData from './data/propertyData'

const ListProperties = () => {
    const query = useSelector((state) => state.query.value);
    const dispatch = useDispatch();
    const [guestsFilter, setGuestsFilter] = useState('');
    const [cityFilter, setCityFilter] = useState('');
    const [stateFilter, setStateFilter] = useState('');

    const filteredData = () => {
        let filtered = propertyData;

        if (query) {
            filtered = filtered.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()));
        }

        if (guestsFilter) {
            filtered = filtered.filter((p) => p.bedrooms >= parseInt(guestsFilter)); // Assuming `guests` correlate to `bedrooms` or adjust accordingly
        }

        if (cityFilter) {
            filtered = filtered.filter((p) =>
                p.address.city.toLowerCase().includes(cityFilter.toLowerCase())
            );
        }

        if (stateFilter) {
            filtered = filtered.filter((p) =>
                p.address.state.toLowerCase().includes(stateFilter.toLowerCase())
            );
        }

        return filtered;
    };

    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-3xl font-bold mb-6">
                List of Properties{' '}
                {query && <small className="text-gray-500">({query})</small>}
            </h1>
            <div className="mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                        type="text"
                        placeholder="Search by property name"
                        className="border border-gray-300 rounded px-4 py-2"
                        value={query}
                        onChange={(e) => dispatch(setQuery(e.target.value))}
                    />
                    <input
                        type="number"
                        placeholder="# guests"
                        className="border border-gray-300 rounded px-4 py-2"
                        value={guestsFilter}
                        onChange={(e) => setGuestsFilter(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="City"
                        className="border border-gray-300 rounded px-4 py-2"
                        value={cityFilter}
                        onChange={(e) => setCityFilter(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="State"
                        className="border border-gray-300 rounded px-4 py-2"
                        value={stateFilter}
                        onChange={(e) => setStateFilter(e.target.value)}
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredData().length > 0 ? (
                    filteredData().map((property) => (
                        <PropertyCard key={property.name} property={property} /> // Use property.name as key assuming it's unique, or find another unique identifier
                    ))
                ) : (
                    <div>No properties found.</div>
                )}
            </div>
        </div>
    );
};

export default ListProperties;
