import { useSelector } from 'react-redux'
import { useGetAllPropertiesQuery } from '../app/apiSlice'
const PropertiesList = () => {
    const query = useSelector((state) => state.query.value)


    const { data, isLoading } = useGetAllPropertiesQuery()
    console.log(data)

    const filteredData = () => {
        if (query) return data.properties.filter(p => p.name.includes(query))
        return data.properties
    }

    if (isLoading) return <div>Loading...</div>

    return (
        <div className='row mt-3'>
            <h1 className='mt-3 mb-5'>
                List of Properties{' '}
                {query && <small className='text-body-secondary'>"{query}</small>}

            </h1>
            {/* {filteredData().map(p => <PropertyCard key={p.name} name={p.name} />)} */}
            
        </div>
        
    )
    
}

export default PropertiesList;



