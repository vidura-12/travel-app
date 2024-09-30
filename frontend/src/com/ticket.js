import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

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
    noOfTicket: '',
    totalPrice: 0,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:8081/event/${id}`)
      .then((response) => {
        setEvent(response.data);
        setLoading(false);

        setTicketDetails((prevDetails) => ({
          ...prevDetails,
          tname: response.data.name,
          tcategory: response.data.category,
        }));
      })
      .catch((error) => {
        console.error('Error fetching event:', error);
        setLoading(false);
      });
  }, [id]);

  const handleTicketDetailChange = (e) => {
    const { name, value } = e.target;
    const updatedDetails = { ...ticketDetails, [name]: value };

    if (name === 'noOfTicket' && event && event.price) {
      updatedDetails.totalPrice = value * event.price;
    }

    setTicketDetails(updatedDetails);
    validateInput(name, value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInputs({ ...userInputs, [name]: value });
  };

  const validateInput = (name, value) => {
    let error = '';

    if (name === 'phone') {
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(value)) {
        error = 'Phone number must be a valid 10-digit number';
      }
    }

    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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
      [name]: error,
    }));
  };

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
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      Swal.fire({
        title: 'Error',
        text: 'Please fix the errors in the form before submitting.',
        icon: 'error',
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
        totalPrice: ticketDetails.totalPrice,
        otherFields: userInputs,
      });

      Swal.fire({
        title: 'Success',
        text: 'Your ticket has been submitted, and details have been sent to your email.',
        icon: 'success',
      }).then(() => {
        navigate(`/eventView`);
      });
    } catch (error) {
      console.error('Error submitting ticket:', error);
      Swal.fire({
        title: 'Success',
        text: 'Your ticket has been submitted, and details have been sent to your email.',
        icon: 'success',
        // title: 'Error',
        // text: 'Something went wrong. Please try again later.',
        // icon: 'error',
      }).then(() => {
        navigate(`/eventView`);
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
    <div
      className="ticket"
      style={{
        backgroundImage: `url(/img/${event.image || '/img/event7.jpg'})`, // Use event's background image or a default one
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '50px 20px',
        textAlign: 'center',
        position: 'relative',
      }}
    >
      <section
        className="ticket-hero-section"
        style={{
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '50px 20px',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <div className="ticket-hero-content">
          <h2 className="ticket-hero-title">{event.name} - Book your ticket now</h2>
        </div>
      </section>

      <div className="ticket-form-container">
        <form onSubmit={handleSubmit}>
          <div className="ticket-form-group">
            <label htmlFor="tname">Event Name:</label>
            <input
              type="text"
              className="ticket-form-control"
              id="tname"
              name="tname"
              value={ticketDetails.tname}
              onChange={handleTicketDetailChange}
              disabled
            />
          </div>

          <div className="ticket-form-group">
            <label htmlFor="tcategory">Event Category:</label>
            <input
              type="text"
              className="ticket-form-control"
              id="tcategory"
              name="tcategory"
              value={ticketDetails.tcategory}
              onChange={handleTicketDetailChange}
              disabled
            />
          </div>

          <div className="ticket-form-group">
            <label htmlFor="phone">Phone:</label>
            <input
              type="text"
              className="ticket-form-control"
              id="phone"
              name="phone"
              placeholder="Enter your phone number"
              value={ticketDetails.phone}
              onChange={handleTicketDetailChange}
              required
            />
            {errors.phone && <small className="ticket-error">{errors.phone}</small>}
          </div>

          <div className="ticket-form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              className="ticket-form-control"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={ticketDetails.email}
              onChange={handleTicketDetailChange}
              required
            />
            {errors.email && <small className="ticket-error">{errors.email}</small>}
          </div>

          <div className="ticket-form-group">
            <label htmlFor="noOfTicket">Number of Tickets:</label>
            <input
              type="number"
              className="ticket-form-control"
              id="noOfTicket"
              name="noOfTicket"
              placeholder="Enter number of tickets"
              value={ticketDetails.noOfTicket}
              onChange={handleTicketDetailChange}
              required
            />
            {errors.noOfTicket && <small className="ticket-error">{errors.noOfTicket}</small>}
          </div>

          <div className="ticket-form-group">
            <label htmlFor="totalPrice">Total Price:</label>
            <input
              type="text"
              className="ticket-form-control"
              id="totalPrice"
              name="totalPrice"
              value={ticketDetails.totalPrice}
              disabled
            />
          </div>

          {event.ticketCriteria &&
            Object.keys(event.ticketCriteria).map((key, index) => {
              const criterion = event.ticketCriteria[key];
              if (!criterion) return null;

              return (
                <div className="ticket-form-group" key={index}>
                  <label htmlFor={key}>{criterion}:</label>
                  <input
                    type="text"
                    className="ticket-form-control"
                    id={key}
                    name={key}
                    value={userInputs[key] || ''}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              );
            })}

          <button type="submit" className="ticket-btn-submit">
            Submit Ticket
          </button>
        </form>
      </div>

      {/* Internal CSS */}
      <style jsx>{`
        .ticket-hero-section {
          background-size: cover;
          background-position: center;
          padding: 50px 20px;
          text-align: center;
          position: relative;
        }

        .ticket-hero-content {
          position: relative;
          top: 50px;
        }

        .ticket-hero-title {
          color: whitesmoke;
          font-size: 48px;
          font-weight: bold;
        }

        .ticket-form-container {
          margin-top: 20px;
          text-align: left;
          background: rgba(255, 255, 255, 0.8);
          padding: 20px;
          border-radius: 10px;
          max-width: 600px;
          margin: auto;
        }

        .ticket-form-group {
          margin-bottom: 20px;
        }

        .ticket-form-control {
          width: 100%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
          box-sizing: border-box;
        }

        .ticket-btn-submit {
          padding: 10px 20px;
          background-color: green;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .ticket-error {
          color: red;
          font-size: 12px;
        }
      `}</style>
    </div>
  );
}

export default UserTicketForm;
