import React, { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Correct the import statement for jwtDecode

function VehicleOwnerLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handler for username input to allow only letters
  const handleUsernameChange = (e) => {
    const { value } = e.target;
    if (/^[a-zA-Z]*$/.test(value)) {
      setUsername(value); // Update state only if value is valid
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8081/vehicle-owner/login', {
        username,
        password,
      });

      const { token } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('vehicleOwner', JSON.stringify({ username }));

      const decodedToken = jwtDecode(token);
      console.log('Decoded Token:', decodedToken);

      setSuccess('Login successful! Redirecting...');
      setError(''); // Clear the error
      setTimeout(() => {
        window.location.href = '/vehicle-owner-dashboard';
      }, 1000); // Delay for 1 second before redirecting
    } catch (err) {
      console.error('Login Error:', err);
      if (err.response && err.response.data && err.response.data.msg) {
        setError(err.response.data.msg); // Display the backend error message
      } else {
        setError('Login failed. Please check your credentials.');
      }
      setSuccess('');
    }
  };

  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundImage: 'url(https://www.rentallsoftware.com/wp-content/uploads/2020/10/type-car-rental.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  };

  const boxStyle = {
    width: '100%',
    maxWidth: '400px',
    padding: '40px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center'
  };

  const inputGroupStyle = {
    marginBottom: '15px'
  };

  const labelStyle = {
    display: 'block',
    fontSize: '14px',
    color: '#555',
    marginBottom: '5px'
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px'
  };

  const buttonStyle = {
    width: '100%',
    padding: '10px',
    backgroundColor: '#4d4d3c',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px'
  };

  const buttonStyleRegister = {
    width: '100%',
    padding: '10px',
    backgroundColor: '#bdb76b',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '10px'
  };

  const buttonHoverStyle = {
    backgroundColor: '#39392d'
  };

  const errorStyle = {
    color: 'red',
    fontSize: '14px',
    marginBottom: '10px'
  };

  const successStyle = {
    color: 'green',
    fontSize: '14px',
    marginBottom: '10px'
  };

  return (
    <div style={containerStyle}>
      <div style={boxStyle}>
        <h2>Vehicle Owner Login</h2>
        {error && <p style={errorStyle}>{error}</p>}
        {success && <p style={successStyle}>{success}</p>}
        <form onSubmit={handleSubmit}>
          <div style={inputGroupStyle}>
            <label htmlFor="username" style={labelStyle}>Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange} // Updated onChange handler
              required
              style={inputStyle}
            />
          </div>
          <div style={inputGroupStyle}>
            <label htmlFor="password" style={labelStyle}>Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={inputStyle}
            />
          </div>
          <button
            type="submit"
            style={buttonStyle}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}
          >
            Login
          </button>
          <button
            type="button" // Prevent form submission with this button
            style={buttonStyleRegister}
            onClick={() => window.location.href = '/vehicle-owner/register'}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default VehicleOwnerLogin;
