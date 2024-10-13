import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './VehicleOwnerProfile.css';
import Swal from 'sweetalert2';
//import ProfileEditModal from './ProfileEditModel.js';

function VehicleOwnerProfile() {
  const [ownerData, setOwnerData] = useState(null);
  //const [vehicleCounts, setVehicleCounts] = useState({ total: 0, pending: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [showEditModal, setShowEditModal] = useState(false); // Add state to manage the modal visibility

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

  const handleEditClose = () => setShowEditModal(false); // Function to close modal

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>; // Display error message
  }

  return (
    <div className="vehicle-profileContainer">
      <div className="vehicle-profileContent">
        <div className="vehicle-formContainer">
          <h2 className="vehicle-formTitle">Profile Information</h2>

          {/* Profile Information */}
          <div className="vehicle-formGroup">
            <label htmlFor="fullName">Full Name</label>
            <p className="vehicle-input">{ownerData.fullName || 'Not Available'}</p>
          </div>

          <div className="vehicle-formGroup">
            <label htmlFor="username">Username</label>
            <p className="vehicle-input">{ownerData.username || 'Not Available'}</p>
          </div>

          <div className="vehicle-formGroup">
            <label htmlFor="phone">Phone Number</label>
            <p className="vehicle-input">{ownerData.phoneno || 'Not Available'}</p>
          </div>

          <div className="vehicle-formGroup">
            <label htmlFor="email">Email</label>
            <p className="vehicle-input">{ownerData.email || 'Not Available'}</p>
          </div>

          <div className="vehicle-formGroup">
            <label htmlFor="role">Role</label>
            <p className="vehicle-input">{ownerData.role || 'Not Available'}</p>
          </div>

          <div className="vehicle-formGroup">
            <label htmlFor="location">Location</label>
            <p className="vehicle-input">{ownerData.location || 'Not Available'}</p>
          </div>

          {/* <div className="vehicle-formGroup">
            <label htmlFor="age">Age</label>
            <p className="vehicle-input">{ownerData.age || 'Not Available'}</p>
          </div> */}
          <div className="vehicle-buttonGroup">
          <button className="vehicle-logoutButton" onClick={handleLogout}>
            Log Out
          </button>
          <button className="vehicle-editButton" onClick={() => setShowEditModal(true)}>
            Edit Profile
          </button>
        </div>
            {/* Render Edit Profile Modal */}
          {showEditModal && (
            <ProfileEditModal ownerData={ownerData} onClose={handleEditClose} />
          )}
        </div>
      </div>
    </div>
  );
}

export default VehicleOwnerProfile;

function ProfileEditModal({ ownerData, onClose }) {
  const [formData, setFormData] = useState({ ...ownerData });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to update profile data, like making an API call
    console.log('Updated data:', formData);
    onClose(); // Close the modal after submission
  };

  return (
    <div className="vehicle-modalOverlay">
      <div className="vehicle-modalContainer">
        <h2 className="vehicle-modalTitle">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="vehicle-modalForm">
          <div className="vehicle-formGroup">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="vehicle-input"
              required
            />
          </div>

          <div className="vehicle-formGroup">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="vehicle-input"
              required
            />
          </div>

          <div className="vehicle-formGroup">
            <label htmlFor="phoneno">Phone Number</label>
            <input
              type="text"
              name="phoneno"
              value={formData.phoneno}
              onChange={handleChange}
              className="vehicle-input"
              required
            />
          </div>

          <div className="vehicle-formGroup">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="vehicle-input"
              required
            />
          </div>

          <div className="vehicle-formGroup">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="vehicle-input"
              required
            />
          </div>

          {/* <div className="vehicle-formGroup">
            <label htmlFor="age">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="vehicle-input"
              required
            />
          </div> */}

          <div className="vehicle-modalButtons">
            <button type="button" className="vehicle-cancelButton" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="vehicle-saveButton">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}