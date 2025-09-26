import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

function Navbar() {
  return (
    <div className="navbar">
      <h2>FlatFinder</h2>
      <div>
        <Link to="/">Home</Link>
        <Link to="/tenant">Find PG/Flat</Link>
        <Link to="/landlord">Post Your Property</Link>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
}

export default Navbar;