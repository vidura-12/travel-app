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

  const handleSaveChanges = async (e) => {
    e.preventDefault();

    const updatedPackage = {
      ...formData,
      places: formData.places.split(',').map(place => place.trim()) // Convert back to array
    };

    try {
      const response = await axios.put(`http://localhost:8081/packageS/${selectedPackage._id}`, updatedPackage);
      if (response.status === 200) {
        navigate('/dashboard');  // Redirect back to dashboard after saving
      } else {
        throw new Error('Failed to save the package');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="edit-package">
      <h1>Edit Package</h1>
      <form onSubmit={handleSaveChanges} encType="multipart/form-data">
        <div>
          <label>Agency Name</label>
          <input type="text" name="agencyName" value={formData.agencyName} onChange={handleInputChange} />
        </div>
        <div>
          <label>Phone Number</label>
          <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} />
        </div>
        <div>
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
        </div>
        <div>
          <label>Location</label>
          <input type="text" name="location" value={formData.location} onChange={handleInputChange} />
        </div>
        <div>
          <label>Places (comma separated)</label>
          <input type="text" name="places" value={formData.places} onChange={handleInputChange} />
        </div>
        <div>
          <label>Max People</label>
          <input type="number" name="maxPeople" value={formData.maxPeople} onChange={handleInputChange} />
        </div>
        <div>
          <label>Price</label>
          <input type="number" name="price" value={formData.price} onChange={handleInputChange} />
        </div>
        <div>
          <label>Image</label>
          <input type="file" name="image" onChange={handleImageChange} />
          {formData.image && typeof formData.image === 'string' && (
            <img src={`/img/${formData.image}`} alt="Package" width="100" />
          )}
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditPackage;
