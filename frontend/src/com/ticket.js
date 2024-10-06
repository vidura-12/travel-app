// TicketForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
// import './ticketForm.css';

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

  // Fetch specific event details based on ID to get dynamic ticket criteria
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

    if (!formData.tname) newErrors.tname = 'Ticket name is required.';
    if (!formData.tcategory) newErrors.tcategory = 'Category is required.';
    if (!formData.username) {
      newErrors.username = 'Username is required.';
    } else if (!/^[a-zA-Z\s]+$/.test(formData.username)) {
      newErrors.username = 'Username should contain only letters.';
    }
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required.';
    } else if (!/^[0-9]+$/.test(formData.phone)) {
      newErrors.phone = 'Phone number should contain only digits.';
    }
    if (!formData.email) newErrors.email = 'Email is required.';
    if (!formData.price) newErrors.price = 'Price is required.';
    if (!formData.noOfTicket) {
      newErrors.noOfTicket = 'Number of tickets is required.';
    } else if (formData.noOfTicket <= 0) {
      newErrors.noOfTicket = 'Number of tickets should be a positive number.';
    }
    if (!formData.total) newErrors.total = 'Total is required.';

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
    <div className="ticket-form" style={{ backgroundImage: `url(/img/${ticketImage})` }}>
      <h2>Create Ticket</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Ticket Name:</label>
          <input type="text" name="tname" value={formData.tname} onChange={handleChange} />
          {errors.tname && <span className="error">{errors.tname}</span>}
        </div>
        <div>
          <label>Category:</label>
          <input type="text" name="tcategory" value={formData.tcategory} onChange={handleChange} />
          {errors.tcategory && <span className="error">{errors.tcategory}</span>}
        </div>
        <div>
          <label>Username:</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} />
          {errors.username && <span className="error">{errors.username}</span>}
        </div>
        <div>
          <label>Phone:</label>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
          {errors.phone && <span className="error">{errors.phone}</span>}
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div>
          <label>Price:</label>
          <input type="number" name="price" value={formData.price} onChange={handleChange} readOnly />
          {errors.price && <span className="error">{errors.price}</span>}
        </div>
        <div>
          <label>Number of Tickets:</label>
          <input type="number" name="noOfTicket" value={formData.noOfTicket} onChange={handleChange} />
          {errors.noOfTicket && <span className="error">{errors.noOfTicket}</span>}
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
          <input type="text" name="total" value={formData.total} onChange={handleChange} readOnly />
          {errors.total && <span className="error">{errors.total}</span>}
        </div>

        <button type="submit">Create Ticket</button>
        {errors.server && <span className="error">{errors.server}</span>}
      </form>
    </div>
  );
};

export default TicketForm;
