import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const admin = { 
      username, 
      password
    };
  
    try {
      const response = await axios.post('http://localhost:8081/auth/login', admin);
      console.log('Response Data:', response.data);
      const role = response.data.role.trim();
      console.log('Role:', role);
  
      switch (role) {
        case 'locationmanager':
          navigate('/locationmanager/home');
          break;
        case 'hotelmanager':
          navigate('/hotelmanager/home');
          break;
        case 'admin':
          navigate('/admin/home');
          break;
        case 'usersupporter':
          navigate('/usersupporter/home');
          break;
        case 'scheduler':
          navigate('/scheduler/home');
          break;
        case 'travelagent':
          navigate('/travelagent/home');
          break;
        case 'vehiclerentle':
          navigate('/vehiclerentle/home');
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
    <div>
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
