import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function VehicleOwnerRegister() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8081/vehicle-owner/register', { username, email, password });
      localStorage.setItem('token', response.data.token);
      navigate('/vehicle-owner/login'); 
    } catch (error) {
      console.error('Registration failed:', error.response.data);
    }
  };

  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundImage: 'url(https://www.rentallsoftware.com/wp-content/uploads/2020/10/type-car-rental.jpg)', 
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  const boxStyle = {
    width: '100%',
    maxWidth: '400px',
    padding: '40px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  };

  const inputGroupStyle = {
    marginBottom: '15px',
  };

  const labelStyle = {
    display: 'block',
    fontSize: '14px',
    color: '#555',
    marginBottom: '5px',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  };

  const buttonStyle = {
    width: '100%',
    padding: '10px',
    backgroundColor: '#4d4d3c',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  };

  const buttonStylelogin= {
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
    backgroundColor: '#39392d',
  };

  return (
    <div style={containerStyle}>
      <div style={boxStyle}>
        <h2>Vehicle Owner Register</h2>
        <form onSubmit={handleSubmit}>
          <div style={inputGroupStyle}>
            <label htmlFor="username" style={labelStyle}>Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={inputStyle}
            />
          </div>
          <div style={inputGroupStyle}>
            <label htmlFor="email" style={labelStyle}>Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            Register
          </button>
          <button
            type="submit"
            style={buttonStylelogin}
            onClick={() => window.location.href = '/vehicle-owner/login'}
          >
          Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default VehicleOwnerRegister;
