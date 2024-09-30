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

    // Validation logic
    let newValue = value;

    switch (name) {
      case 'name':
        // Only allow alphabet characters and ensure the first letter is capital
        newValue = value.replace(/[^a-zA-Z\s]/g, ''); // Remove non-alphabet characters
        if (newValue && newValue[0] !== newValue[0].toUpperCase()) {
          newValue = newValue.charAt(0).toUpperCase() + newValue.slice(1);
        }
        break;

      case 'email':
        // Ensure email starts with lowercase and allow valid email characters
        newValue = value.replace(/[^a-zA-Z0-9@._-]/g, ''); // Remove invalid email characters
        if (newValue && newValue[0] !== newValue[0].toLowerCase()) {
          newValue = newValue.charAt(0).toLowerCase() + newValue.slice(1);
        }
        break;

      case 'number':
        // Only allow numbers and restrict length to 10 digits
        newValue = value.replace(/\D/g, ''); // Remove non-digit characters
        if (newValue.length > 10) {
          newValue = newValue.slice(0, 10); // Limit to 10 digits
        }
        break;

      case 'password':
        // Only allow numbers and ensure at least 4 digits
        newValue = value.replace(/\D/g, ''); // Remove non-digit characters
        break;

      case 'address':
        // Ensure address starts with a capital letter
        newValue = value.replace(/[^a-zA-Z0-9\s]/g, ''); // Remove non-alphanumeric characters
        if (newValue && newValue[0] !== newValue[0].toUpperCase()) {
          newValue = newValue.charAt(0).toUpperCase() + newValue.slice(1);
        }
        break;

      default:
        break;
    }

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const guideSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8081/TourGuide/add', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      navigate('/profileGuide', { state: formData });

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
        <h2 className="text-center mb-4" style={{ fontWeight: 'bold', color: 'black' }}>Register Tour Guide</h2>
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
