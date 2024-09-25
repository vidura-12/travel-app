import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './ticket.css';

function UserTicketForm() {
  const { id } = useParams(); // Get event ID from the URL
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [userInputs, setUserInputs] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the event details including ticket criteria
    axios.get(`http://localhost:8081/event/${id}`)
      .then((response) => {
        setEvent(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching event:', error);
        setLoading(false);
      });
  }, [id]);

  // Handle user input changes for dynamically generated fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInputs({ ...userInputs, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`http://localhost:8081/event/${id}/tickets`, {
        otherFields: userInputs, // Send dynamic fields in `otherFields` map
      });
      Swal.fire({
        title: "Your ticket has been submitted",
        icon: "success"
      }).then(() => {
        navigate(`/eventView`);
      });
    } catch (error) {
      console.error('Error submitting ticket:', error);
    }
  };

  if (loading) {
    return <div>Loading event details...</div>;
  }

  if (!event) {
    return <div>No event found</div>;
  }

  return (

  <div>

       <section className="hero-section2">
        <div>
        <h2 style={{color: 'whitesmoke'}}>{event.name} - Book your ticket now</h2>
        
        </div>
         </section>


    <div className="ticket-form-container">
     
      <form onSubmit={handleSubmit}>
        {Object.keys(event.ticketCriteria).map((key, index) => {
          const criterion = event.ticketCriteria[key];
          if (!criterion) return null;

          return (
            <div className="form-group" key={index}>
              <label htmlFor={key}>{criterion}:</label>
              <input
                type="text"
                className="form-control"
                id={key}
                name={key}
                placeholder={`Enter ${criterion}`}
                value={userInputs[key] || ''}
                onChange={handleInputChange}
                required
              />
            </div>
          );
        })}

        <button type="submit" className="btn btn-primary">Submit Ticket</button>
      </form>
    </div></div>
  );
}

export default UserTicketForm;
