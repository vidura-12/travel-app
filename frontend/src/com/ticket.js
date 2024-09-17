import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ticket.css';

function TicketForm() {
  const { id } = useParams(); // Get the event ID from the URL
  const [eventData, setEventData] = useState(null);
  const [ticketDetails, setTicketDetails] = useState({});

  useEffect(() => {
    // Fetch event details by ID
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/event/${id}`);
        setEventData(response.data);
        // Initialize ticketDetails state based on fetched event ticket criteria
        const initialTicketDetails = {};
        for (let i = 1; i <= 7; i++) {
          if (response.data[`t${i}`]) {
            initialTicketDetails[`t${i}`] = '';
          }
        }
        setTicketDetails(initialTicketDetails);
      } catch (error) {
        console.error('Error fetching event data:', error);
      }
    };
    fetchEventDetails();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTicketDetails({ ...ticketDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:8081/event/${id}/tickets`, ticketDetails);
      console.log('Ticket details submitted successfully');
    } catch (error) {
      console.error('Error submitting ticket details:', error);
    }
  };

  if (!eventData) {
    return <p>Loading event data...</p>;
  }

  return (
    <div className="ticket-form-container">
      <h2>{eventData.name}</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(ticketDetails).map((key) => (
          <div className="form-group" key={key}>
            <label>{eventData[key]}</label>
            <input
              type="text"
              className="form-control"
              name={key}
              value={ticketDetails[key]}
              onChange={handleInputChange}
              required
            />
          </div>
        ))}
        <button type="submit" className="btn btn-primary">
          Submit Ticket Details
        </button>
      </form>
    </div>
  );
}

export default TicketForm;
