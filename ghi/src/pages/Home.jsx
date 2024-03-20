import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { useGetTokenQuery } from '../app/apiSlice'
import condoImage from '../assets/condo.png'

const Home = () => {
    const { data: account, isLoading } = useGetTokenQuery()
    const testimonials = [
        {
            id: 1,
            name: 'John Doe',
            comment: 'Great experience renting through iRentals. The process was smooth and the property was exactly as described.',
            rating: 4.5,
        },
        {
            id: 2,
            name: 'Jane Smith',
            comment: 'I highly recommend iRentals for finding the perfect rental property. The website is user-friendly and the customer support is excellent.',
            rating: 5,
        },
    ];

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            if (i < rating) {
                stars.push(<FaStar key={i} className="text-yellow-500" />);
            } else {
                stars.push(<FaStar key={i} className="text-gray-300" />);
            }
        }
        return stars;
    };

    return (
        <div>
            {/* Hero section with image and call to action */}
            <section className="flex items-center justify-between bg-green-500">
                <div className="p-10 text-white">
                    <h1 className="text-5xl font-bold">Only Adventures</h1>
                    <p className="my-4">We will have text here</p>
                    <Link to="/properties" className="inline-block bg-white text-green-800 px-5 py-3 rounded shadow">
                        Search for Properties
                    </Link>
                </div>
                <div className="w-1/2 h-auto bg-contain bg-no-repeat bg-right-top" style={{ backgroundImage: `url(${condoImage})` }}></div>
            </section>

            {/* Features section */}
            <section className="container mx-auto py-8">
                {/* Replace with actual feature components */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Feature 1 */}
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold mb-2">Explore Properties</h2>
                        <p className="mb-4">Browse through our extensive collection...</p>
                        <Link to="/properties" className="text-indigo-600 hover:underline">View Properties</Link>
                    </div>
                    {/* Feature 2 */}
                    {/* ... */}
                </div>
            </section>

            {/* Testimonials section */}
            <section className="bg-gray-100 py-8">
                <div className="container mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-6">Testimonials</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {testimonials.map((testimonial) => (
                            <div key={testimonial.id} className="bg-white rounded-lg shadow-md p-6">
                                <p className="mb-4">{testimonial.comment}</p>
                                <div className="flex items-center">
                                    {renderStars(testimonial.rating)}
                                    <span className="ml-2 font-bold">{testimonial.name}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;