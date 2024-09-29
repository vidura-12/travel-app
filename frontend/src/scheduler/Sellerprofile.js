import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Sellerprofile = () => {
  const [sellerData, setSellerData] = useState({});
  const token = localStorage.getItem('token'); // Retrieve token

  useEffect(() => {
    const fetchSellerData = async () => {
      try {
        const response = await axios.get('http://localhost:8081/seller/profile', {
          headers: {
            Authorization: `Bearer ${token}` // Send token in request headers
          }
        });
        setSellerData(response.data);
      } catch (error) {
        console.error('Error fetching seller data:', error);
      }
    };

    if (token) {
      fetchSellerData(); // Fetch seller data only if token exists
    }
  }, [token]);

  return (
    <div className="seller-profile">
      <h2>Seller Profile</h2>
      <div className="profile-details">
        <p><strong>Name:</strong> {sellerData.name}</p>
        <p><strong>Email:</strong> {sellerData.email}</p>
        <p><strong>Phone:</strong> {sellerData.phone}</p>
        <p><strong>Address:</strong> {sellerData.address}</p>
        <p><strong>Role:</strong> {sellerData.role}</p>
      </div>
    </div>
  );
};

export default Sellerprofile;
