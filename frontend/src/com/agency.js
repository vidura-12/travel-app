import React, { useState } from 'react';
import axios from 'axios';
import './agency.css';

const Agency = () => {
  const [formData, setFormData] = useState({
    agencyName: '',
    phoneNumber: '',
    email: '',
    location: '',
    places: [''],
    maxPeople: '',
    price: '',
    image: null,
  });

  const [errors, setErrors] = useState({});

  // Handle form field changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handlePlaceChange = (index, value) => {
    const newPlaces = [...formData.places];
    newPlaces[index] = value;
    setFormData({ ...formData, places: newPlaces });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const addPlace = () => {
    setFormData({ ...formData, places: [...formData.places, ''] });
  };

  const removePlace = (index) => {
    const newPlaces = [...formData.places];
    newPlaces.splice(index, 1);
    setFormData({ ...formData, places: newPlaces });
  };

  const validateForm = () => {
    let valid = true;
    let newErrors = {};

    if (!formData.agencyName) {
      newErrors.agencyName = 'Agency Name is required';
      valid = false;
    }

    if (!formData.phoneNumber || formData.phoneNumber.length !== 10) {
      newErrors.phoneNumber = 'Phone Number must be exactly 10 digits';
      valid = false;
    }

    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
      valid = false;
    }

    if (!formData.location) {
      newErrors.location = 'Location is required';
      valid = false;
    }

    if (formData.places.some(place => place === '')) {
      newErrors.places = 'All places must be filled out';
      valid = false;
    }

    if (!formData.maxPeople) {
      newErrors.maxPeople = 'Max People is required';
      valid = false;
    }

    if (!formData.price) {
      newErrors.price = 'Price is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
        const data = new FormData();
        Object.keys(formData).forEach(key => {
            if (key === 'places') {
                formData.places.forEach((place, index) => {
                    data.append(`places[${index}]`, place);
                });
            } else {
                data.append(key, formData[key]);
            }
        });

        try {
            const response = await axios.post('http://localhost:8081/packageS/create', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Form submitted successfully:', response.data);

            // Reset form after successful submission
            setFormData({
                agencyName: '',
                phoneNumber: '',
                email: '',
                location: '',
                places: [''],
                maxPeople: '',
                price: '',
                image: null,
            });

        } catch (error) {
            console.error('Error submitting the form', error);
        }
    } else {
        console.log('Form validation failed', errors); // Log the errors object
    }
};


  return (
    <>
      <div className="travelagency">
        <h1>Travel Packages</h1>
      </div>
      <div className='traveltitle'>
        <h1>Welcome Travel Agencies!</h1>
        <p>Customize the travel packages</p>
      </div>
      <form id="agencyForm" onSubmit={handleSubmit}>
        <div className="m1">
          <label id="agencyLabel">Name of the Travel Agency</label>
          <input
            type="text"
            className="form-control"
            id="agencyName"
            value={formData.agencyName}
            onChange={handleInputChange}
          />
          {errors.agencyName && <div className="error">{errors.agencyName}</div>}

          <label id="agencyLabel">Phone Number</label>
          <input
            type="tel"
            className="form-control"
            id="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
          />
          {errors.phoneNumber && <div className="error">{errors.phoneNumber}</div>}

          <label id="agencyLabel">Email Address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          {errors.email && <div className="error">{errors.email}</div>}
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>

          <label id="agencyLabel">Location</label>
          <input
            type="text"
            className="form-control"
            id="location"
            value={formData.location}
            onChange={handleInputChange}
          />
          {errors.location && <div className="error">{errors.location}</div>}

          <label id="agencyLabel">Places of Specific Location</label>
          {formData.places.map((place, index) => (
            <div key={index} className="place-input">
              <input
                type="text"
                className="form-control"
                value={place}
                onChange={(e) => handlePlaceChange(index, e.target.value)}
              />
              {errors.places && <div className="error">{errors.places}</div>}
              {formData.places.length > 1 && (
                <button type="button" onClick={() => removePlace(index)} className="btn btn-danger">
                  Remove
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={addPlace} className="btn btn-secondary">
            Add Place
          </button>

          <label id="agencyLabel">Max People</label>
          <input
            type="number"
            className="form-control"
            id="maxPeople"
            value={formData.maxPeople}
            onChange={handleInputChange}
          />
          {errors.maxPeople && <div className="error">{errors.maxPeople}</div>}

          <label id="agencyLabel">Price</label>
          <input
            type="number"
            className="form-control"
            id="price"
            value={formData.price}
            onChange={handleInputChange}
          />
          {errors.price && <div className="error">{errors.price}</div>}

          <label id="agencyLabel">Upload Image</label>
          <input
            type="file"
            className="form-control"
            id="image"
            onChange={handleImageChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </>
  );
};

export default Agency;
