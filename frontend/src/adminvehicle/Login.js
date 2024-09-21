import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8081/login', { username, password });
      localStorage.setItem('vehicleOwner', JSON.stringify({ username, token: response.data.token }));
      const role = getRoleFromToken(response.data.token);

      if (role === 'admin') {
        navigate('/adminDashboard');
      } else {
        navigate('/'); 
      }
    } catch (error) {
      console.error('Login failed:', error.response.data);
      setErrorMessage(error.response.data.message || 'An error occurred. Please try again.');
      setShowModal(true);
    }
  };

  const getRoleFromToken = (token) => {
    if (token) {
      const decoded = JSON.parse(atob(token.split('.')[1]));
      return decoded.role;
    }
    return null;
  };

  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundImage: 'url(https://images.squarespace-cdn.com/content/v1/58cfd41c17bffcb09bd654f0/1716730657161-LZBSBCQCDSZMP2G0C73L/image-asset.jpeg)', // Update with your image URL
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

  const imageStyle = {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    marginBottom: '20px'
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

  const forgotPasswordStyle = {
    textAlign: 'right',
    marginBottom: '20px'
  };

  const forgotPasswordLinkStyle = {
    color: '#777',
    textDecoration: 'none',
    fontSize: '12px'
  };

  const buttonStyle = {
    width: '100%',
    padding: '10px',
    backgroundColor: '#4d4d3c',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  };

  const buttonHoverStyle = {
    backgroundColor: '#39392d'
  };

  const signupLinkStyle = {
    textAlign: 'center',
    marginTop: '15px'
  };

  const signupLinkAnchorStyle = {
    color: '#9a6b5b',
    textDecoration: 'none',
    fontWeight: 'bold'
  };

  const signupLinkHoverStyle = {
    textDecoration: 'underline'
  };

  // Modal Styles
  const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  };

  const modalContentStyle = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    width: '300px',
    textAlign: 'center',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
  };

  const modalButtonStyle = {
    marginTop: '15px',
    padding: '10px 20px',
    backgroundColor: '#4d4d3c',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  };

  const closeModal = () => {
    setShowModal(false); 
    setErrorMessage(''); 
  };

  return (
    <div style={containerStyle}>
      <div style={boxStyle}>
        <h2>Login</h2>
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
        </form>
      </div>

      {/* Error Modal */}
      {showModal && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle}>
            <h3>Login Failed</h3>
            <p>{errorMessage}</p>
            <button onClick={closeModal} style={modalButtonStyle}>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
