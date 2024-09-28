import React, { useState } from 'react';
import './Sellersignup.css'; // Custom CSS if needed
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Sellersignup = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [role, setRole] = useState('');
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  // Validation function
  const validate = () => {
    let errors = {};
    
    if (!name.trim()) errors.name = 'Agency Name is required';
    if (!email.trim()) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = 'Email address is invalid';
    if (!password) errors.password = 'Password is required';
    else if (password.length < 6) errors.password = 'Password must be at least 6 characters';
    if (!phone) errors.phone = 'Phone number is required';
    else if (!/^\d{10}$/.test(phone)) errors.phone = 'Phone number must be 10 digits long';
    if (!address.trim()) errors.address = 'Address is required';
    if (!role) errors.role = 'Role is required';

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const userData = { name, email, password, phone, address, role };
      
      try {
        // Make POST request to the server (Optional)
        const response = await axios.post('http://localhost:8081/sellerlog/signup', userData);
        console.log('Response:', response.data);
        
        // Save seller data to localStorage
        const savedSellers = JSON.parse(localStorage.getItem('sellersData')) || [];
        localStorage.setItem('sellersData', JSON.stringify([...savedSellers, userData]));

        // Show alert on successful registration
        alert('Registration successful! Please log in.');

        // Navigate to login page
        navigate('/scheduler/sellersignin');
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('Error registering user. Please try again.');
      }
    }
  };

  return (
    <div className='sellers'>
      <div className='sellersignup-page'>
        <div className="signup-container">
          <form onSubmit={handleSubmit} className="signup-form">
            <h2 className="text-center">Register</h2>

            {/* Agency Name */}
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Name"
                className="form-control"
              />
              {errors.name && <span className="text-danger">{errors.name}</span>}
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
              {errors.email && <span className="text-danger">{errors.email}</span>}
            </div>

            {/* Password */}
            <div className="form-group position-relative">
              <label>Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                className="form-control"
              />
              <span 
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
              </span>
              {errors.password && <span className="text-danger">{errors.password}</span>}
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
              {errors.phone && <span className="text-danger">{errors.phone}</span>}
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
              {errors.address && <span className="text-danger">{errors.address}</span>}
            </div>

            {/* Role Dropdown */}
            <div className="form-group">
              <label>Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="form-control"
              >
                <option value="">Select Role</option>
                <option value="Travel Agency">Travel Agency</option>
                <option value="Event Manager">Event Manager</option>
                <option value="Vehicle Owner">Vehicle Owner</option>
                <option value="Hotel Owner">Hotel Owner</option>
              </select>
              {errors.role && <span className="text-danger">{errors.role}</span>}
            </div>

            <div className='s'>
              <div className='text-center'>
                <button type="submit" className="btn btn-primary">Register</button>
              </div>
            </div>
            <p className="text-center mt-3">Already Have an Account?</p>
            <div className='text-center'>
              <a href="/scheduler/sellersignin" className="btn btn-link">Login here</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Sellersignup;
