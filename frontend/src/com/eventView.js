import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import 'bootstrap/dist/css/bootstrap.min.css';
import './eventView.css';

function EventView() {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch events from the backend
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:8081/event/');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter events based on the search term
  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="event-list-container">
      <h2>Find your favorite Event...</h2>

      <div className="search-bar">
        <input
          type="text"
          className="form-control"
          placeholder="Search events by name or category"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <div className="row">
        {filteredEvents.map((event) => (
          <div className="col-md-4" key={event._id}>
            <div className="card mb-4">
              <img
                src={`http://localhost:8081/${event.image}`}
                className="card-img-top"
                alt={event.name}
              />
              <div className="card-body">
                <h5 className="card-title">{event.name}</h5>
                <p className="card-text">{event.description}</p>
                <p className="card-text">
                  <strong>Location:</strong> {event.location}
                </p>
                <p className="card-text">
                  <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
                </p>
                <p className="card-text">
                  <strong>Time:</strong> {event.time}
                </p>
                <p className="card-text">
                  <strong>Price:</strong> ${event.price}
                </p>
                
                {/* Link to the Ticket Form with event ID */}
                <Link to={`/ticket/${event._id}`} className="btn btn-primary">
                  Join Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventView;
