import React from 'react';
//import Header from './com/header'; // Adjust the path as needed

const HotelComp = ({ children }) => {
  const layoutStyle = {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh', // Full height layout
  };

  const mainStyle = {
    padding: '20px',
    marginTop: '20px', // Space below the header
    flex: 1, // Allow the main content to grow
    overflowY: 'auto', // Scrollable content if it overflows
  };

  return (
    <div style={layoutStyle}>
      
      <main style={mainStyle}>
        {children}
      </main>
    </div>
  );
};

export default HotelComp;
