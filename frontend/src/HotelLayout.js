// HotelLayout.js
import React from 'react';
import Header from './com/header'; // Adjust the path as needed

const HotelLayout = ({ children }) => {
  const layoutStyle = {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh', // Optional: if you want it to take the full height
  };

  const mainStyle = {
    padding: '20px',
    marginTop: '20px', // Space below the header
    flex: 1, // Allow the main content to grow
  };

  return (
    <div style={layoutStyle}>
      <Header />
      <main style={mainStyle}>
        {children}
      </main>
    </div>
  );
};

export default HotelLayout;
