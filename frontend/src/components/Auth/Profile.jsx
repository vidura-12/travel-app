import React, { useEffect, useState } from 'react';
import axios from 'axios';
//import './profile.css'; // Import the updated CSS file

function Profile() {
  const [user, setUser] = useState({
    name: '',
    dob: '',
    age: '',
    gender: '',
    contact: '',
    NIC: '',
    email: ''
  });

  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    age: '',
    gender: '',
    contact: '',
    NIC: ''
  });

  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState('');

  // Fetch profile data on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          setLoading(false);
          return;
        }

        const response = await axios.get('http://localhost:8081/api/auth/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });

        // Update user state and form data
        setUser(response.data);
        setFormData({
          name: response.data.name,
          dob: response.data.dob ? new Date(response.data.dob).toISOString().split('T')[0] : '',
          age: response.data.age,
          gender: response.data.gender,
          contact: response.data.contact,
          NIC: response.data.NIC
        });

        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error for the current field
    setErrors({ ...errors, [e.target.name]: '' });
  };

  // Validate form data
  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.dob) newErrors.dob = 'Date of Birth is required';
    if (!formData.age) newErrors.age = 'Age is required';
    if (!formData.gender.trim()) newErrors.gender = 'Gender is required';
    if (!formData.contact.trim()) newErrors.contact = 'Contact Number is required';
    if (!formData.NIC.trim()) newErrors.NIC = 'NIC is required';
    return newErrors;
  };

  // Handle profile update form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg('');
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      const response = await axios.put('http://localhost:5000/api/auth/profile', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setUser(response.data); // Update the user state with the updated profile
      setSuccessMsg('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      setErrors({ general: 'Profile update failed. Please try again.' });
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="container">
      <div className="form-container">
        <h2 className="form-title">Profile Information</h2>

        {successMsg && <p className="success-message">{successMsg}</p>}
        {errors.general && <p className="error-message general-error">{errors.general}</p>}

        <form onSubmit={handleSubmit} className="form">
          {/* Name Input */}
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className={`input ${errors.name ? 'input-error' : ''}`}
              required
              placeholder="Enter your name"
            />
            {errors.name && <p className="error-message">{errors.name}</p>}
          </div>

          {/* Date of Birth Input */}
          <div className="form-group">
            <label htmlFor="dob">Date of Birth</label>
            <input
              type="date"
              name="dob"
              id="dob"
              value={formData.dob}
              onChange={handleChange}
              className={`input ${errors.dob ? 'input-error' : ''}`}
              required
            />
            {errors.dob && <p className="error-message">{errors.dob}</p>}
          </div>

          {/* Gender and Age Input */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <select
                name="gender"
                id="gender"
                value={formData.gender}
                onChange={handleChange}
                className={`input ${errors.gender ? 'input-error' : ''}`}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender && <p className="error-message">{errors.gender}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="age">Age</label>
              <input
                type="number"
                name="age"
                id="age"
                value={formData.age}
                onChange={handleChange}
                className={`input ${errors.age ? 'input-error' : ''}`}
                required
                min="0"
                placeholder="Enter your age"
              />
              {errors.age && <p className="error-message">{errors.age}</p>}
            </div>
          </div>

          {/* NIC and Contact Input */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="NIC">NIC</label>
              <input
                type="text"
                name="NIC"
                id="NIC"
                value={formData.NIC}
                onChange={handleChange}
                className={`input ${errors.NIC ? 'input-error' : ''}`}
                required
                placeholder="Enter your NIC"
              />
              {errors.NIC && <p className="error-message">{errors.NIC}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="contact">Contact</label>
              <input
                type="tel"
                name="contact"
                id="contact"
                value={formData.contact}
                onChange={handleChange}
                className={`input ${errors.contact ? 'input-error' : ''}`}
                required
                placeholder="Enter your contact number"
              />
              {errors.contact && <p className="error-message">{errors.contact}</p>}
            </div>
          </div>

          {/* Email (unchangeable) */}
          <div className="form-group">
            <label htmlFor="email">Email (unchangeable)</label>
            <input
              type="email"
              name="email"
              id="email"
              value={user.email}
              disabled
              className="input disabled-input"
            />
          </div>

          {/* Update Button */}
          <button type="submit" className="submit-btn">Update Profile</button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
