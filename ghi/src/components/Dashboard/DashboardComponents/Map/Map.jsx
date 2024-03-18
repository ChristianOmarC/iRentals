import React, { useRef, useState, useEffect } from "react";
import ReactMapGL, { Marker, NavigationControl, Source, Layer } from "react-map-gl";
import { Box } from "@mui/material";
import Geocoder, { TOKEN } from "./Geocoder";
import 'mapbox-gl/dist/mapbox-gl.css'
import './map.css';

const Map = ({ setNewPlace, newPlace, viewport, setViewport, polygonCord, layerColor }) => {
    const mapRef = useRef();
    const [geojson, setGeojson] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Check if polygonCord data is available
        if (!polygonCord) {
            setError("Polygon data not available.");
            return;
        }

        // Construct GeoJSON object
        const geojsonData = {
            type: "Feature",
            geometry: {
                type: "Polygon",
                coordinates: [polygonCord],
            },
        };

        // Update state with GeoJSON data
        setGeojson(geojsonData);
        setError(null);
    }, [polygonCord]);

    // Handle click on map to add new place
    const handleAddClick = (e) => {
        setNewPlace({
            lat: e?.lngLat?.lat,
            lng: e?.lngLat?.lng,
        });
    };

    // Define layer styles
    const layerStyle = {
        id: "maine",
        type: "fill",
        source: "maine",
        layout: {},
        paint: {
            "fill-color": layerColor || "#0080ff",
            "fill-opacity": 0.5,
        },
    };

    const layerOutlineStyle = {
        id: "outline",
        type: "line",
        source: "maine",
        layout: {},
        paint: {
            "line-color": "#000",
            "line-width": 3,
        },
    };

    return (
        <Box sx={{ width: '100%', height: '400px', position: 'relative' }}>
            {error && <div>Error: {error}</div>}
            {/* <div className="geocoder-container"> */}
            <Geocoder setNewPlace={setNewPlace} mapRef={mapRef} />
            {/* </div> */}
            <div className="map-container">
                <ReactMapGL
                    ref={mapRef}
                    width="100%"
                    height="400px"
                    mapboxAccessToken={TOKEN}
                    initialViewState={viewport}
                    onViewportChange={nextViewport => setViewport(nextViewport)}
                    mapStyle="mapbox://styles/mapbox/streets-v11"
                    onDblClick={handleAddClick}
                    transitionDuration="200"
                    attributionControl={true}
                >
                    {geojson && (
                        <Source id="my-data" type="geojson" data={geojson}>
                            <Layer {...layerOutlineStyle} />
                            <Layer {...layerStyle} />
                        </Source>
                    )}
                    {newPlace && (
                        <Marker
                            latitude={newPlace.lat}
                            longitude={newPlace.lng}
                            draggable
                            onDragEnd={(e) => setNewPlace({ lng: e.lngLat.lng, lat: e.lngLat.lat })}
                        />
                    )}
                    <NavigationControl position="bottom-right" />
                </ReactMapGL>
            </div>
        </Box>
    );
};

export default Map;
