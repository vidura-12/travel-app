import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './editpackage.css'; // Assuming you have some styles for the form

const EditPackage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { package: selectedPackage } = location.state || {};  // Access the passed package data

  const [formData, setFormData] = useState({
    agencyName: '',
    phoneNumber: '',
    email: '',
    location: '',
    places: '',
    maxPeople: '',
    price: '',
    image: ''
  });

  useEffect(() => {
    if (selectedPackage) {
      setFormData({
        agencyName: selectedPackage.agencyName,
        phoneNumber: selectedPackage.phoneNumber,
        email: selectedPackage.email,
        location: selectedPackage.location,
        places: selectedPackage.places.join(', '),  // Convert array to string
        maxPeople: selectedPackage.maxPeople,
        price: selectedPackage.price,
        image: selectedPackage.image
      });
    }
  }, [selectedPackage]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedPackageData = new FormData();
      updatedPackageData.append('agencyName', formData.agencyName);
      updatedPackageData.append('phoneNumber', formData.phoneNumber);
      updatedPackageData.append('email', formData.email);
      updatedPackageData.append('location', formData.location);
      updatedPackageData.append('places', formData.places);
      updatedPackageData.append('maxPeople', formData.maxPeople);
      updatedPackageData.append('price', formData.price);

      if (formData.image instanceof File) {
        updatedPackageData.append('image', formData.image);
      }

      await axios.put(`http://localhost:8081/packageS/${selectedPackage._id}`, updatedPackageData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert('Package updated successfully');
      navigate('/Sellersprofile');  // Navigate back to the dashboard after successful update
    } catch (error) {
      console.error(error);
      alert('Failed to update package');
    }
  };

  return (
    <div className="edit-package-container">
      <h1>Edit Travel Package</h1>
      {selectedPackage ? (
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="edit-package-form">
          <div className="form-group1">
            <label>Agency Name</label>
            <input
              type="text"
              name="agencyName"
              value={formData.agencyName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group1">
            <label>Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group1">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group1">
            <label>Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group1">
            <label>Places (comma separated)</label>
            <input
              type="text"
              name="places"
              value={formData.places}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group1">
            <label>Max People</label>
            <input
              type="number"
              name="maxPeople"
              value={formData.maxPeople}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group1">
            <label>Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group1">
            <label>Image</label>
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
            />
            {formData.image && !(formData.image instanceof File) && (
              <img src={`/img/${formData.image}`} alt="Selected" width="100" />
            )}
          </div>
          <button type="submit" className="btn btn-primary">Save Changes</button>
        </form>
      ) : (
        <p>No package details found.</p>
      )}
    </div>
  );
};

export default EditPackage;
