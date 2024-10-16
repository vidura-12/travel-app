import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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
        // Allow only alphabet characters and spaces
        newValue = value.replace(/[^a-zA-Z\s]/g, ''); 
        // Capitalize first letter 
        if (newValue && newValue[0] !== newValue[0].toUpperCase()) {
          newValue = newValue.charAt(0).toUpperCase() + newValue.slice(1);
        }
        break;

      case 'email': 
        // Allow valid email characters
        newValue = value.replace(/[^a-z0-9._%+-@]/g, ''); // Lowercase letters, digits, and valid email characters
        break;

      case 'address':
        // Allow alphanumeric characters, spaces, and some punctuation
        newValue = value.replace(/[^a-zA-Z0-9\s.,-]/g, ''); // Alphanumeric, spaces, periods, commas, hyphens
        // Capitalize first letter 
        if (newValue && newValue[0] !== newValue[0].toUpperCase()) {
          newValue = newValue.charAt(0).toUpperCase() + newValue.slice(1);
        }
        break;

      case 'number':
        newValue = value.replace(/\D/g, '');
        if (newValue.length > 10) {
          newValue = newValue.slice(0, 10);
        }
        break;

      case 'experience': 
        // Allow only numbers (for years of experience)
        newValue = value.replace(/\D/g, ''); // Remove non-digit characters
        break;

      case 'username':
        // Allow alphanumeric characters, underscores, and periods
        newValue = value.replace(/[^a-zA-Z0-9._]/g, ''); // Alphanumeric, underscores, and periods
        break;

      case 'password':
        // Allow alphanumeric characters and special characters
        newValue = value.replace(/[^a-zA-Z0-9!@#$%^&*]/g, ''); // Customize as needed
 
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

      navigate('/regSuccess', { state: formData });

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
        width: '600px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 2
      }}>
        <h2 className="text-center mb-4" style={{ fontWeight: 'bold', color: 'black' }}>Register Tour Guide</h2>
        {Object.keys(formData).map((key) => (
          <div key={key} style={{ display: 'flex', alignItems: 'center', marginBottom: '15px', width: '100%' }}>
            <label 
              className="form-label" 
              style={{ width: '150px', fontWeight: '600', marginRight: '10px' }}
            >
              {`Tour Guide ${key.charAt(0).toUpperCase() + key.slice(1)}`}
            </label>
            {key === 'language' ? (
              <select
                className="form-control"
                style={{ borderRadius: '30px', flex: 1, padding: '10px', height: '50px' }}
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
                style={{ borderRadius: '30px', flex: 1 }}
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
          style={{ padding: '12px', fontSize: '18px', borderRadius: '30px', fontWeight: '600' ,
              background: '#164B60',
              color: 'white', 
              transition: 'background-color 0.3s, transform 0.3s',
              fontSize: '1rem',
              border: 'none',
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#164B60')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#1B6B93')}
          >
       
          Register
        </button>
      </form>
    </div>
  );
}
