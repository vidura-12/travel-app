import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


const AdminProfile = () => {
  const { id } = useParams(); // Get the admin ID from the URL
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const fetchAdmin = async () => {
        const username = localStorage.getItem('username');
        console.log(username);
      try {
        const response = await axios.get(`http://localhost:8081/auth/profile/${username}`, {
          headers: {
            authorization: localStorage.getItem('token'),
          },
        });
        setAdmin(response.data);
      } catch (error) {
        console.error('Error fetching admin profile:', error);
        // Handle error, e.g., show alert or redirect
      }
    };

    fetchAdmin();
  }, [id]);

  return (
    <div className="container mt-5">
      <div className="card shadow-sm hover-effect">
        <div className="card-header">
          <img
            src="https://via.placeholder.com/80"
            alt="Profile"
            className="profile-img"
          />
          <h2 className="admin-title">Admin Profile</h2>
        </div>
        <div className="card-body">
          {admin ? (
            <div className="profile-details1">
              <p><strong>Username:</strong> {admin.username}</p>
              <p><strong>Email:</strong> {admin.email}</p>
              <p><strong>Role:</strong> {admin.role}</p>
              <p><strong>Department:</strong> {admin.department}</p>
              <p><strong>Address:</strong> {admin.address.street}, {admin.address.city}, {admin.address.state}, {admin.address.zip}</p>
              <p><strong>Joined Date:</strong> {new Date(admin.joinedDate).toLocaleDateString()}</p>
              
            </div>
          ) : (
            <p className="text-center">Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
