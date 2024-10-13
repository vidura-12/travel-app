import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../Check/Sidebar';
import styles from './Profile.module.css'; // Importing the CSS module

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    let error = '';

    // Validation for Name: Only letters allowed
    if (name === 'name' && !/^[A-Za-z\s]+$/.test(value)) {
      error = 'Enter only letters';
    }

    // Validation for Date of Birth (DOB)
    if (name === 'dob') {
      const today = new Date();
      const birthDate = new Date(value);
      const minAgeDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

      // Prevent selecting today or any future date
      if (birthDate > today) {
        error = 'Date of birth cannot be in the future';
      } 
      // Ensure user is at least 18 years old
      else if (birthDate > minAgeDate) {
        error = 'You must be at least 18 years old to create an account';
      }

      const age = today.getFullYear() - birthDate.getFullYear();
      setFormData({ ...formData, dob: value, age });
      setErrors({ ...errors, dob: error });
      return;
    }

    // Validation for NIC based on DOB year
    if (name === 'NIC') {
      const birthYear = formData.dob ? new Date(formData.dob).getFullYear() : null;

      if (birthYear) {
        if (birthYear <= 1999) {
          // NIC for 1999 or earlier: 8 digits + 'v'
          if (!/^\d{8}v?$/.test(value)) {
            error = 'NIC must be 8 digits followed by "v" for birth years 1999 or earlier';
          }
        } else {
          // NIC for 2000 or later: 12 digits
          if (!/^\d{12}$/.test(value)) {
            error = 'NIC must be 12 digits for birth years 2000 or later';
          }
        }
      } else {
        error = 'Please select a valid Date of Birth before entering NIC';
      }
    }

    // Validation for Contact: Only numbers allowed and limit to 10 digits
    if (name === 'contact') {
      if (!/^\d*$/.test(value)) {
        error = 'Enter only numbers';
      } else if (value.length > 10) {
        error = 'Enter only 10 numbers';
      }
    }

    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: error });
  };

  

  const handleKeyDown = (e, fieldName) => {
    const birthYear = formData.dob ? new Date(formData.dob).getFullYear() : null;
  
    // Prevent non-digit characters except 'v' for the NIC field
    if (fieldName === 'NIC') {
      if (birthYear && birthYear <= 1999) {
        // For 1999 or earlier, allow digits and 'v'
        if (!/^[\d]$/.test(e.key) && e.key.toLowerCase() !== 'v' && e.key !== 'Backspace' && e.key !== 'Tab') {
          e.preventDefault();
        }
      } else {
        // For 2000 or later, allow only digits
        if (!/^[\d]$/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Tab') {
          e.preventDefault();
        }
      }
    }
  
    // Prevent entering anything other than letters and spaces in Name field
    if (fieldName === 'name') {
      if (!/^[A-Za-z\s]$/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Tab') {
        e.preventDefault();
      }
    }
  
    // Prevent entering letters and special characters in Contact field
    if (fieldName === 'contact') {
      if (!/^[\d]$/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Tab') {
        e.preventDefault();
      }
    }
  };
  

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

      const response = await axios.put('http://localhost:8081/api/auth/profile', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setUser(response.data);
      setSuccessMsg('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      setErrors({ general: 'Profile update failed. Please try again.' });
    }
  };

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.profileContainer}>
      <Sidebar />
      <div className={styles.profileContent}>
        <div className={styles.formContainer}>
          <h2 className={styles.formTitle}>Profile Information</h2>

          {successMsg && <p className={styles.successMessage}>{successMsg}</p>}
          {errors.general && <p className={`${styles.errorMessage} ${styles.generalError}`}>{errors.general}</p>}

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                onKeyDown={(e) => handleKeyDown(e, 'name')} // Prevent non-letter characters
                className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                required
                placeholder="Enter your name"
              />
              {errors.name && <p className={styles.errorMessage}>{errors.name}</p>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="dob">Date of Birth</label>
              <input
                type="date"
                name="dob"
                id="dob"
                value={formData.dob}
                onChange={handleChange}
                className={`${styles.input} ${errors.dob ? styles.inputError : ''}`}
                required
              />
              {errors.dob && <p className={styles.errorMessage}>{errors.dob}</p>}
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="gender">Gender</label>
                <select
                  name="gender"
                  id="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className={`${styles.input} ${errors.gender ? styles.inputError : ''}`}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.gender && <p className={styles.errorMessage}>{errors.gender}</p>}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="age">Age</label>
                <input
                  type="number"
                  name="age"
                  id="age"
                  value={formData.age}
                  onChange={handleChange}
                  className={`${styles.input} ${errors.age ? styles.inputError : ''}`}
                  required
                  min="0"
                  placeholder="Enter your age"
                />
                {errors.age && <p className={styles.errorMessage}>{errors.age}</p>}
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="NIC">NIC</label>
                <input
                  type="text"
                  name="NIC"
                  id="NIC"
                  value={formData.NIC}
                  onChange={handleChange}
                  onKeyDown={(e) => handleKeyDown(e, 'NIC')} // Prevent non-numeric characters
                  className={`${styles.input} ${errors.NIC ? styles.inputError : ''}`}
                  required
                  placeholder="Enter NIC"
                />
                {errors.NIC && <p className={styles.errorMessage}>{errors.NIC}</p>}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="contact">Contact</label>
                <input
                  type="text"
                  name="contact"
                  id="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  onKeyDown={(e) => handleKeyDown(e, 'contact')} // Prevent non-numeric characters
                  className={`${styles.input} ${errors.contact ? styles.inputError : ''}`}
                  required
                  placeholder="Enter your contact number"
                />
                {errors.contact && <p className={styles.errorMessage}>{errors.contact}</p>}
              </div>
            </div>

            <button type="submit" className={styles.submitButton}>
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
