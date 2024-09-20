import React, { useState } from 'react';
import './ProfileDetails.css';

const ProfileDetails = () => {
  const [details, setDetails] = useState({
    name: 'James Kourtney',
    displayName: 'Travis',
    email: 'james96@gmail.com',
    contact: '+90704234567',
    dob: '08.03.2000',
    nationality: 'Sri Lankan',
    gender: 'Male',
    address: '49-D, Isurupura Road, Malabe, Sri Lanka',
    passport: 'Not Provided',
  });

  const [editMode, setEditMode] = useState({
    name: false,
    displayName: false,
    email: false,
    contact: false,
    dob: false,
    nationality: false,
    gender: false,
    address: false,
    passport: false,
  });

  const handleEditClick = (field) => {
    setEditMode({ ...editMode, [field]: !editMode[field] });
  };

  const handleInputChange = (e, field) => {
    setDetails({ ...details, [field]: e.target.value });
  };

  return (
    <div className="profile-container">
      <div className="personal-details">
        <h2>Personal Details</h2>
        <p>Update your information and find out how it's used.</p>
        <div className="profile-card">
          {Object.keys(details).map((field, index) => (
            <div className="profile-row" key={index}>
              <div className="label">{field.charAt(0).toUpperCase() + field.slice(1)} :</div>
              {editMode[field] ? (
                <input
                  type="text"
                  value={details[field]}
                  onChange={(e) => handleInputChange(e, field)}
                  className="profile-input"
                />
              ) : (
                <div className="value">{details[field]}</div>
              )}
              <button className="edit-button" onClick={() => handleEditClick(field)}>
                {editMode[field] ? 'Save' : 'Edit'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
