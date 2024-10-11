import React, { useState } from 'react';
import './HotelOwnerRegister.css';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation

const HotelOwnerRegister = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
    });
    
    const [errors, setErrors] = useState({
        email: '',
        phone: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Convert email to lowercase
        const updatedValue = name === 'email' ? value.toLowerCase() : value;
        setFormData({ ...formData, [name]: updatedValue });

        // Validate field on change
        validateField(name, updatedValue);
    };

    const handlePhoneChange = (e) => {
        const { value } = e.target;

        // Allow only digits in the phone input
        const numericValue = value.replace(/[^0-9]/g, '');
        setFormData({ ...formData, phone: numericValue });

        // Validate phone on change
        validateField('phone', numericValue);
    };

    const validateField = (name, value) => {
        const newErrors = { ...errors };
        let valid = true;

        switch (name) {
            case 'email':
                if (!value) {
                    newErrors.email = 'Email is required.';
                    valid = false;
                } else {
                    newErrors.email = ''; // Clear error if valid
                }
                break;

            case 'phone':
                if (!/^(0\d{9})$/.test(value)) {
                    newErrors.phone = 'Phone number must start with 0 and be 10 digits long.';
                    valid = false;
                } else {
                    newErrors.phone = ''; // Clear error if valid
                }
                break;

            case 'password':
                if (value.length < 8) {
                    newErrors.password = 'Password must be at least 8 characters long.';
                    valid = false;
                } else {
                    newErrors.password = ''; // Clear error if valid
                }
                break;

            case 'confirmPassword':
                if (value !== formData.password) {
                    newErrors.password = 'Passwords do not match.';
                    valid = false;
                } else {
                    newErrors.password = ''; // Clear error if valid
                }
                break;

            default:
                break;
        }

        setErrors(newErrors);
        return valid;
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = {
            email: '',
            phone: '',
            password: '',
        };

        // Aggregate all field validations
        valid = validateField('email', formData.email) && valid;
        valid = validateField('phone', formData.phone) && valid;
        valid = validateField('password', formData.password) && valid;
        valid = validateField('confirmPassword', formData.confirmPassword) && valid;

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return; // Prevent submission if validation fails
        }

        try {
            const response = await fetch('http://localhost:8081/api/hotelOwners', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const responseData = await response.json(); // Get the response data for error handling

            if (!response.ok) {
                alert(`Registration failed: ${responseData.message || 'Unknown error'}`);
                return;
            }

            alert('Registration successful!');
            setFormData({
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
                phone: '',
            });
        } catch (error) {
            alert('Network error. Please try again.');
            console.error('Submission error:', error);
        }
    };

    return (
        <div className="htowner-register-container">
            <h2 className="htowner-register-title">Hotel Owner Registration</h2>
            <form onSubmit={handleSubmit} className="htowner-register-form">
                <div className="htform-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="htform-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                </div>
                <div className="htform-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    {errors.password && <span className="error-message">{errors.password}</span>}
                </div>
                <div className="htform-group">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                    {errors.password && <span className="error-message">{errors.password}</span>}
                </div>
                <div className="htform-group">
                    <label htmlFor="phone">Phone:</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        required
                    />
                    {errors.phone && <span className="error-message">{errors.phone}</span>}
                </div>
                <button type="submit" className="htowner-register-btn">Register</button>
            </form>
            
            <p className="htowner-login-prompt">
                Already have an account? <Link to="/hotelowner/login" className="htowner-login-link">Login here</Link>
            </p>
        </div>
    );
};

export default HotelOwnerRegister;
