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
  const [ticketDetails, setTicketDetails] = useState({
    tname: '',
    tcategory: '',
    phone: '',
    email: '',
    noOfTicket: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the event details including ticket criteria
    axios.get(`http://localhost:8081/event/${id}`)
      .then((response) => {
        setEvent(response.data);
        setLoading(false);

        // Pre-fill the tname and tcategory fields with the event name and category
        setTicketDetails((prevDetails) => ({
          ...prevDetails,
          tname: response.data.name,
          tcategory: response.data.category
        }));
      })
      .catch((error) => {
        console.error('Error fetching event:', error);
        setLoading(false);
      });
  }, [id]);

  // Handle ticket details changes
  const handleTicketDetailChange = (e) => {
    const { name, value } = e.target;
    setTicketDetails({ ...ticketDetails, [name]: value });

    // Validate inputs in real time
    validateInput(name, value);
  };

  // Handle user input changes for dynamically generated fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInputs({ ...userInputs, [name]: value });
  };

  // Validation function
  const validateInput = (name, value) => {
    let error = '';

    if (name === 'phone') {
      const phoneRegex = /^[0-9]{10}$/; // Ensure phone is a 10-digit number
      if (!phoneRegex.test(value)) {
        error = 'Phone number must be a valid 10-digit number';
      }
    }

    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format validation
      if (!emailRegex.test(value)) {
        error = 'Please enter a valid email address';
      }
    }

    if (name === 'noOfTicket') {
      const ticketNumber = parseInt(value, 10);
      if (isNaN(ticketNumber) || ticketNumber <= 0) {
        error = 'Number of tickets must be a positive number';
      }
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error
    }));
  };

  // Check for errors before submission
  const validateForm = () => {
    const newErrors = {};

    if (!ticketDetails.phone || errors.phone) {
      newErrors.phone = 'Please provide a valid phone number';
    }

    if (!ticketDetails.email || errors.email) {
      newErrors.email = 'Please provide a valid email address';
    }

    if (!ticketDetails.noOfTicket || errors.noOfTicket) {
      newErrors.noOfTicket = 'Please provide a valid number of tickets';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      Swal.fire({
        title: 'Error',
        text: 'Please fix the errors in the form before submitting.',
        icon: 'error'
      });
      return;
    }

    try {
      await axios.post(`http://localhost:8081/event/${id}/tickets`, {
        tname: ticketDetails.tname,
        tcategory: ticketDetails.tcategory,
        phone: ticketDetails.phone,
        email: ticketDetails.email,
        noOfTicket: ticketDetails.noOfTicket,
        otherFields: userInputs, // Send dynamic fields in `otherFields` map
      });
      Swal.fire({
        title: 'Success',
        text: 'Your ticket has been submitted.',
        icon: 'success'
      }).then(() => {
        navigate(`/eventView`);
      });
    } catch (error) {
      console.error('Error submitting ticket:', error);
      Swal.fire({
        title: 'Error',
        text: 'Something went wrong. Please try again later.',
        icon: 'error'
      });
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
          <h2 style={{ color: 'whitesmoke' }}>{event.name} - Book your ticket now</h2>
        </div>
      </section>

      <div className="ticket-form-container">
        <form onSubmit={handleSubmit}>
          {/* Fields for user ticket details */}
          <div className="form-group">
            <label htmlFor="tname">Event Name:</label>
            <input
              type="text"
              className="form-control"
              id="tname"
              name="tname"
              value={ticketDetails.tname} // Auto-filled with event name
              onChange={handleTicketDetailChange}
              disabled
            />
          </div>

          <div className="form-group">
            <label htmlFor="tcategory">Event Category:</label>
            <input
              type="text"
              className="form-control"
              id="tcategory"
              name="tcategory"
              value={ticketDetails.tcategory} // Auto-filled with event category
              onChange={handleTicketDetailChange}
              disabled
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone:</label>
            <input
              type="text"
              className="form-control"
              id="phone"
              name="phone"
              placeholder="Enter your phone number"
              value={ticketDetails.phone}
              onChange={handleTicketDetailChange}
              required
            />
            {errors.phone && <small className="text-danger">{errors.phone}</small>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={ticketDetails.email}
              onChange={handleTicketDetailChange}
              required
            />
            {errors.email && <small className="text-danger">{errors.email}</small>}
          </div>

          <div className="form-group">
            <label htmlFor="noOfTicket">Number of Tickets:</label>
            <input
              type="number"
              className="form-control"
              id="noOfTicket"
              name="noOfTicket"
              placeholder="Enter number of tickets"
              value={ticketDetails.noOfTicket}
              onChange={handleTicketDetailChange}
              required
            />
            {errors.noOfTicket && <small className="text-danger">{errors.noOfTicket}</small>}
          </div>

          {/* Dynamically generated fields from event.ticketCriteria */}
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
      </div>
    </div>
  );
}

export default UserTicketForm;
