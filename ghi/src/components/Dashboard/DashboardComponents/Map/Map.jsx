import React, { useRef, useState } from "react";
import ReactMapGL, { Layer, Marker, NavigationControl, Source } from "react-map-gl";
import MapBoxGeocoder from "@mapbox/mapbox-gl-geocoder";
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { Box } from "@mui/material";
import { TOKEN } from "./Geocoder";
import './map.css';

const Map = ({ setNewPlace, newPlace, polygonCord, layerColor, viewport, setViewport }) => {
    const mapRef = useRef();
    const geocoderContainerRef = useRef();
    const [geocoder, setGeocoder] = useState(null);


    const initializeGeocoder = () => {
        const newGeocoder = new MapBoxGeocoder({
            accessToken: TOKEN,
            mapboxgl: mapRef.current.getMap(),
            marker: false
        });

        newGeocoder.on('result', (e) => {
            setNewPlace({ lng: e.result.geometry.coordinates[0], lat: e.result.geometry.coordinates[1] });
            mapRef.current.flyTo({
                center: e.result.geometry.coordinates,
                zoom: 16
            });
        });

        setGeocoder(newGeocoder);
    };

    const handleMapLoad = () => {
        if (geocoder === null) {
            initializeGeocoder();
            geocoderContainerRef.current.appendChild(geocoder.onAdd(mapRef.current.getMap()));
        }
    };

    const handleMapClick = (event) => {
        const { lngLat } = event;
        setNewPlace({
            lng: lngLat.lng,
            lat: lngLat.lat,
        });
    };

    return (
        <Box
            sx={{
                width: '100%',
                height: 400,
                position: 'relative',
                '& .map-container': {
                    width: '100%',
                    height: '100%',
                },
            }}
        >

            <div className="map-container">

                <ReactMapGL
                    ref={mapRef}
                    mapboxAccessToken={TOKEN}
                    initialViewState={viewport}
                    onViewportChange={setViewport}
                    mapStyle="mapbox://styles/mapbox/streets-v11"
                    onLoad={handleMapLoad}
                    onDblClick={handleMapClick}
                    transitionDuration="200"
                >
                    {newPlace && (
                        <Marker
                            longitude={newPlace.lng}
                            latitude={newPlace.lat}
                        >
                            {/* You can customize your marker here */}
                            <div className="marker"></div>
                        </Marker>
                    )}
                    <NavigationControl position="bottom-right" />
                </ReactMapGL>
            </div>
        </Box>
    );
};

export default Map;
