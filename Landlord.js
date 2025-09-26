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

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("name", formData.name);
    form.append("phone", formData.phone);
    form.append("address", formData.address);
    form.append("location_link", formData.location_link); // ✅ Google Maps link
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
      alert(data);
    } catch (error) {
      console.error(error);
      alert("Oops! Something went wrong.");
    }
  };

  return (
    <div className="form-container">
      <h2>Post Your Property</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Flat Name" onChange={handleChange} required />
        <input type="text" name="phone" placeholder="Phone" onChange={handleChange} required />
        <input type="text" name="address" placeholder="Address" onChange={handleChange} required />
        <input type="text" name="location_link" placeholder="Google Maps Location Link" onChange={handleChange} required />
        <input type="number" name="rent" placeholder="Rent" onChange={handleChange} required />
        <input type="text" name="facilities" placeholder="Facilities" onChange={handleChange} required />
        <input type="file" name="image" onChange={handleChange} required />
        <button type="submit">Post Property</button>
      </form>
    </div>
  );
}

export default Landlord;
