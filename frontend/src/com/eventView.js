import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './eventView.css';

function EventView() {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    fetchEvents();
  }, []);

  // Fetch all approved events
  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:8081/event/');
      setEvents(response.data.filter(event => event.isApproved)); // Only approved events
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  // Handle delete event
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/event/delete/${id}`);
      setEvents(events.filter(event => event._id !== id));
      Swal.fire({
        title: "Event Deleted successfully",
        icon: "success"
      });
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  // Handle button click to navigate to the dashboard
  const handleSellEventClick = () => {
    navigate('/sellersignup');
  };

  // Filter events based on the search term
  const filteredEvents = events.filter(event =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <section className="hero-section4">
        <div>
          <h4 className="head" style={{ color: 'white' }}>Find your Event ....</h4>
          {/* Search Bar */}
          <div className="search-bar1">
            <input
              type="text"
              className="form-control"
              placeholder="Search events by name, category, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </section>

      <div className="container event-list-container">
        <div className="row">
          {filteredEvents.map(event => (
            <div key={event._id} className="col-md-4">
              <div className="card mb-4">
                <img 
                  src={`/img/${event.image}`} // Corrected image source
                  alt={event.name} 
                />
                <div className="card-body">
                  <h5 className="card-title">{event.name}</h5>
                  <p className="card-text">{event.description}</p>
                  <p className="card-text">
                    <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
                  </p>
                  <p className="card-text">
                    <strong>Time:</strong> {event.time}
                  </p>
                  <p className="card-text">
                    <strong>Location:</strong> {event.location}
                  </p>
                  <p className="card-text">
                    <strong>Price:</strong> RS.{event.price}
                  </p>
                  <Link to={`/ticket/${event._id}`}>
                    <button className="btn btn-primary">
                      Join Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='enjoy2'>
        <div className="enjoy-life-section">
          <div className='app'>
            <center>
              <h2>Welcome Event Sellers !</h2>
              <h5>
                The Event Management Dashboard provides a centralized hub for managing all aspects of event organization.
                With features like approval tracking, event category management, and reporting tools, this dashboard ensures seamless event planning and execution, helping administrators and organizers stay on top of their tasks.
                <h5>Join us today!</h5>
              </h5>
            </center>
            <div className='enjoybtn'>
              <button className="agency" onClick={handleSellEventClick}>Sell Your Event</button> {/* Navigate to dashboard */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventView;
