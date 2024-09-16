import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './eventList.css';
import {Link, useNavigate} from 'react-router-dom';

function EventList() {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchEvents();
  }, []);

  // Fetch all events
  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:8081/event/');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  // Handle delete event
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/event/delete/${id}`);
      setEvents(events.filter(event => event._id !== id));
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  // Handle edit event (This can redirect to an edit form or make fields editable directly)
  const navigate = useNavigate();

  // const handleEdit = (id) => {
  //   // Redirect to an edit page or implement inline editing here
  //   // navigate(`/edit/${id}`);
  //   navigate('./EventManager/updateEvent')
  //   console.log('Edit event with id:', id);
  // };

   // Filter events based on the search term
   const filteredEvents = events.filter(event =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container event-list-container">
      
        {/* Search Bar */}
        <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Search events by name, category or Location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>


      <div className="row">
        {filteredEvents.map(event => (
          <div key={event._id} className="col-md-4">
            <div className="card mb-4">
              <img
                src={`http://localhost:8081/backend/frontend/public/img/${event.image}`}
                className="card-img-top"
                alt={event.name}
              />
              <div className="card-body">
                <h5 className="card-title">{event.name}</h5>
                <p className="card-text">{event.description}</p>
                {/* <p className="card-text">
                  <strong>Category:</strong> {event.category}
                </p> */}
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



                <button
                  className="btn btn-warning mr-2"
                  // onClick={() => handleEdit(event._id)}
                ><Link to={`/EventManager/updateEvent/${ event._id}`}>
                  Edit
                  </Link>
                </button>



                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(event._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventList;
