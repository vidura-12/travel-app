import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EventManagerProfile = () => {
    const [managerData, setManagerData] = useState(null);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const managerId = "123"; // Replace with the actual manager ID or retrieve from authentication context

    useEffect(() => {
        // Fetch manager details
        const fetchManagerData = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/manager/${managerId}`);
                setManagerData(response.data);
            } catch (error) {
                console.error('Error fetching manager data:', error);
            }
        };

        // Fetch events managed by this manager
        const fetchEvents = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/events?managerId=${managerId}`);
                setEvents(response.data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchManagerData();
        fetchEvents();
        setLoading(false);
    }, [managerId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!managerData) {
        return <div>Manager not found.</div>;
    }

    return (
        <div className="manager-profile">
            <h2>Event Manager Profile</h2>
            <div className="profile-info">
                <h3>{managerData.name}</h3>
                <p><strong>Email:</strong> {managerData.email}</p>
                <p><strong>Phone:</strong> {managerData.phone}</p>
                <p><strong>Location:</strong> {managerData.location}</p>
            </div>
            <div className="events-list">
                <h3>Managed Events</h3>
                {events.length === 0 ? (
                    <p>No events managed by this manager.</p>
                ) : (
                    <ul>
                        {events.map((event) => (
                            <li key={event.id}>
                                <h4>{event.name}</h4>
                                <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                                <p><strong>Location:</strong> {event.location}</p>
                                <p><strong>Price:</strong> ${event.price}</p>
                                <p><strong>Status:</strong> {event.status}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default EventManagerProfile;
