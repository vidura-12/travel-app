import React, { useState } from 'react';
import './HotelOwnerLogin.css'; // Link to your CSS file

const HotelOwnerLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [emailError, setEmailError] = useState('');

    // Email validation function
    const isEmailValid = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate email format
        if (!isEmailValid(email)) {
            setEmailError('Please enter a valid email address.');
            return;
        }

        setLoading(true);
        setError('');
        setEmailError('');

        try {
            const response = await fetch('http://localhost:8081/api/hotelOwners/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                const { token } = data;

                // Store the token
                localStorage.setItem('token', token);
                // Redirect to the dashboard
                window.location.href = '/hotelowner/dashboard';
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Invalid credentials. Please try again.');
            }
        } catch (err) {
            setError('An error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="htowner-container">
            <div className="htowner-login-box">
                <h2 className="htowner-heading">Hotel Owner Login</h2>

                {error && <p className="htowner-error">{error}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="htowner-form-group">
                        <label htmlFor="email" className="htowner-label">Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value.toLowerCase())} // Convert to lowercase
                            required
                            className="htowner-input"
                        />
                        {emailError && <p className="htowner-error">{emailError}</p>}
                    </div>

                    <div className="htowner-form-group">
                        <label htmlFor="password" className="htowner-label">Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="htowner-input"
                        />
                    </div>

                    <button type="submit" disabled={loading} className="htowner-button">
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <div className="htowner-register">
                    <p>Don't have an account? <a href="/hotelowner/register" className="htowner-register-link">Register here</a></p>
                </div>
            </div>
        </div>
    );
};

export default HotelOwnerLogin;
