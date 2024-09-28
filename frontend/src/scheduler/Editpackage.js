import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './editpackage.css'; // Assuming you have some custom styles for the form

const EditPackage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const packageId = location.state?.id; // Get the package ID from the location state

  const [packageData, setPackageData] = useState({
    agencyName: '',
    phoneNumber: '',
    email: '',
    location: '',
    places: [],
    maxPeople: '',
    price: '',
  });

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/packages/${packageId}`);
        setPackageData(response.data);
      } catch (error) {
        console.error('Error fetching package data:', error);
      }
    };

    if (packageId) {
      fetchPackage();
    } else {
     // Redirect if package ID is not available
    }
  }, [packageId, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'places') {
      setPackageData({ ...packageData, [name]: value.split(',').map(place => place.trim()) });
    } else {
      setPackageData({ ...packageData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8081/packages/update/${packageId}`, packageData);
      alert('Package updated successfully');
      navigate('/dashboard'); // Redirect to dashboard after update
    } catch (error) {
      console.error('Error updating package:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h1>Edit Package</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="agencyName">Agency Name</label>
          <input
            type="text"
            className="form-control"
            id="agencyName"
            name="agencyName"
            value={packageData.agencyName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="text"
            className="form-control"
            id="phoneNumber"
            name="phoneNumber"
            value={packageData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={packageData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            className="form-control"
            id="location"
            name="location"
            value={packageData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="places">Places (comma-separated)</label>
          <input
            type="text"
            className="form-control"
            id="places"
            name="places"
            value={packageData.places.join(', ')}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="maxPeople">Max People</label>
          <input
            type="number"
            className="form-control"
            id="maxPeople"
            name="maxPeople"
            value={packageData.maxPeople}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            className="form-control"
            id="price"
            name="price"
            value={packageData.price}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Update Package</button>
      </form>
    </div>
  );
};

export default EditPackage;
