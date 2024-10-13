// frontend/src/components/ApprovedHotels.js

import React, { useEffect, useState } from "react";
import { List, Card, Spin, message } from "antd";

const ApprovedHotels = () => {
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchApprovedHotels = async () => {
            try {
                const response = await fetch('http://localhost:8081/api/hotels/approved', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setHotels(data);
                } else {
                    const errorData = await response.json();
                    setError(`Failed to fetch hotels: ${errorData.error}`);
                    message.error(`Failed to fetch hotels: ${errorData.error}`);
                }
            } catch (err) {
                console.error(err);
                setError('An error occurred while fetching hotels.');
                message.error('An error occurred while fetching hotels.');
            } finally {
                setLoading(false);
            }
        };

        fetchApprovedHotels();
    }, []);

    if (loading) {
        return <Spin tip="Loading approved hotels..." />;
    }

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
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

export default ApprovedHotels;
