import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Alert, TextField } from '@mui/material';
import "leaflet/dist/leaflet.css";
import icon from "leaflet/dist/images/marker-icon.png";
import L from "leaflet";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;
function decimalDegreesToDMS(decimal) {
    const degrees = Math.floor(decimal);
    const minutes = Math.floor((decimal - degrees) * 60);
    const seconds = ((decimal - degrees - (minutes / 60)) * 3600).toFixed(2);
    return `${degrees}° ${minutes}' ${seconds}"`;
}

// Utility function to convert DMS format to decimal degrees
// function DMStoDecimalDegrees(dms) {
//     const regex = /(\d+)°\s*(\d+)'?\s*(\d+\.?\d*)"?/;
//     const matches = dms.match(regex);
//     if (!matches) return null;

//     const degrees = parseFloat(matches[1]);
//     const minutes = parseFloat(matches[2]);
//     const seconds = parseFloat(matches[3]);

//     return degrees + (minutes / 60) + (seconds / 3600);
// }
const MapComponent = () => {
    const [position, setPosition] = useState([28.26, 29.79]);
    const [Error, setError] = useState(false)
    const handleInputChange = (e) => {
        e.preventDefault()
        const lat = parseFloat(document.getElementById('lat-input').value);
        const lng = parseFloat(document.getElementById('lng-input').value);

        const ParsedLAT = decimalDegreesToDMS(lat)
        const ParsedLNG = decimalDegreesToDMS(lng)
        const regex = /(\d+)°\s*(\d+)'?\s*(\d+\.?\d*)"?/;
        const lat_matches = ParsedLAT.match(regex);
        const lng_matches = ParsedLNG.match(regex);
        if (lat_matches && lng_matches) {
            // console.log(lat + ", " + lng);
            setError(false)
            setPosition([lat, lng]);
        } else {
            setError(true)
        }

    };
    const LocationMarker = () => {
        useMapEvents({
            click(e) {
                setPosition([e.latlng.lat, e.latlng.lng]);
                document.getElementById('lat-input').value = decimalDegreesToDMS(e.latlng.lat)
                document.getElementById('lng-input').value = decimalDegreesToDMS(e.latlng.lng)
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
            {/* <h2 className='alert alert-danger'>Please enter the Coordinates in this format: <br /> <span>00° 00' 00.00"</span></h2> */}

            <Alert sx={{opacity: Error? '100%':'0%'}} className='mb-3' severity="error"><h4>Please enter the Coordinates in this format: <span>00° 00' 00.00"</span></h4></Alert>
            <div className="row">
            <div className="col-md-4">
                    <div className='h-100'>
                        <form
                            className='d-flex flex-column h-100 justify-content-center'
                            onSubmit={handleInputChange}
                        >
                            {/* <input type="number" placeholder="Latitude" id="lat-input" required /> */}
                            <TextField
                                required
                                placeholder="Latitude"
                                id="lat-input"
                                label="Latitude"
                                type="text"
                                onChange={handleInputChange}
                                className='my-2'
                                defaultValue={decimalDegreesToDMS(position[0])}
                                // value={decimalDegreesToDMS(position[0])}
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
                                type="text"
                                onChange={handleInputChange}
                                className='my-2'
                                defaultValue={decimalDegreesToDMS(position[1])}
                                // value={decimalDegreesToDMS(position[1])}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            {/* <button type='submit'>Go to Coordinates</button> */}
                        </form>
                    </div>
                </div>
                <div className="col-md-8">
                    <MapContainer center={position} zoom={4} style={{ height: '400px', width: '100%' }}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        //   attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <LocationMarker />
                    </MapContainer>
                </div>
                


            </div>

        </div>
    );
};

export default MapComponent;
