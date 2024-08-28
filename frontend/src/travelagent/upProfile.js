import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function UpdateTourGuide() {
  const location = useLocation();
  const tourGuide = location.state || {}; // Get the passed tour guide details
  const [formData, setFormData] = useState(tourGuide); // Initialize with current tour guide details
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle update submit
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      // Log data before the API call
      console.log('Updating tour guide with data:', formData);

      const response = await axios.put(`http://localhost:8081/TourGuide/${formData.id}`, formData);

      // Check response status
      if (response.status === 200) {
        // Redirect to success page
        navigate('/travelagent/succ'); // Redirect to the success page
      } else {
        console.error('Update failed with status:', response.status);
      }
    } catch (error) {
      console.error('Error updating the tour guide:', error);
    }
  };

  return (
    <div className="update-container">
      <h2>Update Tour Guide</h2>
      <form onSubmit={handleUpdateSubmit}>
        <div>
          <label htmlFor="name">Tour Guide Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Tour Guide Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="address">Tour Guide Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="number">Tour Guide Number</label>
          <input
            type="text"
            id="number"
            name="number"
            value={formData.number || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="experience">Tour Guide Experience</label>
          <input
            type="text"
            id="experience"
            name="experience"
            value={formData.experience || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="language">Tour Guide Language</label>
          <input
            type="text"
            id="language"
            name="language"
            value={formData.language || ''}
            onChange={handleChange}
            required
          />
        </div>
        <button className="btn btn-primary" type="submit">Update</button>
      </form>
    </div>
  );
}
