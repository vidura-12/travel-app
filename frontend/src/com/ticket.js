import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
// import './UserTicketForm.css';  // Importing the CSS file

function UserTicketForm() {
  const { id } = useParams();
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
          price: response.data.price,
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
        title: 'Error',
        text: 'Something went wrong. Please try again later.',
        icon: 'error',
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
    <div className="ticket-form-container" style={{ backgroundImage: `url('/path-to-user-uploaded-image')` }}>
      <h2>Book Tickets for {event.name}</h2>
      <form onSubmit={handleSubmit} className="ticket-form">

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
          <label htmlFor="price">Event Price per Ticket:</label>
          <input
            type="text"
            className="ticket-form-control"
            id="price"
            name="price"
            value={event.price}
            disabled
          />
        </div>

        <div className="form-group">
          <label htmlFor="username">Name</label>
          <input
            type="text"
            name="username"
            value={userInputs.username || ''}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            name="phone"
            value={ticketDetails.phone}
            onChange={handleTicketDetailChange}
            required
          />
          {errors.phone && <span className="error-message">{errors.phone}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={ticketDetails.email}
            onChange={handleTicketDetailChange}
            required
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="noOfTicket">Number of Tickets</label>
          <input
            type="number"
            name="noOfTicket"
            value={ticketDetails.noOfTicket}
            onChange={handleTicketDetailChange}
            required
          />
          {errors.noOfTicket && (
            <span className="error-message">{errors.noOfTicket}</span>
          )}
        </div>

        <div className="form-group">
          <label>Total Price</label>
          <input
            type="text"
            name="totalPrice"
            value={ticketDetails.totalPrice}
            readOnly
          />
        </div>

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
}

export default UserTicketForm;
