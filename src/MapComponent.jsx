import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { TextField } from '@mui/material';
import "leaflet/dist/leaflet.css";
import icon from "leaflet/dist/images/marker-icon.png";
import L from "leaflet";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
  });
  
  L.Marker.prototype.options.icon = DefaultIcon;
const MapComponent = () => {
    const [position, setPosition] = useState([28.26, 29.79]);

    const handleInputChange = (e) => {

        const lat = parseFloat(document.getElementById('lat-input').value);
        const lng = parseFloat(document.getElementById('lng-input').value);
        // console.log(lat + ", " + lng);
        setPosition([lat, lng]);
    };
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

    // const handleGoToCoordinates = (e) => {
    //     e.preventDefault()
    //     const lat = parseFloat(document.getElementById('lat-input').value);
    //     const lng = parseFloat(document.getElementById('lng-input').value);
    //     setPosition([lat, lng]);
    // };

    return (
        <div className='container'>
            <div className="row">
                <div className="col-md-9">
                    <MapContainer center={position} zoom={4} style={{ height: '400px', width: '100%'}}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        //   attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <LocationMarker />
                    </MapContainer>
                </div>
                <div className="col-md-3">
                    <div className='h-100'>
                        <form
                        className='d-flex flex-column h-100 justify-content-center'
                        //  onSubmit={handleGoToCoordinates}
                        >
                            {/* <input type="number" placeholder="Latitude" id="lat-input" required /> */}
                            <TextField
                                required
                                placeholder="Latitude"
                                id="lat-input"
                                label="Latitude"
                                type="number"
                                onChange={handleInputChange}
                                className='my-2'
                                defaultValue={position[0]}
                                value={position[0]}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            {/* <input type="number" placeholder="Longitude" id="lng-input" required /> */}
                            <TextField
                                required
                                placeholder="Longitude"
                                id="lng-input"
                                label="Longitude "
                                type="number"
                                onChange={handleInputChange}
                                className='my-2'
                                defaultValue={position[1]}
                                value={position[1]}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            {/* <button type='submit'>Go to Coordinates</button> */}
                        </form>
                    </div>
                </div>


            </div>

        </div>
    );
};

export default MapComponent;
