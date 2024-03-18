// Geocoder.jsx

import React, { useEffect } from 'react';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import 'mapbox-gl/dist/mapbox-gl.css'


export const TOKEN = import.meta.env.VITE_MAPBOX_TOKEN; // Assuming you're using Vite and have your token in an .env file

const Geocoder = ({ setViewport, mapRef }) => {
    useEffect(() => {
        if (!mapRef.current) return; // mapRef is not assigned yet

        const geocoder = new MapboxGeocoder({
            accessToken: TOKEN,
            mapboxgl: mapRef.current.getMap(),
            marker: false,
            collapsed: true,
        });

        geocoder.on('result', (event) => {
            setViewport({
                ...mapRef.current.getViewport(),
                longitude: event.result.geometry.coordinates[0],
                latitude: event.result.geometry.coordinates[1],
                zoom: 14,
                transitionDuration: 5000
            });
        });

        mapRef.current.getMap().addControl(geocoder, 'top-left');

        return () => {
            if (mapRef.current) {
                mapRef.current.getMap().removeControl(geocoder);
            }
        };
    }, [setViewport, mapRef]);

    return null;
};

export default Geocoder;
