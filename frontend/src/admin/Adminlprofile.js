import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './profile.css'; // Import the updated CSS file

const AdminProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const fetchAdmin = async () => {
      const username = localStorage.getItem('username');
      try {
        const response = await axios.get(`http://localhost:8081/auth/profile/${username}`, {
          headers: {
            authorization: localStorage.getItem('token'),
          },
        });
        setAdmin(response.data);
      } catch (error) {
        console.error('Error fetching admin profile:', error);
      }
    };
    fetchAdmin();
  }, [id]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <h2>Admin Profile</h2>
        </div>
        <div className="profile-body">
          {admin ? (
            <div className="profile-details">
              <p><strong>Username:</strong> {admin.username}
               </p> <p><strong>Email:</strong> {admin.email} </p> 
               <p> <strong>Role:</strong> {admin.role} </p> 
               <p> <strong>Department:</strong> {admin.department}</p>
              <p><strong>Address:</strong> {admin.address.street}, {admin.address.city}, {admin.address.state}, {admin.address.zip}</p>
              <p><strong>Joined Date:</strong> {new Date(admin.joinedDate).toLocaleDateString()}</p>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default AdminProfile;
