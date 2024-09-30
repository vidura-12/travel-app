import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import Swal from 'sweetalert2'; // Import SweetAlert
import './l.css'; // Updated CSS is referenced here

const Newlocation = () => {
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    description: '',
    picture: null,
  });

  const [errors, setErrors] = useState({
    name: '',
    city: '',
    locationExists: '',
  });

  const formRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem('email');
    if (!email) {
      Swal.fire('You need to log in first.', '', 'warning');
      navigate("/home");
    }
    if (formRef.current) {
      formRef.current.classList.add('fade-in');
    }
  }, [navigate]);

  const validateField = (name, value) => {
    let valid = true;
    let errorMessage = '';

    if (name === 'name' || name === 'city') {
      const regex = /^[a-zA-Z\s]*$/;
      if (!regex.test(value)) {
        valid = false;
        errorMessage = 'Please enter valid details!';
      }
    }

    return { valid, errorMessage };
  };

  const checkLocationExists = async (name) => {
    if (name) {
      try {
        const response = await axios.get(`http://localhost:8081/Location/check?name=${name}`);
        if (response.data.exists) {
          setErrors((prev) => ({ ...prev, locationExists: 'Location name already exists' }));
        } else {
          setErrors((prev) => ({ ...prev, locationExists: '' }));
        }
      } catch (error) {
        console.error('Error checking location existence', error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'picture') {
      setFormData({
        ...formData,
        picture: files[0],
      });
    } else {
      const { valid, errorMessage } = validateField(name, value);
      setFormData({
        ...formData,
        [name]: value,
      });

      setErrors({
        ...errors,
        [name]: valid ? '' : errorMessage,
      });

      if (name === 'name') {
        checkLocationExists(value);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nameValidation = validateField('name', formData.name);
    const cityValidation = validateField('city', formData.city);

    if (!nameValidation.valid || !cityValidation.valid || errors.locationExists) {
      setErrors({
        name: nameValidation.errorMessage,
        city: cityValidation.errorMessage,
        locationExists: errors.locationExists,
      });
      Swal.fire('Please correct the errors before submitting.', '', 'error');
      return;
    }

    const userName = localStorage.getItem('email');
    const data = new FormData();
    data.append('name', formData.name);
    data.append('city', formData.city);
    data.append('description', formData.description);
    data.append('picture', formData.picture);
    data.append('addedBy', userName);

    try {
      const response = await axios.post('http://localhost:8081/Location/add', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      Swal.fire('Thanks for your support, we will notify you after we approve.', '', 'success');

      setFormData({
        name: '',
        city: '',
        description: '',
        picture: null,
      });
    } catch (error) {
      console.error('Error submitting the form', error);
      const errorMessage = error.response && error.response.data && error.response.data.error
        ? error.response.data.error
        : 'Error submitting the form';
      Swal.fire(errorMessage, '', 'error');
    }
  };

  return (
    <div className="body12">
      <div className="location-form-container" ref={formRef}>
        <div className="location-form-card-header">
          <h3>Share Your Experience</h3>
        </div>
        <div className="location-form-body">
          <form onSubmit={handleSubmit} ref={formRef}>
            <div className="location-form-group">
              <label htmlFor="name">Location Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              {errors.name && <div className="location-form-error">{errors.name}</div>}
              {errors.locationExists && <div className="location-form-error">{errors.locationExists}</div>}
            </div>

            <div className="location-form-group">
              <label htmlFor="city">Location City</label>
              <input
                type="text"
                className="form-control"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
              {errors.city && <div className="location-form-error">{errors.city}</div>}
            </div>

            <div className="location-form-group">
              <label htmlFor="description">Description about Location</label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                rows="3"
                value={formData.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <div className="location-form-group">
              <label htmlFor="picture">Picture</label>
              <input
                type="file"
                className="form-control"
                id="picture"
                name="picture"
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="unique-button">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Newlocation;
