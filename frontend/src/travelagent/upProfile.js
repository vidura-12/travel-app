import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 

export default function UpdateTourGuide() {
  const { id } = useParams(); // Get the id from the URL params
  const navigate = useNavigate();
  const location = useLocation(); // Get location to access state
  const [guide, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    number: "",
    experience: "",
    language: ""
  });

  useEffect(() => {
    // Check if data is passed through location.state
    if (location.state?.guide) {
      setFormData(location.state.guide);
    } else {
      fetchTourGuide(); // Fetch data if not passed through state
    }
  }, [location.state]);

  // Fetch the tour guide details
  const fetchTourGuide = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/TourGuide/${id}`);
      console.log('Fetched tour guide data:', response.data); // Debug: Log fetched data
      setFormData(response.data);
    } catch (error) {
      console.error('Error fetching tour guide:', error);
    }
  };

  // Handle form submission and update tour guide
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    console.log('Data being sent:', guide); // Debug: Log data being sent

    try {
      const response = await axios.put(`http://localhost:8081/TourGuide/update/${id}`, guide, {
        headers: {
          'Content-Type': 'application/json' // Ensure the content type is set to JSON
        }
      });

      console.log('Update response:', response); // Debug: Log response

      if (response.status === 200) {
        navigate('/travelagent/dashboard'); // Redirect to the success page
      } else {
        console.error('Update failed with status:', response.status);
      }
    } catch (error) {
      console.error('Error updating the tour guide:', error.response ? error.response.data : error.message);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="container">
      <h2>Update Tour Guide</h2>
      <form onSubmit={handleUpdateSubmit}>
        <div className="form-group">
          <label htmlFor="name">Tour Guide Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={guide.name || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Tour Guide Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={guide.email || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Tour Guide Address</label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            value={guide.address || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="number">Tour Guide Number</label>
          <input
            type="text"
            className="form-control"
            id="number"
            name="number"
            value={guide.number || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="experience">Tour Guide Experience</label>
          <input
            type="text"
            className="form-control"
            id="experience"
            name="experience"
            value={guide.experience || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="language">Tour Guide Language</label>
          <input
            type="text"
            className="form-control"
            id="language"
            name="language"
            value={guide.language || ''}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Update</button>
      </form>
    </div>
  );
}
