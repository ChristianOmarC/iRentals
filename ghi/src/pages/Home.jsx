import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div className="container mx-auto py-8">
            <h1 className="text-4xl font-bold mb-4">Welcome to iRentals</h1>
            <p className="text-lg mb-8">
                Discover your perfect rental property with iRentals. Whether you're looking for a cozy apartment, a spacious house, or a luxurious villa, we've got you covered.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <h2 className="text-2xl font-bold mb-4">Explore Properties</h2>
                <p className="mb-4">
                    Browse through our extensive collection of rental properties. Filter by location, price range, amenities, and more to find your ideal match.
                </p>
                <Link
                    to="/properties"
                    className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                    View Properties
                </Link>
            </div>


        </div>
    )
}

export default Home
