import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const HotelOwnerProfile = () => {
    const [ownerData, setOwnerData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const fetchOwnerData = async () => {
            const token = localStorage.getItem('token'); // Retrieve the token from local storage

            if (!token) {
                setError('No token found, please log in.');
                setLoading(false);
                return;
            }

            try {
                const response = await fetch('http://localhost:8081/api/hotelOwners/profile', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`, // Include the token in the headers
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setOwnerData(data); // Store the fetched data in state
                } else if (response.status === 401) {
                    setError('Unauthorized. Please log in again.'); // Handle unauthorized access
                    localStorage.removeItem('token'); // Optionally clear the token
                    navigate('/hotelowner/login'); // Redirect to login page
                } else {
                    const errorData = await response.json();
                    setError(`Failed to fetch profile data: ${errorData.message}`);
                }
            } catch (err) {
                console.error(err); // Log the error for debugging
                setError('An error occurred. Please try again later.');
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        fetchOwnerData();
    }, [navigate]); // Add navigate to dependency array

    // Logout handler
    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove the token from local storage
        setOwnerData(null); // Clear user data
        navigate('/hotelowner/login'); // Redirect to login page
    };

    if (loading) {
        return <p>Loading...</p>; // Display loading state
    }

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>; // Display error message
    }

    return (
        <div>
            <h2>My Profile</h2>
            {ownerData ? (
                <div>
                    <p><strong>Name:</strong> {ownerData.name}</p>
                    <p><strong>Email:</strong> {ownerData.email}</p>
                    <p><strong>Phone:</strong> {ownerData.phone}</p>
                    {/* Add any additional fields you want to display */}
                    <button onClick={handleLogout} style={styles.logoutButton}>Logout</button> {/* Logout Button */}
                </div>
            ) : (
                <p>No profile data available.</p>
            )}
        </div>
    );
};

// Optional: Styling for the Logout button
const styles = {
    logoutButton: {
        marginTop: '20px',
        padding: '10px 20px',
        backgroundColor: '#ff4d4d',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

export default HotelOwnerProfile;
