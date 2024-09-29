import React, { useState } from 'react';
import axios from 'axios';

export default function HotelOwnerLoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); // For feedback messages
  const [loading, setLoading] = useState(false); // For showing loading state

  // Validate email format (optional)
  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const login = async () => {
    // Basic validation for empty fields
    if (!email || !password) {
      setMessage('All fields are required!');
      return;
    }

    if (!isValidEmail(email)) {
      setMessage('Please enter a valid email!');
      return;
    }

    const hotelOwnerCredentials = { email, password };

    try {
      setLoading(true);
      setMessage('Logging in...');

      // Call the login API with the full URL
      const { data } = await axios.post('http://localhost:8081/api/hotelOwners/login', hotelOwnerCredentials);

      setMessage('Login successful!');

      // Store the token in localStorage (or sessionStorage)
      localStorage.setItem('token', data.token);

      // Clear the input fields
      setEmail('');
      setPassword('');

      // Redirect to dashboard or another page (if required)
      setTimeout(() => {
        window.location.href = '/hotelowner/dashboard'; // Change "/dashboard" as needed
      }, 1000);
    } catch (error) {
      setLoading(false); // Stop loading state
      const errMsg = error.response?.data?.message || 'Login failed. Please try again.';
      setMessage(errMsg);
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="login">
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5 text-left shadow-lg p-3 mb-5 bg-white rounded">
          <h2 className="text-center m-2" style={{ fontSize: '35px' }}>
            Hotel Owner Login
          </h2>

          {/* Display feedback message */}
          {message && <div className="alert alert-info">{message}</div>}

          <div>
            <input
              required
              type="email"
              placeholder="Email"
              className="form-control mt-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="form-control mt-1"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              onClick={login}
              className="btn btn-primary rounded-pill mt-3 mb-3"
              disabled={loading} // Disable the button when loading
            >
              {loading ? 'Logging in...' : 'LOGIN'}
            </button>
            <br />
            <a style={{ color: 'black' }} href="/register-hotel-owner">
              Don't have an account? Register here
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
