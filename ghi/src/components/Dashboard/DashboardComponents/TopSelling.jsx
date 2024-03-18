import { useState, useEffect } from 'react';
import CardFilter from './CardFilter';
import TopSellingItem from './TopSellingItem';
import './topSelling.css';

function TopSelling() {
    const [items, setItems] = useState([]);
    const [filter, setFilter] = useState('Today');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const handleFilterChange = (filter) => {
        setFilter(filter);
    };

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:4000/topselling');
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setItems(data);
        } catch (e) {
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="card top-selling overflow-auto">
            <CardFilter filterChange={handleFilterChange} />

            <div className="card-body pb-0">
                <h5 className="card-title">
                    Top Selling <span>| {filter}</span>
                </h5>

                <table className="table table-borderless">
                    <thead className="table-light">
                        <tr>
                            <th scope="col">Preview</th>
                            <th scope="col">Product</th>
                            <th scope="col">Price</th>
                            <th scope="col">Sold</th>
                            <th scope="col">Revenue</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(item => <TopSellingItem key={item._id} item={item} />)}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TopSelling;
