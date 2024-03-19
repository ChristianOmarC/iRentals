import React, { useState } from 'react';
import './dashboard.css';
import Cards from "./Cards";
import Reports from './Reports';
import RecentSales from './RecentSales';
import TopSelling from './TopSelling';
import RecentActivity from './RecentActivity';
import News from './News';
import CalendarCard from "./CalendarCard";
import Map from "./Map/Map";
// import Button from '@material-ui/core/Button';
import Button from '@mui/material/Button';

import CardFilter from "./CardFilter"; // Import the CardFilter component

function Dashboard() {
    // Initialize viewport state for the Map component
    const [viewport, setViewport] = useState({
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 8,
        width: "100%",
        height: "400px",
    });

    const [isCalendarExpanded, setIsCalendarExpanded] = useState(false);
    const handleExpandToggle = () => {
        setIsCalendarExpanded(!isCalendarExpanded)
    }

    // Handler function to update the viewport state based on the selected filter
    const handleFilterChange = (filterType) => {
        // Example: Adjust the viewport based on filter selection
        if (filterType === 'Today') {
            setViewport({ ...viewport, zoom: 10 });
        } else if (filterType === 'This Month') {
            setViewport({ ...viewport, zoom: 12 });
        } else if (filterType === 'This Year') {
            setViewport({ ...viewport, zoom: 14 });
        }
    };

    return (
        <section className="section dashboard">
            <div className="row">
                <div className="col-lg-8">
                    <div className="row">
                        <Cards />
                        <div className="col-12">
                            <Reports />
                        </div>
                        <div className="col-12">
                            <RecentSales />
                        </div>
                        <div className="col-12">
                            {/* <Calendar /> */}
                        </div>
                        <div className="col-12">
                            <TopSelling />
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <CardFilter filterChange={handleFilterChange} /> {/* Place CardFilter above or wherever suitable */}
                    <Map viewport={viewport} setViewport={setViewport} /> {/* Ensure the Map component can accept and utilize these props */}
                    <div className="calendar-card-spacing">
                        <Button onClick={handleExpandToggle} variant="contained">
                            {isCalendarExpanded ? 'Shrink Calendar' : 'Expand Calendar'}
                        </Button>

                        <CalendarCard toggleExpand={handleExpandToggle} isExpanded={isCalendarExpanded} />
                    </div>


                </div>
            </div>
        </section>
    );
}

export default Dashboard;
