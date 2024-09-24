import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function VehicleOwnerProfile() {
  const [ownerData, setOwnerData] = useState(null);
  const [vehicleCounts, setVehicleCounts] = useState({ total: 0, pending: 0 });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/vehicle-owner/login');
    }

    const fetchOwnerData = async () => {
      try {
        const response = await axios.get('http://localhost:8081/vehicle-owner/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOwnerData(response.data.owner);
        setVehicleCounts(response.data.vehicleCounts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching owner data:', error);
        setLoading(false);
      }
    };

    fetchOwnerData();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={containerStyle}>
      <div style={boxStyle}>
        <h2>Vehicle Owner Profile</h2>
        {ownerData ? (
          <>
            <p><strong>First Name:</strong> {ownerData.firstName}</p>
            <p><strong>Last Name:</strong> {ownerData.lastName}</p>
            <p><strong>Age:</strong> {ownerData.age}</p>
            <p><strong>Location:</strong> {ownerData.location}</p>
            <p><strong>Phone:</strong> {ownerData.phone}</p>
            <p><strong>Email:</strong> {ownerData.email}</p>
            <h3>Vehicle Statistics</h3>
            <p><strong>Total Vehicles:</strong> {vehicleCounts.total}</p>
            <p><strong>Pending Approval:</strong> {vehicleCounts.pending}</p>
          </>
        ) : (
          <p>Profile data not available.</p>
        )}
      </div>
    </div>
  );
}

export default VehicleOwnerProfile;
