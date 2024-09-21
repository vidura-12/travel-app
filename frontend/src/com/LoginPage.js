// com/LoginPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:8081/user/login_user', { email, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('name', response.data.name); // Store user name
      setSuccess('Login successful!');
      setError('');
      navigate('/home');
    } catch (err) {
      setError('Login failed. Please check your credentials.');
      console.error(err);
    }
  };
  

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Welcome</h2>
        <div className="profile-image">
          <img src="https://via.placeholder.com/100" alt="Profile" />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="text"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="forgot-password">
            <a href="#">Forgot your password?</a>
          </div>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
          <button type="submit" className="login-btn">LOGIN</button>
          <div className="signup-link">
            <span>Don’t have an account?</span> <a href="/signuppage">SIGN UP</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
