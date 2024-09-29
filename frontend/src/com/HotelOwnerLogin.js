import React, { useState } from 'react';

const HotelOwnerLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // Loading state

    // Email validation function
    const isEmailValid = (email) => /\S+@\S+\.\S+/.test(email);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate email format
        if (!isEmailValid(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        setLoading(true); // Set loading to true
        setError(''); // Reset error message

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

                // Store the token (e.g., localStorage or state management)
                localStorage.setItem('token', token);
                
                // Redirect to the dashboard after successful login
                window.location.href = '/hotelowner/dashboard';
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Invalid credentials. Please try again.'); // Handle errors
            }
        } catch (err) {
            setError('An error occurred. Please try again later.'); // Handle errors
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <div className="container">
            <h2>Hotel Owner Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
};

export default HotelOwnerLogin;
