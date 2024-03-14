import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="container mx-auto py-8">
            <h1 className="text-4xl font-bold mb-4">Welcome to iRentals</h1>
            <p className="text-lg mb-8">
                Discover your perfect rental property with iRentals. Whether you're looking for a cozy apartment, a spacious house, or a luxurious villa, we've got you covered.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white rounded-lg shadow-md p-6">
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

                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold mb-4">List Your Property</h2>
                    <p className="mb-4">
                        Have a property to rent out? List it on iRentals and reach a wide audience of potential tenants. Our user-friendly platform makes it easy to manage your listings.
                    </p>
                    <Link
                        to="/properties/create"
                        className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                    >
                        List a Property
                    </Link>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold mb-4">Manage Reservations</h2>
                    <p className="mb-4">
                        Keep track of your reservations and manage your rental bookings efficiently. View upcoming reservations, communicate with guests, and streamline your rental process.
                    </p>
                    <Link
                        to="/reservations"
                        className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
                    >
                        View Reservations
                    </Link>
                </div>
            </div>

            <div className="mt-12">
                <h2 className="text-3xl font-bold mb-4">Featured Properties</h2>
            </div>

            <div className="mt-12">
                <h2 className="text-3xl font-bold mb-4">Testimonials</h2>
            </div>
        </div>
    );
};

export default Home;
