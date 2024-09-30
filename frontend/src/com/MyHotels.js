// frontend/src/components/MyHotels.js

import React, { useEffect, useState } from "react";
import { List, Card, Spin, message } from "antd";

const MyHotels = () => {
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMyHotels = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                setError('No token found, please log in.');
                setLoading(false);
                message.error('No token found, please log in.');
                return;
            }

            try {
                const response = await fetch('http://localhost:8081/api/hotelOwners/profile', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setHotels(data.hotels || []);
                } else {
                    const errorData = await response.json();
                    setError(`Failed to fetch your hotels: ${errorData.message}`);
                    message.error(`Failed to fetch your hotels: ${errorData.message}`);
                }
            } catch (err) {
                console.error(err);
                setError('An error occurred while fetching your hotels.');
                message.error('An error occurred while fetching your hotels.');
            } finally {
                setLoading(false);
            }
        };

        fetchMyHotels();
    }, []);

    if (loading) {
        return <Spin tip="Loading your hotels..." />;
    }

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    if (hotels.length === 0) {
        return <p>You have not added any hotels yet.</p>;
    }

    return (
        <List
            grid={{ gutter: 16, column: 3 }}
            dataSource={hotels}
            renderItem={hotel => (
                <List.Item>
                    <Card title={hotel.name}>
                        <p><strong>Location:</strong> {hotel.location}</p>
                        <p><strong>Description:</strong> {hotel.description}</p>
                        <p><strong>Amenities:</strong> {hotel.amenities.join(', ')}</p>
                        <p><strong>Rooms:</strong></p>
                        <ul>
                            {hotel.rooms.map((room, index) => (
                                <li key={index}>{room.roomType} - ${room.price} per night ({room.availableRooms} available)</li>
                            ))}
                        </ul>
                        <p><strong>Images:</strong></p>
                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                            {hotel.images.map((img, idx) => (
                                <img key={idx} src={img} alt={`Hotel ${hotel.name}`} style={{ width: '100px', marginRight: '10px' }} />
                            ))}
                        </div>
                    </Card>
                </List.Item>
            )}
        />
    );
};

export default MyHotels;
