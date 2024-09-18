import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function BookGuide() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { selectedGuideId, name, address, number } = state || {};

  const handleSubmit = async () => {
    // You can handle the submit logic here (like saving booking details)
    navigate('/guide', { state: { name, address, number, selectedGuideId } });
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Transparent background
        padding: '20px',
      }}
    >
      <div
        style={{
          textAlign: 'center',
          padding: '40px',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparent box
          borderRadius: '8px',
          color: 'white',
        }}
      >
        <h2>Tour Guide Booking Confirmation</h2>
        <p>You have booked a tour guide. Here are the details:</p>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li><strong>Name:</strong> {name}</li>
          <li><strong>Address:</strong> {address}</li>
          <li><strong>Number:</strong> {number}</li>
        </ul>
        <button
          style={{
            backgroundColor: 'green',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '5px',
            marginTop: '20px',
            border: 'none',
            cursor: 'pointer',
          }}
          onClick={handleSubmit}
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
}
