import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Importing eye icons for password visibility
import './AdminLogin.css';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    const isValid = /^[A-Za-z]+$/.test(value);

    if (isValid) {
      setUsernameError('');
    } else {
      setUsernameError('Username should only contain characters.');
    }

    setUsername(value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (usernameError) {
      return;
    }

    const admin = { 
      username, 
      password 
    };

    try {
      const response = await axios.post('http://localhost:8081/auth/login', admin);
      console.log('Response Data:', response.data);

      // Store the token in localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', response.data.username.trim());
      const role = response.data.role.trim();

      switch (role) {
        case 'location_manager':
          navigate('/LocationAdmin/home');
          break;
        case 'Schedule_Manager':
          navigate('/scheduladmin');
          break;
        case 'event_manager':
          navigate('/EventManager/addEvent');
          break;
        case 'vehicle_manager':
          navigate('/dvbxbjkds');
          break;
          case 'tourGuide_manager':
          navigate('/travelagent/dashboard');
          break;
          case 'support_manager':
            navigate('/usersupporter/dashboard');
            break;
          
        default:
          setError('Unknown role');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Invalid username or password');
      } else {
        setError('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="admin-login-container">
      <h2 className="admin-login-title">Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group admin-login-form-group">
        <h6>user name</h6>
          <div className="input-container">
          
            <input
              type="text"
              className={`form-control admin-login-input ${username ? 'filled' : ''}`}
              id="username"
              placeholder=" " // Blank placeholder for compatibility
              value={username}
              onChange={handleUsernameChange}
              required
            />
            <label htmlFor="username" className="placeholder">Enter User Name</label>
          </div>
          {usernameError && <small className="text-danger admin-login-error">{usernameError}</small>}
        </div>
        <div className="form-group admin-login-form-group">
        <h6 >Password</h6>
          <div className="input-container">
          
            <input
              type={showPassword ? 'text' : 'password'} // Show password or not based on state
              className={`form-control admin-login-input ${password ? 'filled' : ''}`}
              id="password"
              placeholder=" " // Blank placeholder for compatibility
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="password" className="placeholder">Password</label>
            <span
              className="password-icon"
              onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>
        <div className="form-group form-check admin-login-form-group">
          <input
            type="checkbox"
            className="form-check-input"
            id="checkMeOut"
          />
          <label className="form-check-label admin-login-check-label" htmlFor="checkMeOut">
            Check me out
          </label>
        </div>
        {error && <p className="text-danger admin-login-error">{error}</p>}
        <button type="submit" className="btn admin-login-button">Submit</button>
      </form>
    </div>
  );
};

export default AdminLogin;
