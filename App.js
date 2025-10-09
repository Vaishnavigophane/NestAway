import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Tenant from "./pages/Tenant";
import Landlord from "./pages/Landlord";
import Profile from "./pages/Profile"; // Import Profile
import Navbar from "./components/Navbar";
import MyFlats from "./pages/MyFlats";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/tenant" element={<Tenant />} />
          <Route path="/landlord" element={<Landlord />} />
          <Route path="/myflats" element={<MyFlats />} />
          <Route path="/profile" element={<Profile />} /> {/* Profile page */}
        
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
