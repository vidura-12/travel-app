import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './SignUp.module.css';

function SignUp() {
  const [formData, setFormData] = useState({
    name: '', dob: '', age: '', gender: '', contact: '', NIC: '', email: '', password: ''
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    let error = '';

    // Validation logic based on input field
    if (name === 'name' && !/^[A-Za-z\s]*$/.test(value)) {
      error = 'Enter only letters';
    }

    if (name === 'contact' && (!/^\d*$/.test(value) || value.length > 10)) {
      error = value.length > 10 ? 'Contact number should be 10 digits' : 'Contact should contain only numbers';
    }

    if (name === 'NIC') {
      const dobYear = new Date(formData.dob).getFullYear();
      if (dobYear <= 1999 && (!/^\d{8}[vV]?$/.test(value))) {
        error = 'NIC should be 8 numbers followed by "v" for birth year 1999 or earlier';
      } else if (dobYear >= 2000 && (!/^\d{12}$/.test(value))) {
        error = 'NIC should be exactly 12 digits for birth year 2000 or later';
      }
    }

       // Check Date of Birth for invalid entries (today's date or younger than 18)
       if (name === 'dob') {
        const selectedDate = new Date(value);
        const today = new Date();
        const minAgeDate = new Date(today.setFullYear(today.getFullYear() - 18));
  
        if (selectedDate >= new Date()) {
          error = 'Date of birth cannot be today or a future date.';
        } else if (selectedDate > minAgeDate) {
          error = 'You must be at least 18 years old.';
        }
      } 

    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: error });
  };

  const handleKeyDown = (e, fieldName) => {
    if (fieldName === 'name') {
      if (!/^[a-zA-Z\s]+$/.test(e.key) && e.key !== 'Backspace') {
        e.preventDefault();
        setErrors({ ...errors, name: 'Only letters are allowed' });
      } else {
        setErrors({ ...errors, name: '' });
      }
    }
    if (fieldName === 'NIC') {
      if (!/^[\dVv]+$/.test(e.key) && e.key !== 'Backspace') {
        e.preventDefault();
        setErrors({ ...errors, NIC: 'Only numbers and "v" are allowed' });
      } else {
        setErrors({ ...errors, NIC: '' });
      }
    }
    if (fieldName === 'contact') {
      if (!/^\d+$/.test(e.key) && e.key !== 'Backspace') {
        e.preventDefault();
        setErrors({ ...errors, contact: 'Only numbers are allowed' });
      } else {
        setErrors({ ...errors, contact: '' });
      }
    }
  };


  
  const validate = () => {
    const newErrors = {};

    // Full Name Validation
    if (!/^[A-Za-z\s]+$/.test(formData.name)) {
      newErrors.name = 'Enter only letters';
    }
    if (!formData.name) newErrors.name = 'Full Name is required';

    // Date of Birth Validation (no future date, at least 18 years old)
    const dobDate = new Date(formData.dob);
  const today = new Date();
  const minAgeDate = new Date(today.setFullYear(today.getFullYear() - 18));  // Define minAgeDate here
    if (dobDate >= new Date()) {
      newErrors.dob = 'Date of birth cannot be today or a future date.';
    } else if (dobDate > minAgeDate) {
      newErrors.dob = 'You must be at least 18 years old.';
    }

    // NIC Validation based on DOB
    const dobYear = new Date(formData.dob).getFullYear();
    if (dobYear <= 1999) {
      if (!/^\d{8}[vV]$/.test(formData.NIC)) {
        newErrors.NIC = 'Enter 8 numbers followed by "v" for birth year 1999 or earlier';
      }
    } else if (dobYear >= 2000) {
      if (!/^\d{12}$/.test(formData.NIC)) {
        newErrors.NIC = 'Enter exactly 12 digits for birth year 2000 or later';
      }
    }
    if (!formData.NIC) newErrors.NIC = 'NIC is required';

    // Contact number Validation: exactly 10 digits
    if (!/^\d{10}$/.test(formData.contact)) {
      newErrors.contact = 'Contact should be exactly 10 numbers';
    }
    if (!formData.contact) newErrors.contact = 'Contact Number is required';

    if (!formData.dob) newErrors.dob = 'Date of Birth is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await axios.post('http://localhost:8081/api/auth/register', formData);
      alert('Registration successful');
      navigate('/login');
    } catch (error) {
      console.error('There was an error registering!', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className={styles.signupWrapper}>
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <h2 className={styles.formTitle}>Sign Up</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            {/* Full Name */}
            <div className={styles.formGroup}>
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                onKeyDown={(e) => handleKeyDown(e, 'name')}
                className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                required
              />
              {errors.name && <p className={styles.errorMessage}>{errors.name}</p>}
            </div>

            {/* Date of Birth */}
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

            {/* Gender and NIC */}
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
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.gender && <p className={styles.errorMessage}>{errors.gender}</p>}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="NIC">NIC</label>
                <input
                  type="text"
                  name="NIC"
                  id="NIC"
                  placeholder="Enter your NIC"
                  value={formData.NIC}
                  onChange={handleChange}
                  onKeyDown={(e) => handleKeyDown(e, 'NIC')}
                  className={`${styles.input} ${errors.NIC ? styles.inputError : ''}`}
                  required
                />
                {errors.NIC && <p className={styles.errorMessage}>{errors.NIC}</p>}
              </div>
            </div>

            {/* Age and Contact */}
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="age">Age</label>
                <input
                  type="number"
                  name="age"
                  id="age"
                  min="0"
                  placeholder="Enter your age"
                  value={formData.age}
                  onChange={handleChange}
                  className={`${styles.input} ${errors.age ? styles.inputError : ''}`}
                  required
                />
                {errors.age && <p className={styles.errorMessage}>{errors.age}</p>}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="contact">Contact</label>
                <input
                  type="text"
                  name="contact"
                  id="contact"
                  placeholder="Enter your contact number"
                  value={formData.contact}
                  onChange={handleChange}
                  onKeyDown={(e) => handleKeyDown(e, 'contact')}
                  className={`${styles.input} ${errors.contact ? styles.inputError : ''}`}
                  required
                />
                {errors.contact && <p className={styles.errorMessage}>{errors.contact}</p>}
              </div>
            </div>

            {/* Email */}
            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                required
              />
              {errors.email && <p className={styles.errorMessage}>{errors.email}</p>}
            </div>

            {/* Password */}
            <div className={styles.formGroup}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
                required
              />
              {errors.password && <p className={styles.errorMessage}>{errors.password}</p>}
            </div>

            {/* Submit Button */}
            <div className={styles.formGroup}>
              <button type="submit" className={styles.submitButton}>
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
