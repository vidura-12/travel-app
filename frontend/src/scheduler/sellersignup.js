import React, { useState } from 'react';
import './Sellersignup.css'; // Custom CSS file for additional styling
import 'bootstrap/dist/css/bootstrap.min.css';

const Sellersignup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState(''); // New state for success message

  // Validation function
  const validate = () => {
    let errors = {};

    // Agency Name validation (only letters)
    if (!name.trim()) {
      errors.name = 'Agency Name is required';
    } else if (!/^[A-Za-z]+$/.test(name.trim())) {
      errors.name = 'Agency Name can only contain letters';
    }

    // Email validation (must contain '@' and valid characters)
    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email address is invalid (must contain @ sign)';
    } else if (!/^[A-Za-z0-9@.]+$/.test(email)) {
      errors.email = 'Email can only contain letters, numbers, and @';
    }

    // Password validation (at least 8 characters)
    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }

    // Phone number validation (only digits and must be exactly 10 digits)
    if (!phone) {
      errors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(phone)) {
      errors.phone = 'Phone number must be exactly 10 digits long';
    }

    // Address validation
    if (!address.trim()) {
      errors.address = 'Address is required';
    } else if (!/[A-Za-z0-9 ]+/.test(address)) {
      errors.address = 'Address must contain letters and numbers';
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const sellerData = { name, email, password, phone, address };
      console.log('Form submitted', sellerData);

      // Retrieve existing sellers from localStorage
      const existingSellers = JSON.parse(localStorage.getItem('sellersData')) || [];

      // Add new seller to the list and save it to localStorage
      localStorage.setItem('sellersData', JSON.stringify([...existingSellers, sellerData]));

      // Set success message
      setSuccessMessage('Registration successful! You can now log in.');
      // Clear the form fields
      setName('');
      setEmail('');
      setPassword('');
      setPhone('');
      setAddress('');
    }
  };

  // Function to restrict agency name to letters only
  const handleNameChange = (e) => {
    const value = e.target.value;
    if (/^[A-Za-z]*$/.test(value)) {
      setName(value);
    }
  };

  // Function to restrict phone number to digits only
  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,10}$/.test(value)) {
      setPhone(value);
    }
  };

  return (
    <div className='seller'>
      <div className="sellersignup-container">
        <form onSubmit={handleSubmit}>
          <h2>Register</h2>

          {/* Display success message */}
          {successMessage && <div className="alert alert-success">{successMessage}</div>}

          {/* Agency Name */}
          <div className="sellerform-group">
            <label>Agency Name</label>
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              placeholder="Enter Agency Name"
              className="form-control"
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>

          {/* Email */}
          <div className="sellerform-group">
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
          <div className="sellerform-group">
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
          <div className="sellerform-group">
            <label>Phone Number</label>
            <input
              type="text"
              value={phone}
              onChange={handlePhoneChange}
              placeholder="Enter Phone Number"
              className="form-control"
            />
            {errors.phone && <span className="error">{errors.phone}</span>}
          </div>

          {/* Address */}
          <div className="sellerform-group">
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
          <center>
            <p>Already Have an Account?</p>
          </center>
          <div className='sellog'>
            <center>
              <a href="/login">Login here</a>
            </center>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Sellersignup;
