import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
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
  const [successMessage, setSuccessMessage] = useState('');

  // Handle form field changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    let newErrors = { ...errors };

    if (id === 'phoneNumber') {
      if (/^\d*$/.test(value) && value.length <= 10) {
        setFormData({
          ...formData,
          [id]: value,
        });
        newErrors.phoneNumber = ''; // Clear error if valid
      } else {
        newErrors.phoneNumber = 'Phone Number must be exactly 10 digits';
      }
      setErrors(newErrors);
    } else if (id === 'agencyName') {
      if (/^[a-zA-Z\s]*$/.test(value)) {
        setFormData({
          ...formData,
          [id]: value,
        });
        newErrors.agencyName = ''; // Clear error if valid
      } else {
        newErrors.agencyName = 'Agency Name must contain only letters and spaces'; // Set error message
      }
      setErrors(newErrors);
    } else {
      setFormData({
        ...formData,
        [id]: value,
      });
    }
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
    } else if (!/^[a-zA-Z\s]*$/.test(formData.agencyName)) {
      newErrors.agencyName = 'Agency Name must contain only letters and spaces';
      valid = false;
    }

    if (!formData.phoneNumber || formData.phoneNumber.length !== 10) {
      newErrors.phoneNumber = 'Phone Number must be exactly 10 digits';
      valid = false;
    }


    if (!formData.email) {
      newErrors.agencyName = 'Email is required';
      valid = false;
    } else if (!/^[a-z]+@[a-z]+\.[a-z]+$/.test(formData.email)) {
      newErrors.agencyName = 'Invalid email address: must contain only lowercase letters and "@"';
      valid = false;
    }


    if (!formData.location) {
      newErrors.location = 'Location Name is required';
      valid = false;
    } else if (!/^[a-zA-Z\s]*$/.test(formData.location)) {
      newErrors.location = 'Locat Name must contain only letters and spaces';
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

        window.alert('Your details have been submitted successfully!');
       
        

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

        setTimeout(() => setSuccessMessage(''), 3000);

      } catch (error) {
        console.error('Error submitting the form', error);
      }
    } else {
      console.log('Form validation failed', errors);
    }
  };

  return (
    <div className="travelagency">
      <div className='traveltitle'>
        <h1>Welcome Travel Agencies!</h1>
        <p>Customize the travel packages</p>
      </div>

      {successMessage && <div className="success-message">{successMessage}</div>}

      <form onSubmit={handleSubmit}>
        <div className="m1">
          <label>Name of the Travel Agency</label>
          <input
            type="text"
            className="form-control"
            id="agencyName"
            value={formData.agencyName}
            onChange={handleInputChange}
          />
          {errors.agencyName && <div className="error text-danger">{errors.agencyName}</div>}

          <label>Phone Number</label>
          <input
            type="tel"
            className="form-control"
            id="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
          />
          {errors.phoneNumber && <div className="error text-danger">{errors.phoneNumber}</div>}

          <label>Email Address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          {errors.email && <div className="error text-danger">{errors.email}</div>}
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>

          <label>Location</label>
          <input
            type="text"
            className="form-control"
            id="location"
            value={formData.location}
            onChange={handleInputChange}
          />
          {errors.location && <div className="error text-danger">{errors.location}</div>}

          <label>Places of Specific Location</label>
          {formData.places.map((place, index) => (
            <div key={index} className="place-input">
              <input
                type="text"
                className="form-control"
                value={place}
                onChange={(e) => handlePlaceChange(index, e.target.value)}
              />
              {errors.places && <div className="error text-danger">{errors.places}</div>}
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

          <label>Max People</label>
          <input
            type="number"
            className="form-control"
            id="maxPeople"
            value={formData.maxPeople}
            onChange={handleInputChange}
          />
          {errors.maxPeople && <div className="error text-danger">{errors.maxPeople}</div>}

          <label>Price</label>
          <input
            type="number"
            className="form-control"
            id="price"
            value={formData.price}
            onChange={handleInputChange}
          />
          {errors.price && <div className="error text-danger">{errors.price}</div>}

          <label>Upload Image</label>
          <input
            type="file"
            className="form-control"
            id="image"
            onChange={handleImageChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default Agency;
