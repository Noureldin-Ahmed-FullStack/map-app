import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = () => {
    const [position, setPosition] = useState([28.26, 29.79]);

    const LocationMarker = () => {
        useMapEvents({
            click(e) {
                setPosition([e.latlng.lat, e.latlng.lng]);
                console.log(`Clicked coordinates: ${e.latlng.lat}, ${e.latlng.lng}`);
            },
        });

        return position === null ? null : (
            <Marker position={position}></Marker>
        );
    };

    const handleGoToCoordinates = (e) => {
        e.preventDefault()
        const lat = parseFloat(document.getElementById('lat-input').value);
        const lng = parseFloat(document.getElementById('lng-input').value);
        setPosition([lat, lng]);
    };

    return (
        <>
            <MapContainer center={position} zoom={4} style={{ height: '400px', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                //   attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <LocationMarker />
            </MapContainer>
            <div>
                <form onSubmit={handleGoToCoordinates}>
                    <input type="number" placeholder="Latitude" id="lat-input" required />
                    <input type="number" placeholder="Longitude" id="lng-input" required />
                    <button type='submit'>Go to Coordinates</button>
                </form>
            </div>
        </>
    );
};

export default MapComponent;
