import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './SignUpPage.css';

const SignUpPage = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false, // Add terms to state
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false); // Loading state

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword, terms } = formData;

    if (!terms) {
      setError('You must agree to the terms of service.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true); // Set loading before the request
    try {
      const response = await axios.post('http://localhost:8081/user/signup_user', {
        name,
        email,
        password,
      });
      setSuccess('Signup successful! You can now log in.');
      setError('');
      setFormData({ name: '', email: '', password: '', confirmPassword: '', terms: false }); // Reset form
      navigate('/login'); // Redirect after successful signup
    } catch (err) {
      setError('Signup failed. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form-container">
        <h2>SIGN UP</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className="terms-group">
            <input
              type="checkbox"
              name="terms"
              id="terms"
              checked={formData.terms} // Set checked state from formData
              onChange={handleChange} // Handle change
              required
            />
            <label htmlFor="terms">
              Creating an account means you agree with our terms of service, privacy policy, and our default notification settings.
            </label>
          </div>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
          <button type="submit" className="signup-button" disabled={loading}>
            {loading ? 'Signing Up...' : 'SIGN UP'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
