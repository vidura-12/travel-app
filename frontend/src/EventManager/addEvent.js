import React, { useState } from "react";
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddEvent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    location: '',
    date: '',
    time: '',
    price: '',
    ticketCriteria: [''], // Initialize with one empty criteria
  });

  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});

  const specialRegex = /^[a-zA-Z0-9\s]*$/;

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    // Validate name and location for special characters
    if (!formData.name) {
      newErrors.name = "Event name is required";
      valid = false;
    } else if (!specialRegex.test(formData.name)) {
      newErrors.name = "No special characters allowed";
      valid = false;
    }
    
    if (!formData.location) {
      newErrors.location = "Location is required";
      valid = false;
    } else if (!specialRegex.test(formData.location)) {
      newErrors.location = "No special characters allowed";
      valid = false;
    }

    // Ensure price is a non-negative number
    if (formData.price < 0) {
      newErrors.price = "Price should be a non-negative number";
      valid = false;
    }

    // Ensure date and time are not empty
    if (!formData.date) {
      newErrors.date = "Date is required";
      valid = false;
    }
    if (!formData.time) {
      newErrors.time = "Time is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleTicketCriteriaChange = (index, value) => {
    const updatedCriteria = [...formData.ticketCriteria];
    updatedCriteria[index] = value;
    setFormData({ ...formData, ticketCriteria: updatedCriteria });
  };

  const addTicketCriteria = () => {
    if (formData.ticketCriteria.length < 7) {
      setFormData({ ...formData, ticketCriteria: [...formData.ticketCriteria, ''] });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const eventdata = new FormData();
    eventdata.append('name', formData.name);
    eventdata.append('category', formData.category);
    eventdata.append('description', formData.description);
    eventdata.append('location', formData.location);
    eventdata.append('date', formData.date);
    eventdata.append('time', formData.time);
    eventdata.append('price', formData.price);
    
    formData.ticketCriteria.forEach((criteria, index) => {
      if (criteria) {
        eventdata.append(`t${index + 1}`, criteria);
      }
    });

    if (image) {
      eventdata.append('image', image);
    }

    try {
      await axios.post('http://localhost:8081/event/add', eventdata, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      Swal.fire({
        title: "Event added successfully, pending approval",
        icon: "success"
      }).then(() => {
        setFormData({
          name: '',
          category: '',
          description: '',
          location: '',
          date: '',
          time: '',
          price: '',
          ticketCriteria: [''], // Reset to one empty criteria
        });
        setImage(null);
        navigate(0); // This reloads the current page
      });
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  return (
    <div style={styles.backgroundevent}>
      <div style={styles.container}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <h2 style={styles.heading}>Add your Event</h2>

          <div className="form-group mb-3">
            <label htmlFor="name" style={{ color: errors.name ? 'red' : 'black' }}>Event Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              placeholder="Enter event name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            {errors.name && <small className="text-danger">{errors.name}</small>}
          </div>

          <div className="form-group mb-3">
            <label htmlFor="category">Event Category</label>
            <select
              className="form-control"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Category</option>
              <option value="Beach party">Beach party</option>
              <option value="Pool party">Pool party</option>
              <option value="Musical show">Musical show</option>
              <option value="Camping">Camping</option>
              <option value="Club party">Club party</option>
              <option value="Other outdoor">Other outdoor</option>
            </select>
          </div>

          <div className="form-group mb-3">
            <label htmlFor="description">Event Description</label>
            <textarea
              className="form-control"
              id="description"
              rows="4"
              name="description"
              placeholder="Enter event description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="location" style={{ color: errors.location ? 'red' : 'black' }}>Location</label>
            <input
              type="text"
              className="form-control"
              id="location"
              name="location"
              placeholder="Enter event location"
              value={formData.location}
              onChange={handleInputChange}
              required
            />
            {errors.location && <small className="text-danger">{errors.location}</small>}
          </div>

          <div className="form-group mb-3">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              className="form-control"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="time">Time</label>
            <input
              type="time"
              className="form-control"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="price" style={{ color: errors.price ? 'red' : 'black' }}>Price (in LKR)</label>
            <input
              type="number"
              className="form-control"
              id="price"
              name="price"
              placeholder="Enter event price in LKR"
              value={formData.price}
              onChange={handleInputChange}
              required
            />
            {errors.price && <small className="text-danger">{errors.price}</small>}
          </div>

          <div className="form-group mb-3">
            <label htmlFor="image">Upload Image</label>
            <input
              type="file"
              className="form-control"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          <hr />

          {/* Ticket Criteria Inputs */}
          <h4 style={styles.subHeading}>Ticket Criteria</h4>
          {formData.ticketCriteria.map((criteria, index) => (
            <div className="form-group mb-3" key={index}>
              <label htmlFor={`t${index + 1}`}>Ticket Criteria {index + 1}</label>
              <input
                type="text"
                className="form-control"
                id={`t${index + 1}`}
                placeholder={`Enter ticket criteria ${index + 1}`}
                value={criteria}
                onChange={(e) => handleTicketCriteriaChange(index, e.target.value)}
              />
            </div>
          ))}

          <div className="text-center mb-3">
            <button type="button" className="btn btn-secondary" onClick={addTicketCriteria} disabled={formData.ticketCriteria.length >= 7}>
              Add Ticket Criteria
            </button>
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-primary" style={styles.button}>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

const styles = {
  backgroundevent: {
    backgroundImage: "url(/img/event3.jpg)",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: '100px 0',
    minHeight: '100vh',
  },
  container: {
    width: '650px',
    maxWidth: '600px',
    margin: 'auto',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    margintop: '50px',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '650px', // Increased width
  },
  form: {
   
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  subHeading: {
    marginTop: '20px',
  },
  button: {
    marginTop: '20px',
  },
};

export default AddEvent;
