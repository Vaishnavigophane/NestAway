import React, { useEffect, useState } from "react";
import axios from "axios";

function MyFlats() {
  const [flats, setFlats] = useState([]);

  useEffect(() => {
    fetchFlats();
  }, []);


  const fetchFlats = async () => {
  try {
    const res = await axios.get("http://localhost:5000/myflats", { withCredentials: true });
    console.log("Flats response:", res.data);  // 👈 add this
    setFlats(res.data.flats || []);
  } catch (err) {
    console.error(err.response || err);
    alert("Failed to fetch flats");
  }
};


  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this flat?")) return;

    try {
      await axios.delete(`http://localhost:5000/myflats/${id}`, { withCredentials: true });
      setFlats(flats.filter(f => f.id !== id));
    } catch (err) {
      console.error(err.response || err);
      alert("Failed to delete flat");
    }
  };

  
  const handleEdit = async (flat) => {
    const name = prompt("Flat Name:", flat.name);
    const address = prompt("Address:", flat.address);
    const rent = prompt("Rent:", flat.rent);
    const phone = prompt("phone:",flat.phone)
    const facilities = prompt("facilities:",flat.facilities)
    const location_link = prompt("phone:",flat.location_link)
   
    if (!name || !address || !rent || !phone || !facilities || !location_link) return;
    try {
      await axios.put(`http://localhost:5000/myflats/${flat.id}`, {
        name, address, phone: flat.phone, location_link: flat.location_link,
        rent, facilities: flat.facilities
      }, { withCredentials: true });

      fetchFlats(); // refresh list
    } catch (err) {
      console.error(err.response || err);
      alert("Failed to edit flat");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Flats</h2>
      {flats.length === 0 && <p>No flats posted yet.</p>}
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {flats.map(flat => (
          <div key={flat.id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px", width: "250px" }}>
            <img src={`http://localhost:5000${flat.image_url}`} alt={flat.name} style={{ width: "100%", borderRadius: "8px" }} />
            <h3>{flat.name}</h3>
            <p>{flat.address}</p>
            <p>₹{flat.rent}</p>
            <button onClick={() => handleEdit(flat)}>Edit</button>
            <button onClick={() => handleDelete(flat.id)} style={{ marginLeft: "5px" }}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyFlats;
