import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported
import { FaStar } from 'react-icons/fa'; // Import FaStar for rating display

const AdminRating = () => {
  // Dummy data for current rating
  const dummyAverageRating = 4.3; // Static average rating data
  const totalReviews = 26; // Static total reviews data

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundImage: 'url("/img/sl66.jpg")', // Add your background image here
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
      }}
    >
      {/* Current Rating Box */}
      <div
        className="card shadow-lg p-5 mb-4" // Increased padding for larger box
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '10px',
          width: '90%', // Set width to 90% of parent
          maxWidth: '600px', // Set a maximum width
        }}
      >
        <h4 className="text-center mb-3" style={{ fontSize: '2rem' }}>Current Rating</h4> {/* Increased font size */}
        <div className="d-flex justify-content-center mb-3">
          {[...Array(5)].map((star, index) => (
            <FaStar
              key={index}
              size={50} // Increased star size for better visibility
              className="mx-1"
              color={index + 1 <= Math.round(dummyAverageRating) ? '#ffc107' : '#e4e5e9'}
            />
          ))}
        </div>
        <p className="text-center" style={{ fontSize: '3rem', fontWeight: 'bold' }}>
          {dummyAverageRating}
        </p> {/* Increased font size for rating */}
        <p className="text-center" style={{ fontSize: '1.5rem' }}>
          out of 5 (based on {totalReviews} reviews)
        </p> {/* Increased font size for reviews */}
      </div>
    </div>
  );
};

export default AdminRating;
