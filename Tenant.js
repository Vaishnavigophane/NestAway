import React, { useEffect, useState } from "react";
import axios from "axios";

function Tenant() {
  const [flats, setFlats] = useState([]);
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [filteredFlats, setFilteredFlats] = useState([]);

  useEffect(() => {
    fetchFlats();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [location, type, flats]);

  const fetchFlats = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:5000/tenant");
      setFlats(res.data.flats || []);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch available flats");
    }
  };

  const applyFilters = () => {
    let result = [...flats];

    if (location.trim() !== "") {
      result = result.filter((flat) =>
        flat.address.toLowerCase().includes(location.toLowerCase())
      );
    }

    if (type.trim() !== "") {
      result = result.filter((flat) =>
        flat.facilities.toLowerCase().includes(type.toLowerCase())
      );
    }

    setFilteredFlats(result);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Dream Flat or PG</h2>

      {/* Filters */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">All Types</option>
          <option value="1BHK">1 BHK</option>
          <option value="2BHK">2 BHK</option>
          <option value="3BHK">3 BHK</option>
          <option value="Sharing PG">Sharing PG</option>
        </select>
        <button onClick={applyFilters}>Search</button>
      </div>

      {/* Property List */}
      {filteredFlats.length === 0 && <p>No flats available.</p>}
      <div className="property-list">
        {filteredFlats.map((flat) => (
          <div key={flat.id} className="property-card">
            {flat.image_path && (
              <img
                src={`http://127.0.0.1:5000/${flat.image_path}`}
                alt={flat.name}
              />
            )}
            <h3>{flat.name}</h3>
            <p>{flat.address}</p>
            <p>₹{flat.rent}</p>
            <p>{flat.facilities}</p>

            {/* Landlord Contact */}
            <p>Contact: {flat.contact || "N/A"}</p>

            {/* View Location Button */}
            {flat.location_link && (
              <a
                href={flat.location_link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  marginTop: "10px",
                  padding: "8px 12px",
                  backgroundColor: "#007bff",
                  color: "white",
                  borderRadius: "6px",
                  textDecoration: "none",
                  fontWeight: "500",
                }}
              >
                View Location
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tenant;
