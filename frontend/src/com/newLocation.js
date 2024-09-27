import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import './l.css'; 

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

  const [message, setMessage] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);

  const formRef = useRef(null);
  const navigate = useNavigate(); // Use useNavigate hook

  useEffect(() => {
    const name = localStorage.getItem('name');
    if (!name) {
      alert('You need to log in first.');
      navigate("/home"); // Redirect to home page if not logged in
    }
    if (formRef.current) {
      formRef.current.classList.add('fade-in');
    }
  }, [navigate]); // Add navigate to the dependency array

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
      setMessage('Please correct the errors before submitting.');
      setAlertVisible(true);
      return;
    }
  
    const userName = localStorage.getItem('name');
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
      setMessage('Thanks for your support, we will notify you after we approve.');
      setAlertVisible(true);
  
      setFormData({
        name: '',
        city: '',
        description: '',
        picture: null,
      });
    } catch (error) {
      console.error('Error submitting the form', error);
      if (error.response && error.response.data && error.response.data.error) {
        setMessage(error.response.data.error);
      } else {
        setMessage('Error submitting the form');
      }
      setAlertVisible(true);
    }
  };

  return (
    <div className="body">
      <div className="container mt-5 form-background">
        <div className="card form-custom-margin form-transparent" ref={formRef}>
          <div className="card-header">
            <h3>Share Your Experience</h3>
          </div>
          <div className="card-body">
            {alertVisible && (
              <div className="alert alert-info alert-dismissible fade show" role="alert">
                {message}
                <button type="button" className="btn-close" aria-label="Close" onClick={() => setAlertVisible(false)}></button>
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-3">
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
                {errors.name && (
                  <div className="text-danger">{errors.name}</div>
                )}
                {errors.locationExists && (
                  <div className="text-danger">{errors.locationExists}</div>
                )}
              </div>
              <div className="form-group mb-3">
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
                {errors.city && (
                  <div className="text-danger">{errors.city}</div>
                )}
              </div>
              <div className="form-group mb-3">
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
              <div className="form-group mb-3">
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
              <button type="submit" className="custom-button">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newlocation;
