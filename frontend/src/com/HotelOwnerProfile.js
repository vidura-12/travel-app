// src/components/HotelOwnerProfile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export function HotelOwnerProfile() {
    const [ownerData, setOwnerData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHotelOwnerData = async () => {
            try {
                const token = localStorage.getItem('token'); // Ensure the token exists
                if (!token) {
                    throw new Error('No token found');
                }

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                // Adjust the URL based on your frontend setup
                const { data } = await axios.get('/api/hotelOwners/profile', config);
                setOwnerData(data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError('Failed to load profile data');
                setLoading(false);
            }
        };

        fetchHotelOwnerData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="mt-3">
            <p><b>Name:</b> {ownerData.name}</p>
            <p><b>Email:</b> {ownerData.email}</p>
            <p><b>Phone:</b> {ownerData.phone}</p>
            <p><b>Registered Hotels:</b></p>
            {ownerData.hotels && ownerData.hotels.length > 0 ? (
                <ul>
                    {ownerData.hotels.map((hotel, index) => (
                        <li key={index}>{hotel.name}</li> // Assuming 'name' is a field of the hotel object
                    ))}
                </ul>
            ) : (
                <p>No registered hotels.</p>
            )}
        </div>
    );
}
