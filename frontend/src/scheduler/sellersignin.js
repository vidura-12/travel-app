import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link for navigation
import './sellersignin.css';

const SellerSignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('packageSeller'); // Default role
  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send sign-in request to the backend
      const response = await fetch('http://localhost:8081/sellerlog/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed'); // Handle response error
      }

      const data = await response.json();
      const { token, role } = data;

      // Save token and user email in local storage
      localStorage.setItem('token', token);
      localStorage.setItem('email', email);
      alert(email)      // Redirect based on role
      switch (role) {
        case 'Hotel Owner':
          navigate('/admin-dashboard'); // Admin dashboard route
          break;
        case 'Tour Guide':
          navigate('/travelagent/dashGuide'); // Admin dashboard route
          break;
        case 'Travel Agency':
          navigate('/Sellersprofile'); // Event Manager dashboard route
          break;
        case 'Event Manager':
          navigate('/EventManager/Dashboard'); // Vehicle Owner dashboard route
          break;
        case 'Vehicle Owner':
          navigate('/vehicle-owner-dashboard');
          break;
        default:
          navigate('/package-seller-dashboard'); // Default to package seller dashboard
          break;
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('Login failed: ' + error.message);
    }
  };

  return (
    <div className='sel'>
      <div className='seller'>
        <div className="container mt-5">
          <center>
            <h2>Sign In</h2>
          </center>
        </div>
        <div className='sellercon'>
          <center>
            <form onSubmit={handleSubmit} className="mt-4">
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Password:</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-success">Sign In</button>
            </form>
            <div className="mt-3">
              <p>Don't have an account? <Link to="/sellersignup">Sign up here</Link></p> {/* Link to sign-up page */}
            </div>
          </center>
        </div>
      </div>
    </div>
  );
};

export default SellerSignIn;
