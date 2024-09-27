import React, { useState } from 'react'; 
import axios from 'axios';
//import './signup.css'; // Import the CSS file

function SignUp() {
  const [formData, setFormData] = useState({
    name: '', dob: '', age: '', gender: '', contact: '', NIC: '', email: '', password: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Full Name is required';
    if (!formData.dob) newErrors.dob = 'Date of Birth is required';
    if (!formData.age) newErrors.age = 'Age is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.contact) newErrors.contact = 'Contact Number is required';
    if (!formData.NIC) newErrors.NIC = 'NIC is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await axios.post('http://localhost:8081/api/auth/register', formData);
      alert('Registration successful');
    } catch (error) {
      console.error('There was an error registering!', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="container">
        <div className="form-container">
          <h2 className="form-title">Sign Up</h2>
          <form onSubmit={handleSubmit} className="form">
            {/* Full Name */}
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                className={`input ${errors.name ? 'input-error' : ''}`}
                required
              />
              {errors.name && <p className="error-message">{errors.name}</p>}
            </div>

            {/* Date of Birth */}
            <div className="form-group">
              <label htmlFor="dob">Date of Birth</label>
              <input
                type="date"
                name="dob"
                id="dob"
                value={formData.dob}
                onChange={handleChange}
                className={`input ${errors.dob ? 'input-error' : ''}`}
                required
              />
              {errors.dob && <p className="error-message">{errors.dob}</p>}
            </div>

            {/* Gender and NIC */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="gender">Gender</label>
                <input
                  type="text"
                  name="gender"
                  id="gender"
                  placeholder="Enter your gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className={`input ${errors.gender ? 'input-error' : ''}`}
                  required
                />
                {errors.gender && <p className="error-message">{errors.gender}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="NIC">NIC</label>
                <input
                  type="text"
                  name="NIC"
                  id="NIC"
                  placeholder="Enter your NIC"
                  value={formData.NIC}
                  onChange={handleChange}
                  className={`input ${errors.NIC ? 'input-error' : ''}`}
                  required
                />
                {errors.NIC && <p className="error-message">{errors.NIC}</p>}
              </div>
            </div>

            {/* Age and Contact */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="age">Age</label>
                <input
                  type="number"
                  name="age"
                  id="age"
                  placeholder="Enter your age"
                  value={formData.age}
                  onChange={handleChange}
                  className={`input ${errors.age ? 'input-error' : ''}`}
                  required
                />
                {errors.age && <p className="error-message">{errors.age}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="contact">Contact</label>
                <input
                  type="text"
                  name="contact"
                  id="contact"
                  placeholder="Enter your contact number"
                  value={formData.contact}
                  onChange={handleChange}
                  className={`input ${errors.contact ? 'input-error' : ''}`}
                  required
                />
                {errors.contact && <p className="error-message">{errors.contact}</p>}
              </div>
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className={`input ${errors.email ? 'input-error' : ''}`}
                required
              />
              {errors.email && <p className="error-message">{errors.email}</p>}
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className={`input ${errors.password ? 'input-error' : ''}`}
                required
              />
              {errors.password && <p className="error-message">{errors.password}</p>}
            </div>

            {/* Sign Up Button */}
            <button type="submit" className="submit-btn">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
