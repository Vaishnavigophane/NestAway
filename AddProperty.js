import React, { useState } from "react";

function AddProperty({ userId }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
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
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("location", formData.location);
    data.append("posted_by", userId);
    if (formData.image) data.append("image", formData.image);

    const res = await fetch("http://localhost:5000/add_property", {
      method: "POST",
      body: data
    });
    const result = await res.json();
    alert(result.message);
  };

  return (
    <div>
      <h2>Add Property</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Title" onChange={handleChange} required />
        <textarea name="description" placeholder="Description" onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price" onChange={handleChange} required />
        <input type="text" name="location" placeholder="Location" onChange={handleChange} required />
        <input type="file" name="image" onChange={handleChange} />
        <button type="submit">Add Property</button>
      </form>
    </div>
  );
}

export default AddProperty;
