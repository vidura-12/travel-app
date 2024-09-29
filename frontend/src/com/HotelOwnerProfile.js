// src/components/SellerProfile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export function SellerProfile() {
    const [sellerData, setSellerData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSellerData = async () => {
            setLoading(true); // Start loading state
            try {
                const token = localStorage.getItem('token'); // Fetch token from local storage
                if (!token) {
                    throw new Error('No token found');
                }

                const response = await axios.get('http://localhost:8081/auth/profile', {
                    headers: {
                        'Authorization': `Bearer ${token}` // Include token in request header
                    }
                });
                setSellerData(response.data);
            } catch (err) {
                console.error('Error fetching seller data:', err);
                setError(err.response?.data?.message || 'Failed to load profile data'); // More detailed error message
            } finally {
                setLoading(false); // End loading state
            }
        };

        fetchSellerData();

        // Cleanup function
        return () => {
            setSellerData({});
            setLoading(false);
            setError(null);
        };
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="mt-3">
            {sellerData ? (
                <>
                    <p><b>Name:</b> {sellerData.name}</p>
                    <p><b>Email:</b> {sellerData.email}</p>
                    <p><b>Phone:</b> {sellerData.phone || 'Not provided'}</p>
                    <p><b>Address:</b> {sellerData.address || 'Not provided'}</p>
                    <p><b>Role:</b> {sellerData.role}</p>
                </>
            ) : (
                <div>No seller data available.</div>
            )}
        </div>
    );
}

export default SellerProfile;
