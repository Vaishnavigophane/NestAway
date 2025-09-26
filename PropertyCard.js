import React from "react";

function PropertyCard({ property }) {
  return (
    <div className="property-card">
      {property.image_url ? (
        <img src={`http://localhost:5000${property.image_url}`} alt={property.title} />
      ) : (
        <div style={{ height: 180, background: "#f0f0f0" }} />
      )}
      <h3>{property.title}</h3>
      <p>{property.description}</p>
      <p><strong>Location:</strong> {property.location}</p>
      <p><strong>Price:</strong> ₹{property.price}</p>
    </div>
  );
}

export default PropertyCard;
