import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const TicketForm = () => {

  const navigate = useNavigate();
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
    if (ticketName && ticketCategory && ticketPrice) {
      setFormData(prevState => ({
        ...prevState,
        tname: ticketName,
        tcategory: ticketCategory,
        price: ticketPrice
      }));
    }

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

    // Phone number validation: only digits, max 10 characters
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required.';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be exactly 10 digits.';
    }

    // Price validation
    if (!formData.price) {
      newErrors.price = 'Price is required.';
    }

    // Number of tickets validation: positive integers only
    if (!formData.noOfTicket) {
      newErrors.noOfTicket = 'Number of tickets is required.';
    } else if (!/^\d+$/.test(formData.noOfTicket)) {
      newErrors.noOfTicket = 'Number of tickets must be a positive integer.';
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
      const ticketData = { ...formData, ...userInputs };
      const response = await axios.post('http://localhost:8081/ticket/create', ticketData);
      console.log('Ticket created:', response.data);


       // Show SweetAlert notification
       Swal.fire({
        title: 'Success!',
        text: 'Ticket Booked successfully!',
        icon: 'success',
        confirmButtonText: 'OK'
       }).then(() => {
        // Navigate to the event view page after clicking OK
        navigate('/eventView'); // Ensure this path matches your routing
      });

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

  // Handle key press to restrict input for phone number
  const handlePhoneKeyDown = (e) => {
    const allowedKeys = [
      'Backspace', 'Tab', 'Enter', 'ArrowLeft', 'ArrowRight', 'Delete'
    ];

    // Allow only digits (0-9)
    if ((e.key >= '0' && e.key <= '9') || allowedKeys.includes(e.key)) {
      if (formData.phone.length < 10 || allowedKeys.includes(e.key)) {
        return;
      } else {
        e.preventDefault(); // Restrict input to max 10 digits
      }
    } else {
      e.preventDefault(); // Prevent non-digit input
    }
  };

  // Handle key press to restrict input for number of tickets
  const handleNoOfTicketKeyDown = (e) => {
    const allowedKeys = [
      'Backspace', 'Tab', 'Enter', 'ArrowLeft', 'ArrowRight', 'Delete'
    ];

    // Allow only positive digits (0-9)
    if ((e.key >= '0' && e.key <= '9') || allowedKeys.includes(e.key)) {
      return;
    } else {
      e.preventDefault(); // Prevent non-digit input
    }
  };

  // Handle key press to restrict input for username
  const handleUsernameKeyDown = (e) => {
    const allowedKeys = [
      'Backspace', 'Tab', 'Enter', 'ArrowLeft', 'ArrowRight', ' ', // Allow control keys and space
    ];

    // Allow A-Z and a-z characters
    if (
      (e.key >= 'A' && e.key <= 'Z') || (e.key >= 'a' && e.key <= 'z') || allowedKeys.includes(e.key)
    ) {
      return;
    } else {
      e.preventDefault(); // Prevent default for other characters
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
            <label>Enter your Name:</label>
            <input
              type="text"
              className="ticket-form-control"
              name="username"
              value={formData.username}
              onChange={handleChange}
              onKeyDown={handleUsernameKeyDown} // Restrict typing to letters
              required
            />
            {errors.username && <small className="ticket-error">{errors.username}</small>}
          </div>

          <div>
            <label>PhoneNumber:</label>
            <input
              type="text"
              className="ticket-form-control"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              onKeyDown={handlePhoneKeyDown} // Restrict typing to digits only
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
              required
            />
            {errors.price && <span className="ticket-error">{errors.price}</span>}
          </div>

          <div>
            <label>Number of Tickets:</label>
            <input
              type="text"
              className="ticket-form-control"
              name="noOfTicket"
              value={formData.noOfTicket}
              onChange={handleChange}
              onKeyDown={handleNoOfTicketKeyDown} // Restrict to positive integers only
              required
            />
            {errors.noOfTicket && <span className="ticket-error">{errors.noOfTicket}</span>}
          </div>

          {Object.keys(ticketCriteria).map((key) => {
            return (
              <div key={key}>
                <label>{ticketCriteria[key]}</label>
                <input
                  type="text"
                  className="ticket-form-control"
                  name={key}
                  value={userInputs[key] || ''}
                  onChange={handleInputChange}
                  required
                />
                {errors[key] && <span className="ticket-error">{errors[key]}</span>}
              </div>
            );
          })}

          <div>
            <label>Total:</label>
            <input
              type="number"
              className="ticket-form-control"
              name="total"
              value={formData.total}
              onChange={handleChange}
              readOnly
              required
            />
            {errors.total && <span className="ticket-error">{errors.total}</span>}
          </div>
          <br></br>
          
         
          <button type="submit" className="ticket-btn-submit">Submit</button>
          {errors.server && <span className="ticket-error">{errors.server}</span>}
        
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
};

export default TicketForm;
