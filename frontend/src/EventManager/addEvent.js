import React, { useState } from "react";
<<<<<<< HEAD
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import axios from 'axios';
import './addEvent.css';
=======
import Swal from 'sweetalert2';
import axios from 'axios';
>>>>>>> origin/Final
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
    t1: '',
    t2: '',
    t3: '',
    t4: '',
    t5: '',
    t6: '',
    t7: '',
  });

  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});

  const specialRegex = /^[a-zA-Z0-9\s]*$/;

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    // Validate name and location for special characters
    if (!specialRegex.test(formData.name)) {
      newErrors.name = "No special characters allowed";
      valid = false;
    }
    if (!specialRegex.test(formData.location)) {
      newErrors.location = "No special characters allowed";
      valid = false;
    }

    // Ensure price is a positive number
    if (formData.price <= 0) {
      newErrors.price = "Price should be a positive number";
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
    eventdata.append('t1', formData.t1);
    eventdata.append('t2', formData.t2);
    eventdata.append('t3', formData.t3);
    eventdata.append('t4', formData.t4);
    eventdata.append('t5', formData.t5);
    eventdata.append('t6', formData.t6);
    eventdata.append('t7', formData.t7);

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
<<<<<<< HEAD
        // Reset form data
=======
>>>>>>> origin/Final
        setFormData({
          name: '',
          category: '',
          description: '',
          location: '',
          date: '',
          time: '',
          price: '',
          t1: '',
          t2: '',
          t3: '',
          t4: '',
          t5: '',
          t6: '',
          t7: '',
        });
        setImage(null);
<<<<<<< HEAD

        // Redirect to the same page
=======
>>>>>>> origin/Final
        navigate(0); // This reloads the current page
      });
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  return (
<<<<<<< HEAD
    <div className="event-container">
      <form onSubmit={handleSubmit} className="form">
        <h2>Add your Event</h2>

        <div className="event-form-group">
          <label htmlFor="name">Event Name: </label>
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
          {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
        </div>

        <div className="event-form-group">
          <label htmlFor="category">Event Category: </label>
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

        <div className="event-form-group">
          <label htmlFor="description">Event Description: </label>
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

        <div className="event-form-group">
          <label htmlFor="location">Location: </label>
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
          {errors.location && <p style={{ color: 'red' }}>{errors.location}</p>}
        </div>

        <div className="event-form-group">
          <label htmlFor="date">Date: </label>
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

        <div className="event-form-group">
          <label htmlFor="time">Time: </label>
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

        <div className="event-form-group">
          <label htmlFor="price">Price (in LKR): </label>
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
        </div>

        <div className="event-form-group">
          <label htmlFor="image">Upload Image: </label>
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
        <h4 style={{ textAlign: 'center' }}>Ticket Criteria</h4>

        {Array.from({ length: 5 }, (_, index) => (
          <div className="event-form-group" key={`t${index + 1}`}>
            <label htmlFor={`t${index + 1}`}>Ticket Criteria {index + 1}: </label>
            <input
              type="text"
              className="form-control"
              id={`t${index + 1}`}
              name={`t${index + 1}`}
              placeholder={`Enter ticket criteria ${index + 1}`}
              value={formData[`t${index + 1}`]}
              onChange={handleInputChange}
            />
          </div>
        ))}

        <button type="submit" className="addevent-btn btn-primary" >Submit</button>
      </form>
=======
    <div style={styles.backgroundevent}>
      <div style={styles.container}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <h2 style={styles.heading}>Add your Event</h2>

          <div className="form-group mb-3">
            <label htmlFor="name">Event Name</label>
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
            <label htmlFor="location">Location</label>
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
            <label htmlFor="price">Price (in LKR)</label>
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
          {Array.from({ length: 5 }, (_, index) => (
            <div className="form-group mb-3" key={`t${index + 1}`}>
              <label htmlFor={`t${index + 1}`}>Ticket Criteria {index + 1}</label>
              <input
                type="text"
                className="form-control"
                id={`t${index + 1}`}
                name={`t${index + 1}`}
                placeholder={`Enter ticket criteria ${index + 1}`}
                value={formData[`t${index + 1}`]}
                onChange={handleInputChange}
              />
            </div>
          ))}

          <div className="text-center">
            <button type="submit" className="btn btn-primary" style={styles.button}>Submit</button>
          </div>
        </form>
      </div>
>>>>>>> origin/Final
    </div>
  );
}

<<<<<<< HEAD
=======
const styles = {
  backgroundevent: {
    backgroundImage: "url(/img/event9.jpg)",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: '50px 0',
    minHeight: '100vh',
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
  },
  form: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0px 0px 15px rgba(0,0,0,0.2)',
    width: '50%',
  },
  heading: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px',
  },
  subHeading: {
    marginTop: '20px',
    color: '#555',
  },
  button: {
    width: '150px',
  }
};

>>>>>>> origin/Final
export default AddEvent;
