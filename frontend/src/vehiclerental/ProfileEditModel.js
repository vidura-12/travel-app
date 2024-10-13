import React, { useState } from 'react';
import axios from 'axios';

const ProfileEditModal = ({ ownerData, handleLogout }) => {
  const [fullName, setFullName] = useState(ownerData.fullName);
  const [username, setUsername] = useState(ownerData.username);
  const [phoneno, setPhoneno] = useState(ownerData.phoneno);
  const [email, setEmail] = useState(ownerData.email);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleEditProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('/api/vehicle-owner/profile', {
        fullName,
        username,
        phoneno,
        email,
        password,
        confirmPassword,
      });
      setSuccess('Profile updated successfully!');
      setError(null);
    } catch (error) {
      setError(error.response.data.msg);
      setSuccess(null);
    }
  };

  return (
    <div className="profile-edit-modal">
      <h2>Edit Profile</h2>
      <form onSubmit={handleEditProfile}>
        <div className="form-group">
          <label>Full Name:</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Phone Number:</label>
          <input
            type="text"
            value={phoneno}
            onChange={(e) => setPhoneno(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
        <button type="submit">Update Profile</button>
      </form>
      <button className="vehicle-profile-logout" onClick={handleLogout}>
        LogOut
      </button>
    </div>
  );
};

export default ProfileEditModal;