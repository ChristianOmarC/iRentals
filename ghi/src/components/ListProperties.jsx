import { useSelector } from 'react-redux'
import { useGetAllPropertiesQuery } from '../app/apiSlice'
import PropertyCard from './PropertyCard'

const ListProperties = () => {
    const query = useSelector((state) => state.query.value)
    const { data, isLoading } = useGetAllPropertiesQuery()

    const filteredData = () => {
        if (!data || !data.properties) return []
        if (query) return data.properties.filter((p) => p.name.includes(query))
        console.log(data)
        return data.properties
    }

    if (isLoading) return <div>Loading...</div>

    if (data && data.properties && data.properties.length > 0) {
        return (
            <div className="row mt-3">
                <h1 className="mt-3 mb-5">
                    List of Properties{' '}
                    {query && (
                        <small className="text-body-secondary">{`${query}`}</small>
                    )}
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredData().map((property) => (
                        <PropertyCard key={property.id} property={property} />
                    ))}
                </div>
            </div>
        )
    }

    return <div>Failed to fetch properties</div>
}

export default ListProperties
