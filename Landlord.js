import React, { useState } from "react";

function Landlord() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    location_link: "",
    rent: "",
    facilities: "",
    image: null
  });
  const [error, setError] = useState(""); // for validation errors
  const [success, setSuccess] = useState(""); // for success message

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Phone number validation: must be 10 digits
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      setError("Please enter a valid 10-digit mobile number");
      setSuccess("");
      return;
    }

    setError(""); // clear previous errors

    const form = new FormData();
    form.append("name", formData.name);
    form.append("phone", formData.phone);
    form.append("address", formData.address);
    form.append("location_link", formData.location_link);
    form.append("rent", formData.rent);
    form.append("facilities", formData.facilities);
    form.append("image", formData.image);

    try {
      const response = await fetch("http://localhost:5000/landlord", {
        method: "POST",
        body: form,
        credentials: "include"
      });

      const data = await response.text(); // backend returns plain text
      if (response.ok) {
        setSuccess(data); // show success message
        // clear form after submission
        setFormData({
          name: "",
          phone: "",
          address: "",
          location_link: "",
          rent: "",
          facilities: "",
          image: null
        });
      } else {
        setError(data || "Oops! Something went wrong.");
        setSuccess("");
      }
    } catch (error) {
      console.error(error);
      setError("Oops! Something went wrong.");
      setSuccess("");
    }
  };

  return (
    <div className="form-container">
      <h2>Post Your Property</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Owner Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="location_link"
          placeholder="Google Maps Location Link"
          value={formData.location_link}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="rent"
          placeholder="Rent"
          value={formData.rent}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="facilities"
          placeholder="Facilities (e.g., 1BHK, 2BHK, Sharing PG)"
          value={formData.facilities}
          onChange={handleChange}
          required
        />
        <input
          type="file"
          name="image"
          onChange={handleChange}
          required
        />
        <button type="submit">Post Property</button>
      </form>
    </div>
  );
}

export default Landlord;

