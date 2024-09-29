import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importing useNavigate
import styles from './SignUp.module.css'; // Importing the CSS module

function SignUp() {
  const [formData, setFormData] = useState({
    name: '', dob: '', age: '', gender: '', contact: '', NIC: '', email: '', password: ''
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    let error = '';

    // Validation based on input field
    if (name === 'name' && !/^[A-Za-z\s]*$/.test(value)) {
      error = 'Enter only letters';
    }

    if (name === 'NIC' && (!/^\d*$/.test(value) || value.length > 12)) {
      error = value.length > 12 ? 'Enter only 12 numbers' : 'NIC should contain only numbers';
    }

    if (name === 'contact' && (!/^\d*$/.test(value) || value.length > 10)) {
      error = value.length > 10 ? 'Contact number should be 10 digits' : 'Contact should contain only numbers';
    }

    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: error });
  };

  const handleKeyDown = (e, fieldName) => {
    // Prevent numbers and special characters in full name field
    if (fieldName === 'name') {
      if (!/^[a-zA-Z\s]+$/.test(e.key) && e.key !== 'Backspace') {
        e.preventDefault();
        setErrors({ ...errors, name: 'Only letters are allowed' });
      } else {
        setErrors({ ...errors, name: '' });
      }
    }
    // Prevent letters and special characters in NIC field
    if (fieldName === 'NIC') {
      if (!/^\d+$/.test(e.key) && e.key !== 'Backspace') {
        e.preventDefault();
        setErrors({ ...errors, NIC: 'Only numbers are allowed' });
      } else {
        setErrors({ ...errors, NIC: '' });
      }
    }
    // Prevent letters and special characters in contact field
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

    // NIC Validation: exactly 12 digits
    if (!/^\d{12}$/.test(formData.NIC)) {
      if (formData.NIC.length < 12) {
        newErrors.NIC = 'Enter 12 numbers';
      } else if (formData.NIC.length > 12) {
        newErrors.NIC = 'NIC should be exactly 12 numbers';
      }
    }
    if (!formData.NIC) newErrors.NIC = 'NIC is required';

    // Contact number Validation: exactly 10 digits
    if (!/^\d{10}$/.test(formData.contact)) {
      if (formData.contact.length < 10) {
        newErrors.contact = 'Enter 10 numbers';
      } else if (formData.contact.length > 10) {
        newErrors.contact = 'Contact should be exactly 10 numbers';
      }
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
      navigate('/login'); // Navigate to login page upon successful registration
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
                  min="0" // Ensuring age cannot be less than 0
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

            {/* Sign Up Button */}
            <button type="submit" className={styles.submitBtn}>Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
