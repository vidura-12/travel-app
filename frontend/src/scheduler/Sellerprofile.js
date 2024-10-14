import React, { useEffect, useState } from 'react';
import './Sellerprofile.css';

const Sellerprofile = () => {
  const [sellerData, setSellerData] = useState(null);

  useEffect(() => {
    // Retrieve seller data from localStorage
    const storedSellerData = JSON.parse(localStorage.getItem('sellerData'));
    if (storedSellerData) {
      setSellerData(storedSellerData);
    }
  }, []);

  if (!sellerData) {
    return <p>Loading seller profile...</p>;
  }

  return (
    <div className='pic'>
    <center>
    <div className="seller-profile">
      <h2>Seller Profile</h2>
      <div className="sprofile-details">
        <p><strong>Name:</strong> {sellerData.name}</p>
        <p><strong>Email:</strong> {sellerData.email}</p>
        <p><strong>Phone:</strong> {sellerData.phone}</p>
        <p><strong>Address:</strong> {sellerData.address}</p>
        <p><strong>Role:</strong> {sellerData.role}</p>
      </div>
    </div>
    </center>
    </div>
  );
};

export default Sellerprofile;
