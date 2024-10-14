import React from 'react';
import './HotelAdminDashboard.css';

const SeeMoreModal = ({ hotel, onClose }) => {
  if (!hotel) return null;

  return (
    <div>
      <div className="hotel-overlay" onClick={onClose} />
      <div className="hotel-seeMoreModal">
        <h2>{hotel.name}</h2>
        <div className="hotel-imagesContainer">
          {hotel.images && hotel.images.length > 0 ? (
            hotel.images.map((image, index) => (
              <img
                key={index}
                src={`http://localhost:8081/uploads/${image}`}
                alt={`${hotel.name} ${index + 1}`}
                className="hotel-seeMoreImage"
              />
            ))
          ) : (
            <img src="/placeholder.png" alt="No Images Available" className="hotel-seeMoreImage" />
          )}
        </div>
        <div className="hotel-description">
          <h3>Description</h3>
          <p>{hotel.description || 'No description available.'}</p>
        </div>
        <button onClick={onClose} className="hotel-closeSeeMoreButton">Close</button>
      </div>
    </div>
  );
};

export default SeeMoreModal;
