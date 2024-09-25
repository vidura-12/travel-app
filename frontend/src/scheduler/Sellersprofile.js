import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Sellersprofile.css';

const Sellersprofile = () => {
  const navigate = useNavigate();

  const selectedPackage = {
    _id: '12345', // Sample package ID
    agencyName: 'Uthara Travels',
    phoneNumber: '123-456-7890',
    email: 'uthara@example.com',
    location: 'Southern Province, Matara',
    places: ['Beach', 'Museum', 'Temple'], // Sample places array
    maxPeople: 20,
    price: 500,
    image: 'sample.jpg', // Sample image
  };

  const handlePackageClick = () => {
    // Navigate to the EditPackage component with package data
    navigate('/Editpackage', { state: { package: selectedPackage } });
  };

  return (
    <div className='profile1'>
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar">
            <img
              src="https://via.placeholder.com/150"
              alt="User Avatar"
              className="avatar-image"
            />
          </div>
        </div>

        <div className="profile-info">
          <h2>Uthara Sonadi, 22</h2>
          <p>Southern Province, Matara</p>
          <p>Travel agency owner</p>

          <div className="profile-actions">
            <button className="btn-profilebtn">Profile</button>
            <button
              className="btn-travelpackagebtn"
              onClick={handlePackageClick} // Call the function on click
            >
              Package
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sellersprofile;
