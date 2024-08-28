import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './post.css';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Register() {

    const [formData, setFormData] = useState({
      name: '',
      email: '',
      address: '',
      number: '',
      experience: '',
      language: '' ,
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
  
      try {
        const response = await axios.post('http://localhost:8081/TourGuide/add', formData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        // After form submission, navigate to profile page with data
        navigate('/travelagent/profile', { state: formData });
        
        // Optionally reset the form
        setFormData({
          name: '',
          email: '',
          address: '',
          number: '',
          experience: '',
          language: '' ,
        });
      } 
      catch (error) {
        console.error('Error submitting the form', error);
      }
    };

  return (
    <div>
      <div 
        style={{
          backgroundImage: "url('/img/dash.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          height: '100vh',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div className="form-background"> 
          <div className="form-container">
            <h2>Register Tour Guide</h2>
            <form onSubmit={guideSubmit}>
              <div>
                <label htmlFor="name">Tour Guide Name</label>
                <input
                  className='guidename'
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="email">Tour Guide Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="address">Tour Guide Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="number">Tour Guide Number</label>
                <input
                  type="text"
                  id="number"
                  name="number"
                  value={formData.number}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="experience">Tour Guide Experience</label>
                <input
                  type="text"
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="language">Tour Guide Language</label>
                <input
                  type="text"
                  id="language"
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                  required
                />
              </div>
              <button className='button' type='submit'>
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
