import React, { useMemo, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Alert, Button, MenuItem, Select, TextField } from '@mui/material';
import "leaflet/dist/leaflet.css";
import icon from "leaflet/dist/images/marker-icon.png";
import L from "leaflet";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { toast } from 'react-toastify';
import countryList from 'react-select-country-list';
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
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

    const [Country, setCountry] = useState('EG');

    const options = useMemo(() => countryList().getData(), [])
    // console.log(options);
    const handleCountryChange = (event) => {
        setCountry(event.target.value);
    };
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
    const handleSubmit = (e) => {
        e.preventDefault()
        if (Error) {
            toast.error("Please enter the Coordinates in this format: 00° 00' 00.00", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return
        }
        toast.success("Form submitted successfully!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
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

            <Alert sx={{ display: Error ? '' : 'none' }} className='mb-3' severity="error"><h4>Please enter the Coordinates in this format: <span>00° 00' 00.00"</span></h4></Alert>
            <form
                className='d-flex flex-column h-100 justify-content-center'
                onSubmit={handleSubmit}
            >
                <div className="row">
                    <div className="col-md-7 d-flex flex-column justify-content-center">
                        <div className="row">
                            <div className="col-6">
                                <TextField
                                    required
                                    placeholder="Latitude"
                                    id="lat-input"
                                    label="Latitude"
                                    type="text"
                                    fullWidth
                                    onChange={handleInputChange}
                                    className='my-2'
                                    defaultValue={decimalDegreesToDMS(position[0])}
                                    // value={decimalDegreesToDMS(position[0])}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </div>
                            <div className="col-6">
                                <TextField
                                    required
                                    placeholder="Longitude"
                                    id="lng-input"
                                    label="Longitude "
                                    type="text"
                                    fullWidth
                                    onChange={handleInputChange}
                                    className='my-2'
                                    defaultValue={decimalDegreesToDMS(position[1])}
                                    // value={decimalDegreesToDMS(position[1])}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </div>
                        </div>
                        <div className='rounded-4 overflow-hidden'>
                            <MapContainer center={position} zoom={4} style={{ height: '400px', width: '100%' }}>
                                <TileLayer
                                    // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png"
                                //   attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                />
                                <LocationMarker />
                            </MapContainer>
                        </div>
                    </div>
                    <div className="col-md-5">
                        <div className='mt-2'>
                            <div className="myScroll">
                                <div className="text-start row">
                                    <h6>Personal info</h6>
                                    <div className="col-6">
                                        <TextField
                                            required
                                            fullWidth
                                            type='text'
                                            placeholder="FirstName"
                                            id="FirstName"
                                            label="First Name"
                                        />
                                    </div>
                                    <div className="col-6">
                                        <TextField
                                            required
                                            fullWidth
                                            type='text'
                                            placeholder="SecondName"
                                            id="SecondName"
                                            label="Second Name"
                                        />
                                    </div>
                                    <div className="col-12 my-2">
                                        <TextField
                                            required
                                            fullWidth
                                            type='tel'
                                            placeholder="Phone"
                                            id="Phone"
                                            label="Phone no."
                                        />
                                    </div>
                                    <div className="col-12">
                                        <TextField
                                            required
                                            fullWidth
                                            type='email'
                                            placeholder="email"
                                            id="email"
                                            label="email"
                                        />
                                    </div>
                                    <h6 className='my-1'>Address</h6>
                                    <div className="col-12">
                                        <TextField
                                            required
                                            fullWidth
                                            type='text'
                                            placeholder="Street Address"
                                            id="StreetAddress"
                                            label="Street Address"
                                            className='mb-1'
                                        />
                                    </div>
                                    <div className="col-12">
                                        <TextField
                                            required
                                            fullWidth
                                            type='text'
                                            placeholder="Street Address Line 2"
                                            id="StreetAddress2"
                                            label="Street Address Line 2"
                                            className='mb-1'
                                        />
                                    </div>
                                    <div className="col-6">
                                        <TextField
                                            required
                                            fullWidth
                                            type='tel'
                                            placeholder="City"
                                            id="City"
                                            label="City"
                                        />
                                    </div>
                                    <div className="col-6">
                                        <TextField
                                            required
                                            fullWidth
                                            type='text'
                                            placeholder="Region"
                                            id="Region"
                                            label="Region"
                                        />
                                    </div>
                                    <div className="col-6 mt-1">
                                        <TextField
                                            required
                                            fullWidth
                                            type='text'
                                            placeholder="Postal"
                                            id="Postal"
                                            label="Postal / Zip code"
                                        />
                                    </div>
                                    <div className="col-6 mt-1">
                                        <Select
                                            labelId="Country"
                                            id="Country"
                                            value={Country}
                                            onChange={handleCountryChange}
                                            label="Country"
                                            fullWidth
                                        >
                                            {options.map((opt)=>(
                                                <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                                            ))}
                                            
                                        </Select>
                                    </div>
                                </div>
                            </div>



                            <Button color='secondary' fullWidth className='my-2 mb-3' variant='outlined' type='submit'>Submit</Button>
                            {/* <button type='submit'>Go to Coordinates</button> */}
                        </div>
                    </div>



                </div>
            </form>
        </div>
    );
};

export default MapComponent;
