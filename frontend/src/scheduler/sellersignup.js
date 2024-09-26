import React, { useState } from 'react';
import './Sellersignup.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Sellersignup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [errors, setErrors] = useState({});

  // Validation function
  const validate = () => {
    let errors = {};

    // Name validation
    if (!name.trim()) {
      errors.name = 'Agency Name is required';
    }

    // Email validation
    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email address is invalid';
    }

    // Password validation
    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    // Phone number validation (only digits and 10 digits length)
    if (!phone) {
      errors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(phone)) {
      errors.phone = 'Phone number must be 10 digits long';
    }

    // Address validation
    if (!address.trim()) {
      errors.address = 'Address is required';
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log('Form submitted', { name, email, password, phone, address });
      // Submit form logic here
    }
  };

  return (
    <div className='seller'>
    <div className="signup-container">
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>

        {/* Agency Name */}
        <div className="form-group">
          <label>Agency Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Agency Name"
            className="form-control"
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        {/* Email */}
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
            className="form-control"
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        {/* Password */}
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
            className="form-control"
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>

        {/* Phone Number */}
        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter Phone Number"
            className="form-control"
          />
          {errors.phone && <span className="error">{errors.phone}</span>}
        </div>

        {/* Address */}
        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter Address"
            className="form-control"
          />
          {errors.address && <span className="error">{errors.address}</span>}
        </div>
       <div className='sellbtn'>
        <button type="submit" className="sellerbutton">Register</button>
        </div>
       
        <p>Already Have an Account?</p> 
        <div className='sellog'>
        <a href="/login">Login here</a>
        </div>
      </form>
    </div>
    </div>
  );
};

export default Sellersignup;