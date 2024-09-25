import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const validate = () => {
        const newErrors = {};
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
            const response = await axios.post('http://localhost:8081/api/auth/login', formData);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('name', response.data.name);  // Save email to local storage
            alert('Login successful');
            navigate('/home');
        } catch (error) {
            console.error('Login failed', error);
            setErrors({ general: 'Login failed. Please check your credentials and try again.' });
        }
    };

    return (
        <div className="container">
            <div className="form-container">
                <h2 className="title">Login</h2>
                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`input ${errors.email ? 'input-error' : ''}`}
                            required
                        />
                        {errors.email && (
                            <p className="error-message">{errors.email}</p>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            className={`input ${errors.password ? 'input-error' : ''}`}
                            required
                        />
                        {errors.password && (
                            <p className="error-message">{errors.password}</p>
                        )}
                    </div>

                    <button type="submit" className="submit-btn">Login</button>

                    {errors.general && (
                        <p className="error-message general-error">{errors.general}</p>
                    )}
                </form>

                <div className="signup-link">
                    <p>
                        Don't have an account?{' '}
                        <a href="/register" className="link">Sign Up</a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
