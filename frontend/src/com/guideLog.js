import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
 
import axios from "axios"; 
import 'bootstrap/dist/css/bootstrap.min.css';

export default function GuideLog() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const guideSubmit = async (e) => {
    e.preventDefault();
    try { 
      const response = await axios.post("http://localhost:8081/TourGuide/login", { 
        email: formData.email,
        password: formData.password,
      });
 
      if (response && response.data.status === "ok") {
        alert("Login Success");
 
        // Store the guide ID in localStorage
        localStorage.setItem('loggedInGuideId', response.data.guideId);
        
        // Navigate to the profile page with the ID as a parameter
        navigate(`/profileGuide/${response.data.guideId}`);
      } else if (response.data.error) {
 
        alert(response.data.error); // User not found
      } else if (response.data.err) {
        alert(response.data.err); // Incorrect password
      } else {
        alert("Unexpected response from server");
      }
    } catch (err) {
      alert("Error: " + err.message); 
    }
  };

  return (
    <div style={{
      position: 'relative',
      backgroundImage: "url('/img/reglast.jpg')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '120vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        zIndex: 1
      }} />
      <form onSubmit={guideSubmit} style={{
        position: 'relative',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: '15px',
        padding: '30px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
 
        width: '90%', // Adjusted width for mobile responsiveness
        maxWidth: '600px',
 
        width: '600px', 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 2
      }}>
        <h2 className="text-center mb-4" style={{ fontWeight: 'bold', color: 'black' }}>Login Tour Guide</h2> 
        <div className="form-group-Guide mb-3" style={{ width: '100%' }}>
 
        <div className="form-group-Guide"> 
          <label>Email:</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div> 
        <div className="form-group-Guide mb-3" style={{ width: '100%' }}>

        <div className="form-group-Guide"> 
          <label>Password:</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button className="btn btn-primary w-100" type="submit" style={{ padding: '12px', fontSize: '18px', borderRadius: '30px', fontWeight: '600' }}>
          Login
        </button>
      </form>
    </div>
  );
}
