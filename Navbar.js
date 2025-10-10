import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import axios from "axios";

function Navbar() {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const handleStorageChange = () => setToken(localStorage.getItem("token"));
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("http://127.0.0.1:5000/logout", {}, { withCredentials: true });
      localStorage.removeItem("token");
      setToken(null);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      localStorage.removeItem("token");
      setToken(null);
      navigate("/login");
    }
  };

  return (
    <div className="navbar">
      <h2>FlatFinder</h2>
      <div>
        <Link to="/">Home</Link>
        <Link to="/tenant">Find PG/Flat</Link>
        <Link to="/landlord">Post Your Property</Link>

        {!token && <Link to="/register">Register</Link>}
        {!token && <Link to="/login">Login</Link>}
        {token && <Link to="/myflats">My Flats</Link>}
        {token && <Link to="/profile">Profile</Link>}
        {token && (
          <button className="link-button" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
