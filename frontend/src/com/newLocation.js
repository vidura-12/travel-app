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

  const formRef = useRef(null); // Create a ref

  useEffect(() => {
    if (formRef.current) {
      formRef.current.classList.add('fade-in');
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
  
    let valid = true;
    let errorMessage = '';
  
    if (name === 'name' || name === 'city') {
      const regex = /^[a-zA-Z\s]*$/;
      if (!regex.test(value)) {
        valid = false;
        errorMessage = 'Please enter valid details !...';
      }
    }
  
    if (name === 'picture') {
      setFormData({
        ...formData,
        picture: files[0], // Update formData with the selected file
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  
    if (valid) {
      setErrors({
        ...errors,
        [name]: '',
      });
    } else {
      setErrors({
        ...errors,
        [name]: errorMessage,
      });
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      setMessage('Thanks for your support, we will notify after we approve.');
      setAlertVisible(true);
      setFormData({
        name: '',
        city: '',
        description: '',
        picture: null,
      });
    } catch (error) {
      console.error('Error submitting the form', error);
      setMessage('Error submitting the form');
      setAlertVisible(true);
    }
  };

  return (
    <div className= "body">
        <div className="container mt-5 form-background">
      <div className="card form-custom-margin form-transparent" ref={formRef}>
        <div className="card-header">
          <h3>Share Your experience</h3>
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
            <button type="submit" className="btn btn-primary">
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
