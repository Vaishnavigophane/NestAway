

import React, { useState } from "react";
import "../App.css";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
      const response = await fetch("http://localhost:5000/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(formData),
  credentials: "include" // ✅ ensures session cookie is sent
});

      const data = await response.json();

      if (response.ok) {
        alert(data.message || "Login successful");

        // Save token for Navbar to detect login
        if (data.token) {
          localStorage.setItem("token", data.token);
        } else {
          // If backend doesn't send token, use a dummy token
          localStorage.setItem("token", "loggedin");
        }

        window.location.href = "/"; // redirect to home
      } else {
        alert(data.message || "Invalid username or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Error logging in");
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;


