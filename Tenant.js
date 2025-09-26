import React, { useEffect, useState } from "react";
import "../App.css";
import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";

function Tenant() {
  const [flats, setFlats] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/tenant", { credentials: "include" })
      .then(res => res.json())
      .then(data => setFlats(data.flats))
      .catch(err => console.error(err));
  }, []);

  const containerStyle = { width: '100%', height: '400px' };
  const center = flats.length ? { lat: parseFloat(flats[0].lat), lng: parseFloat(flats[0].lng) } : { lat: 19.0760, lng: 72.8777 };

  return (
    <div>
      <h2>Available Properties</h2>
      <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
          {flats.map(flat => (
            <Marker key={flat.id} position={{ lat: parseFloat(flat.lat), lng: parseFloat(flat.lng) }} />
          ))}
        </GoogleMap>
      </LoadScript>

      <div className="property-list">
        {flats.map(flat => (
          <div className="property-card" key={flat.id}>
            <img src={`http://localhost:5000/${flat.image_path}`} alt={flat.name} />
            <h3>{flat.name}</h3>
            <p>{flat.address}<br />₹{flat.rent}/month<br />{flat.facilities}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tenant;
