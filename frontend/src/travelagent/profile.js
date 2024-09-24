import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Profile() {
  const location = useLocation();
  const tourGuide = location.state || {}; // Retrieve the passed data
  const navigate = useNavigate();

  // Handle delete request
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8081/TourGuide/${tourGuide.id}`);
      alert('Tour guide deleted successfully!');
      navigate('/travelagent/register'); // Redirect to registration or another page after delete
    } catch (error) {
      console.error('Error deleting the tour guide:', error);
    }
  };

  // Handle update request (redirect to update form)
  const handleUpdate = () => {
    navigate('/travelagent/upProfile', { state: tourGuide }); // Redirect to update form with the tour guide data
  };

  return (
    <div className="profile-container">
      <h2>Tour Guide Profile</h2>
      <div className="profile-details">
        <p><strong>Name:</strong> {tourGuide.name}</p>
        <p><strong>Email:</strong> {tourGuide.email}</p>
        <p><strong>Address:</strong> {tourGuide.address}</p>
        <p><strong>Number:</strong> {tourGuide.number}</p>
        <p><strong>Experience:</strong> {tourGuide.experience}</p>
        <p><strong>Language:</strong> {tourGuide.language}</p>
      </div>
      
      <div className="profile-actions">
        <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
        <button className="btn btn-primary" onClick={handleUpdate}>Update</button> 
      </div>
    </div>
  );
}
