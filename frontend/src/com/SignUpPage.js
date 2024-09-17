import React, { useState } from 'react';
import axios from 'axios';
import './SignUpPage.css';

const SignUpPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8081/auth/signup', {
        name,
        email,
        password,
      });

      // Assuming the backend sends a success message
      setSuccess(response.data.message);
      setError('');
    } catch (err) {
      console.error('Error signing up:', err.response ? err.response.data : err.message);
      setError(err.response ? err.response.data.message : 'An error occurred');
      setSuccess('');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form-container">
        <h2>SIGN UP</h2>
        <form onSubmit={handleSignUp}>
          <div className="input-group">
            <input 
              type="text" 
              placeholder="Name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="input-group">
            <input 
              type="email" 
              placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="input-group">
            <input 
              type="password" 
              placeholder="Confirm Password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="terms-group">
            <input type="checkbox" id="terms" />
            <label htmlFor="terms">
              Creating an account means you agree with our terms of service, privacy policy, and our default notification settings.
            </label>
          </div>
          <button type="submit" className="signup-button">SIGN UP</button>
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
        </form>
      </div>
      <div className="animation-container">
        <div className="flying-plane"></div>
      </div>
    </div>
  );
};

export default SignUpPage;
