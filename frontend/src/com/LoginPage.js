import React, { useState } from 'react';
import axios from 'axios'; // For HTTP requests
import './LoginPage.css'; // Custom CSS styles

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error message

    try {
      // Make an HTTP POST request to the login API
      const response = await axios.post('http://localhost:8081/auth/login', {
        email,
        password,
      });

      // Store JWT token in localStorage
      localStorage.setItem('token', response.data.token);

      // Redirect to a protected page (home page)
      window.location.href = '/home';
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError('Invalid email or password');
      } else {
        setError('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
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

          {/* Display error message */}
          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-btn">LOGIN</button>
          <div className="signup-link">
            <span>Don’t have an account?</span> <a href="/signup">SIGN UP</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
