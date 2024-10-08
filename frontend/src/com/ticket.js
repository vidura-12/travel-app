import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const TicketForm = () => {
  const [formData, setFormData] = useState({
    tname: '',
    tcategory: '',
    username: '',
    phone: '',
    email: '',
    price: '',
    noOfTicket: '',
    total: ''
  });

  const [errors, setErrors] = useState({});
  const [ticketCriteria, setTicketCriteria] = useState({});
  const [userInputs, setUserInputs] = useState({});

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const ticketName = queryParams.get('name');
  const ticketCategory = queryParams.get('category');
  const ticketPrice = queryParams.get('price');
  const ticketImage = queryParams.get('image');

  useEffect(() => {
    // Initialize form fields based on passed query params
    if (ticketName && ticketCategory && ticketPrice) {
      setFormData(prevState => ({
        ...prevState,
        tname: ticketName,
        tcategory: ticketCategory,
        price: ticketPrice
      }));
    }

    // Fetch event data to retrieve additional ticket criteria dynamically
    const eventId = location.pathname.split('/')[2];
    fetchEventDetails(eventId);
  }, [ticketName, ticketCategory, ticketPrice]);

  const fetchEventDetails = async (eventId) => {
    try {
      const response = await axios.get(`http://localhost:8081/event/${eventId}`);
      const eventData = response.data;
      if (eventData.ticketCriteria) {
        setTicketCriteria(eventData.ticketCriteria);
      }
    } catch (error) {
      console.error('Error fetching event details:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInputs({ ...userInputs, [name]: value });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Calculate total if number of tickets changes
    if (name === "noOfTicket") {
      const numberOfTickets = parseInt(value, 10) || 0;
      const ticketPrice = parseFloat(formData.price) || 0;
      setFormData(prevState => ({
        ...prevState,
        total: (numberOfTickets * ticketPrice).toFixed(2)
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Username validation: only letters
    if (!formData.username) {
      newErrors.username = 'Username is required.';
    } else if (!/^[a-zA-Z\s]+$/.test(formData.username)) {
      newErrors.username = 'Username should contain only letters.';
    }

    // Phone number validation: only positive digits
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required.';
    } else if (!/^[0-9]+$/.test(formData.phone)) {
      newErrors.phone = 'Phone number should contain only digits.';
    }

    // Price validation
    if (!formData.price) {
      newErrors.price = 'Price is required.';
    }

    // Number of tickets validation: only positive numbers
    if (!formData.noOfTicket) {
      newErrors.noOfTicket = 'Number of tickets is required.';
    } else if (parseInt(formData.noOfTicket, 10) <= 0) {
      newErrors.noOfTicket = 'Number of tickets should be a positive number.';
    }

    // Total validation
    if (!formData.total) {
      newErrors.total = 'Total is required.';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      // Combine standard form data with dynamic ticket criteria
      const ticketData = { ...formData, ...userInputs };
      const response = await axios.post('http://localhost:8081/ticket/create', ticketData);
      console.log('Ticket created:', response.data);

      setFormData({
        tname: '',
        tcategory: '',
        username: '',
        phone: '',
        email: '',
        price: '',
        noOfTicket: '',
        total: ''
      });
      setErrors({});
      setUserInputs({});
    } catch (error) {
      console.error('Error creating ticket:', error);
      setErrors({ server: 'Error creating ticket. Please try again later.' });
    }
  };

  return (
    <div
      className='ticket'
      style={{
        backgroundImage: `url(/img/${ticketImage || '/img/event7.jpg'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '50px 20px',
        textAlign: 'center',
        position: 'relative',
      }}
    >
      <section className="ticket-hero-section">
        <div className="ticket-hero-content">
          <h2 className="ticket-hero-title">Make your space now for {ticketName} ...</h2>
        </div>
      </section>

      <div className="ticket-form-container">
        <form onSubmit={handleSubmit}>
          <div>
            <label>Event Name:</label>
            <input
              type="text"
              className="ticket-form-control"
              name="tname"
              value={formData.tname}
              onChange={handleChange}
              required
            />
            {errors.tname && <small className="ticket-error">{errors.tname}</small>}
          </div>

          <div>
            <label>Event Category:</label>
            <input
              type="text"
              className="ticket-form-control"
              name="tcategory"
              value={formData.tcategory}
              onChange={handleChange}
              required
            />
            {errors.tcategory && <span className="ticket-error">{errors.tcategory}</span>}
          </div>

          <div>
            <label>Enter your Name :</label>
            <input
              type="text"
              className="ticket-form-control"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            {errors.username && <small className="ticket-error">{errors.username}</small>}
          </div>

          <div>
            <label>PhoneNumber :</label>
            <input
              type="text"
              className="ticket-form-control"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            {errors.phone && <span className="ticket-error">{errors.phone}</span>}
          </div>

          <div>
            <label>Email:</label>
            <input
              type="email"
              className="ticket-form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <span className="ticket-error">{errors.email}</span>}
          </div>

          <div>
            <label>Price:</label>
            <input
              type="number"
              className="ticket-form-control"
              name="price"
              value={formData.price}
              onChange={handleChange}
              readOnly
              required
            />
            {errors.price && <span className="ticket-error">{errors.price}</span>}
          </div>

          <div>
            <label>Number of Tickets:</label>
            <input
              type="number"
              className="ticket-form-control"
              name="noOfTicket"
              value={formData.noOfTicket}
              onChange={handleChange}
              required
            />
            {errors.noOfTicket && <span className="ticket-error">{errors.noOfTicket}</span>}
          </div>

          {/* Dynamically render ticket criteria */}
          {ticketCriteria &&
            Object.keys(ticketCriteria).map((key, index) => {
              const criterion = ticketCriteria[key];
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

          <div>
            <label>Total:</label>
            <input
              type="text"
              className="ticket-form-control"
              name="total"
              value={formData.total}
              onChange={handleChange}
              readOnly
            />
            {errors.total && <span className="ticket-error">{errors.total}</span>}
          </div>
          <br />

          <button type="submit" className="ticket-btn-submit">Book Now</button>
          {errors.server && <span className="ticket-error">{errors.server}</span>}
        </form>
      </div>

      <style jsx>{`
        .ticket-hero-section {
          background-size: cover;
          background-position: center;
          padding: 50px 20px;
          text-align: center;
          position: relative;
        }

        .ticket-hero-title {
          color: white;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);
        }

        .ticket-form-container {
          background-color: rgba(255, 255, 255, 0.8);
          padding: 50px;
          max-width: 500px;
          margin: 0 auto;
          border-radius: 8px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        }

        .ticket-form-group {
          margin-bottom: 15px;
        }

        .ticket-form-control {
          width: 100%;
          padding: 10px;
          margin-top: 5px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }

        .ticket-btn-submit {
          background-color: #007BFF;
          color: white;
          padding: 10px 15px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
        }

        .ticket-btn-submit:hover {
          background-color: #0056b3;
        }

        .ticket-error {
          color: red;
          font-size: 12px;
          margin-top: 5px;
        }
      `}</style>
    </div>
  );
};

export default TicketForm;
