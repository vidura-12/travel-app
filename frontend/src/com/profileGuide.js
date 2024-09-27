import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Profile() {
  const location = useLocation();
  const initialTourGuide = location.state || {};
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(initialTourGuide);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the updated data from the database after component mounts
    fetchTourGuideDetails(formData.id);
  }, []);

  // Function to fetch tour guide details by ID
  const fetchTourGuideDetails = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8081/TourGuide/${id}`);
      setFormData(response.data); // Update formData with the latest details from the database
    } catch (error) {
      console.error('Error fetching tour guide details:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8081/TourGuide/update/${formData.id}`, formData);
      alert('Tour guide updated successfully!');
      setIsEditing(false);
      
      // Update localStorage
      const approvedGuides = JSON.parse(localStorage.getItem('approvedGuides')) || [];
      const updatedGuides = approvedGuides.map(guide => 
        guide._id === formData.id ? formData : guide
      );
      localStorage.setItem('approvedGuides', JSON.stringify(updatedGuides));

      // Fetch the updated data from the database to display
      fetchTourGuideDetails(formData.id);
    } catch (error) {
      console.error('Error updating the tour guide:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this tour guide?')) {
      try {
        await axios.delete(`http://localhost:8081/TourGuide/delete/${id}`);
        alert('Tour guide deleted successfully!');
        navigate('/register');
      } catch (error) {
        console.error('Error deleting tour guide:', error);
        alert('Failed to delete the tour guide.');
      }
    }
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center"  
      style={{
        backgroundImage: "url('/img/all4.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',  // Ensure full height for the background
        backdropFilter: 'blur(5px)',
      }}
    >
      <h2 className="mb-4" style={{ fontWeight: 'bold', color: 'black' }}>Tour Guide Profile</h2>

      {isEditing ? (
        <form onSubmit={handleUpdate} className="bg-light rounded p-4 shadow" style={{ width: '400px' }}>
          <div className="mb-3">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="number">Number:</label>
            <input
              type="text"
              id="number"
              name="number"
              value={formData.number}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="experience">Experience:</label>
            <input
              type="text"
              id="experience"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="language">Language:</label>
            <input
              type="text"
              id="language"
              name="language"
              value={formData.language}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <button className="btn btn-primary w-100" type="submit" onClick={() => setIsEditing(false)}>Save</button>
        </form>
      ) : (
        <div className="bg-light rounded p-4 shadow" style={{ width: '400px' }}>
          <p><strong>Name:</strong> {formData.name}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Address:</strong> {formData.address}</p>
          <p><strong>Number:</strong> {formData.number}</p>
          <p><strong>Experience:</strong> {formData.experience}</p>
          <p><strong>Language:</strong> {formData.language}</p>
        </div>
      )}

      <div className="mt-3 d-flex gap-2">
        {!isEditing && (
          <button className="btn btn-primary" onClick={() => setIsEditing(true)}>Update</button>
        )}
        {!isEditing && (
          <button className="btn btn-danger" onClick={() => handleDelete(formData.id)}>Delete</button>
        )}
      </div>
    </div>
  );
}
