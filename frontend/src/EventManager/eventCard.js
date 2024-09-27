import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Assuming you're using axios for API calls
import './EventCard.css'; // Optional: for styling the card

const EventList = () => {
  const [events, setEvents] = useState([]);

  // Fetch events from the server
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('/api/events'); // Replace with your API endpoint
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
      
    

    <div className="event-list">
      {events.map((event) => (
        <div className="event-card" key={event._id}>
          <img 
            src={event.imageURL} 
            alt={event.name} 
            className="event-image" 
          />
          <div className="event-details">
            <h2>{event.name}</h2>
            <p className="event-description">{event.description}</p>
            <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
            <p><strong>Time:</strong> {new Date(event.date).toLocaleTimeString()}</p>
            <p><strong>Price:</strong> ${event.price}</p>
            <p><strong>Location:</strong> {event.location}</p>

            {/* <p className="event-date-time">{event.date} | {event.time}</p>
            <p className="event-price">Price: ${event.price}</p>
            <p className="event-location">Location: {event.location}</p> */}

          </div>
        </div>
      ))}
    </div>
  );
};

export default EventList;
