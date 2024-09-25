import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [usernameError, setUsernameError] = useState('');
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
          navigate('/LocationAdmin/home');
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
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">User Name</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter User Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group form-check">
          <input
            type="checkbox"
            className="form-check-input"
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Check me out
          </label>
        </div>
        {error && <p className="text-danger">{error}</p>}
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default AdminLogin;