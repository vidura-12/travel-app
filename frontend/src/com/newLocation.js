import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
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
  });

  const [message, setMessage] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);

  const formRef = useRef(null);

  useEffect(() => {
    if (formRef.current) {
      formRef.current.classList.add('fade-in');
    }
  }, []);

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
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nameValidation = validateField('name', formData.name);
    const cityValidation = validateField('city', formData.city);

    if (!nameValidation.valid || !cityValidation.valid) {
      setErrors({
        name: nameValidation.errorMessage,
        city: cityValidation.errorMessage,
      });
      setMessage('Please correct the errors before submitting.');
      setAlertVisible(true);
      return;
    }

    const data = new FormData();
    data.append('name', formData.name);
    data.append('city', formData.city);
    data.append('description', formData.description);
    data.append('picture', formData.picture);

    try {
      const response = await axios.post('http://localhost:8081/Location/add', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('Thanks for your support, we will notify you after we approve.');
      setTimeout(() => setAlertVisible(true), 0);  // Add a slight delay to ensure state update

      setFormData({
        name: '',
        city: '',
        description: '',
        picture: null,
      });
    } catch (error) {
      console.error('Error submitting the form', error);
      setMessage('Error submitting the form');
      setTimeout(() => setAlertVisible(true), 0);  // Add a slight delay to ensure state update
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
                <label htmlFor="name">Name</label>
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
              </div>
              <div className="form-group mb-3">
                <label htmlFor="city">City</label>
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
                <label htmlFor="description">Description</label>
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
