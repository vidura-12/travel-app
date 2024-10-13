import React, { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function VehicleOwnerLogin() {
  //const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8081/api/vehicle-owner/login', {
        email,
        password,
      });

      const { token } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('vehicleOwner', JSON.stringify({ email }));

      const decodedToken = jwtDecode(token);
      console.log('Decoded Token:', decodedToken);

      window.location.href = '/vehicle-owner-dashboard';
    } catch (err) {
      console.error('Login Error:', err.response);
      setError('Login failed');
      setSuccess('');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
    marginBottom: '15px',
    position: 'relative', // Ensures the icon stays within the input
    width: '100%'
  };

  const labelStyle_1 = {
    display: 'block',
    fontSize: '14px',
    color: '#555',
    marginBottom: '-7px'
  };

  const labelStyle_2 = {
    display: 'block',
    fontSize: '14px',
    color: '#555',
    marginTop: '-10px',
    marginBottom: '-7px'
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
    marginTop: '10px',
    marginLeft: '0px'
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

  const vehicle_h2 = {  
    fontSize: '30px',
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    //margin: '10px',
   //marginTop: '0px'
  };

  const iconStyle = {
    position: 'absolute',
    right: '20px',
    top: '58%',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
  };

  return (
    <div>

    <div style={containerStyle}>
      <div style={boxStyle}>
        <h2 style={vehicle_h2}>Vehicle Owner Login</h2>
        {error && <p style={errorStyle}>{error}</p>}
        {success && <p style={successStyle}>{success}</p>}
        <form onSubmit={handleSubmit}>
          <div style={inputGroupStyle}>
            <label htmlFor="email" style={labelStyle_1}>Email:</label>
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
            <label htmlFor="password" style={labelStyle_2}>Password:</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={inputStyle}
            />
            <span onClick={togglePasswordVisibility} style={iconStyle}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
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
            type="submit"
            style={buttonStyleRegister}
            onClick={() => window.location.href = '/vehicle-owner/register'}>
            Register
          </button>
        </form>
      </div>
    </div>
    </div>
  );
}

export default VehicleOwnerLogin;
