import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    number: '',
    experience: '',
    language: '',
    username: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const guideSubmit = async (e) => {
    e.preventDefault();

    // Validation logic
    const { name, email, number, password, address } = formData;

    // Check if name starts with a capital letter
    if (!/^[A-Z].*/.test(name)) {
      alert('Name must start with a capital letter.');
      return;
    }

    // Check if email starts with a lowercase letter
    if (!/^[a-z].*/.test(email)) {
      alert('Email must start with a lowercase letter.');
      return;
    }

    // Check if number has exactly 10 digits
    if (!/^\d{10}$/.test(number)) {
      alert('Contact number must be exactly 10 digits long.');
      return;
    }

    // Check if password has at least 4 digits
    if (!/\d{4,}/.test(password)) {
      alert('Password must contain at least 4 digits.');
      return;
    }

    // Check if address starts with a capital letter
    if (!/^[A-Z].*/.test(address)) {
      alert('Address must start with a capital letter.');
      return;
    }

    try {
      await axios.post('http://localhost:8081/TourGuide/add', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      navigate('/GuideLogin', { state: formData });

      setFormData({
        name: '',
        email: '',
        address: '',
        number: '',
        experience: '',
        language: '',
        username: '',
        password: ''
      });
    } catch (error) {
      console.error('Error submitting the form', error);
    }
  };

  return (
    <div style={{
      position: 'relative',
      backgroundImage: "url('/img/reglast.jpg')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '120vh', // Increased height to 120vh for a taller page
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      {/* Low-light overlay with increased light */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.3)', // Adjusted opacity for lighter overlay
        zIndex: 1 // Ensure it’s above the background
      }} />

      <form onSubmit={guideSubmit} style={{
        position: 'relative',
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background
        borderRadius: '15px',
        padding: '30px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)', // Shadow for depth
        width: '600px', // Adjust width for a more compact form
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 2 // Ensure the form is above the overlay
      }}>
        <h2 className="text-center mb-4" style={{ fontWeight: 'bold' , color:'black' }}>Register Tour Guide</h2>
        {Object.keys(formData).map((key) => (
          <div key={key} style={{ display: 'flex', alignItems: 'center', marginBottom: '15px', width: '100%' }}>
            <label 
              className="form-label" 
              style={{ width: '150px', fontWeight: '600', marginRight: '10px' }} // Adjusted width for label
            >
              {`Tour Guide ${key.charAt(0).toUpperCase() + key.slice(1)}`}
            </label>
            {key === 'language' ? (
              <select
                className="form-control" 
                style={{ borderRadius: '30px', flex: 1, padding: '10px', height: '50px' }} // Distinct dropdown style
                name={key}
                value={formData[key]}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Select Language</option>
                <option value="Sinhala">Sinhala</option>
                <option value="English">English</option>
                <option value="Tamil">Tamil</option>
                <option value="Japanese">Japanese</option>
                <option value="Korean">Korean</option>
                <option value="Chinese">Chinese</option>
              </select>
            ) : (
              <input
                className="form-control" 
                style={{ borderRadius: '30px', flex: 1 }} // Rounded input
                type={key === 'password' ? 'password' : 'text'}
                name={key}
                value={formData[key]}
                onChange={handleChange}
                required
              />
            )}
          </div>
        ))}
        <button
          className="btn btn-primary w-100" 
          type="submit"
          style={{ padding: '12px', fontSize: '18px', borderRadius: '30px', fontWeight: '600' }} // Button with padding and rounded corners
        >
          Register
        </button>
      </form>
    </div>
  );
}
