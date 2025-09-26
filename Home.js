import React from "react";
import "../App.css";

function Home() {
  return (
    <div>
      <div className="hero">
        <h1>Find Your Dream Flat or PG</h1>
      </div>

      <div className="search-bar">
        <input type="text" placeholder="Location" />
        <select>
          <option>Flat</option>
          <option>PG</option>
        </select>
        <button>Search</button>
      </div>

      <div className="property-list">
        <div className="property-card">
          <img src="https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg" alt="Kothrud Pune" />
          <h3>Kothrud, Pune</h3>
          <p>₹8,000/month<br />1BHK Flat<br />9876543210</p>
        </div>

        <div className="property-card">
          <img src="https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg" alt="Mumbai" />
          <h3>Andheri, Mumbai</h3>
          <p>₹13,000/month<br />2BHK Flat<br />8765432109</p>
        </div>

        <div className="property-card">
          <img src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg" alt="Bangalore" />
          <h3>Koramangala, Bangalore</h3>
          <p>₹6,500/month<br />Sharing PG<br />7654321098</p>
        </div>
      </div>
    </div>
  );
}

export default Home;