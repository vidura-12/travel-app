import React, { useEffect, useState } from "react";

const HotelOwnerProfile = () => {
    const [ownerData, setOwnerData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
                } else {
                    const errorData = await response.json();
                    setError(`Failed to fetch profile data: ${errorData.message}`);
                }
            } catch (err) {
                setError('An error occurred. Please try again later.');
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        fetchOwnerData();
    }, []); // Fetch data only on component mount

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
                </div>
            ) : (
                <p>No profile data available.</p>
            )}
        </div>
    );
};

export default HotelOwnerProfile;
