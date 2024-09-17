import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Profile() {
  const location = useLocation();
  const initialTourGuide = location.state || {}; // Retrieve the passed data
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(initialTourGuide);
  const navigate = useNavigate();

  // Handle input changes for the update form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle the update request
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8081/TourGuide/update/${formData.id}`, formData);
      alert('Tour guide updated successfully!');
      setIsEditing(false); // Close the edit form after successful update
    } catch (error) {
      console.error('Error updating the tour guide:', error);
    }
  };

  // Handle delete request
  const handleDelete = async () => {
    console.log('Deleting TourGuide with ID:', formData.id); // Verify the ID
  
    try {
      const response = await axios.delete(`http://localhost:8081/TourGuide/delete/${formData.id}`);
      console.log('Response:', response.data); // Log the response for debugging
      alert('Tour guide deleted successfully!');
      navigate('/travelagent/dashboard'); // Redirect to the desired page after delete
    } catch (error) {
      console.error('Error deleting the tour guide:', error);
      alert('Error deleting the tour guide.'); // Alert user in case of an error
    }
  };
  

  return (
    <div className="profile-container">
      <h2>Tour Guide Profile</h2>

      {isEditing ? (
        // If editing, show the form
        <form onSubmit={handleUpdate} className="update-form">
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="number">Number:</label>
            <input
              type="text"
              id="number"
              name="number"
              value={formData.number}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="experience">Experience:</label>
            <input
              type="text"
              id="experience"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="language">Language:</label>
            <input
              type="text"
              id="language"
              name="language"
              value={formData.language}
              onChange={handleChange}
              required
            />
          </div>
          <button className="btn btn-primary" type="submit" onClick={() => setIsEditing(false)}>Save</button>
           
        </form>
      ) : (
        // If not editing, show the profile details
        <div className="profile-details">
          <p><strong>Name:</strong> {formData.name}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Address:</strong> {formData.address}</p>
          <p><strong>Number:</strong> {formData.number}</p>
          <p><strong>Experience:</strong> {formData.experience}</p>
          <p><strong>Language:</strong> {formData.language}</p>
        </div>
      )}

      <div className="profile-actions">
        {!isEditing && <button className="btn btn-primary" onClick={() => setIsEditing(true)}>Update</button>}
        <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}
