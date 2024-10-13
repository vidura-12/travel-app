import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './VehicleOwnerProfile.css';
import Swal from 'sweetalert2';

function VehicleOwnerProfile() {
  const [ownerData, setOwnerData] = useState(null);
  //const [vehicleCounts, setVehicleCounts] = useState({ total: 0, pending: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      Swal.fire({
        icon: 'warning',
        title: 'Login Required',
        text: 'You need to log in first.',
        confirmButtonText: 'OK',
        customClass: {
          icon: 'vehicle-red-icon',  // Apply custom class for the icon
      }
      }).then(() => {
        navigate('/vehicle-owner/login'); // Redirect to login page after closing the alert
        });
    }

    const fetchOwnerData = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/vehicle-owner/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        if (response.status === 200) {
          console.log(response.data); // Log data to check its structure
          setOwnerData(response.data);
          setLoading(false);
        } else if (response.status === 401) {
          alert('You must be logged in to view this page.');
          navigate('/vehicle-owner/login');
        } else {
          alert(`Failed to fetch profile data: ${response.data.message}`);
          setError(response.data.message);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching owner data:', error);
        setLoading(false);
      }
    };

    fetchOwnerData();
  }, [navigate]);

  const handleLogout = () => {
    Swal.fire({
        title: 'Are you sure?',
        text: 'You will be logged out and redirected to the login page.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, logout',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.isConfirmed) {
            // Proceed with logout
            localStorage.removeItem('token');
            localStorage.removeItem('vehicleOwner');
            sessionStorage.clear();  
            navigate('/vehicle-owner/login');  // Redirect to the login page
        }
      });  
  };


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>; // Display error message
  }

  return (
    <div className="vehicle-profile-container">
      <div className="vehicle-profile-container-2">
        <h2 className='vehicle-profile-container-h2'>Vehicle Owner Profile</h2>
        {ownerData ? (
          <>
            <p className='vehicle-profile-container-p'><strong className='vehicle-profile-container-strong'>Full Name:</strong> {ownerData.firstname}</p>
            <p className='vehicle-profile-container-p'><strong className='vehicle-profile-container-strong'>Username:</strong> {ownerData.username}</p>
            <p className='vehicle-profile-container-p'><strong className='vehicle-profile-container-strong'>Phone Number:</strong> {ownerData.phoneno}</p>
            <p className='vehicle-profile-container-p'><strong className='vehicle-profile-container-strong'>Email:</strong> {ownerData.email}</p>
            <p className='vehicle-profile-container-p'><strong className='vehicle-profile-container-strong'>Role:</strong> {ownerData.role}</p>
            <button className="vehicle-profile-logout" onClick={handleLogout}>LogOut</button>
            <button className="nav-link-profile-logout-header" onClick={handleLogout}>LogOut</button>
          </>
        ) : (
          <p>Profile data not available.</p>
        )}
      </div>
    </div>
  );
}

export default VehicleOwnerProfile;

