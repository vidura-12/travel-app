import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2'
import axios from 'axios';
import './addEvent.css';
import {useNavigate} from 'react-router-dom';

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
  const [errors, setErrors] = useState({name: '', location: ''});

  const specialRegex = /^[a-zA-Z0-9\s]*$/;

  // Handle text fields with validation
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'name' || name === 'location') {
      if (specialRegex.test(value)) {
        setErrors({ ...errors, [name]: '' });
      } else {
        setErrors({ ...errors, [name]: 'No special characters allowed' });
      }
    }

    setFormData({ ...formData, [name]: value });
  };

  // Handle image upload
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

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
      const response = await axios.post('http://localhost:8081/event/add', eventdata, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
        Swal.fire({
          title: "Event added successfully",
          icon: "success"
        }).then(()=>{
          navigate('/EventManager/EventList');
        });
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  return (
    <div className="event-container">
      <form onSubmit={handleSubmit}>
        <h2>Add your Event</h2>

        <div className="form-group">
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

        <div className="form-group">
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

        <div className="form-group">
          <label htmlFor="details">Event Description: </label>
          <textarea
            className="form-control"
            id="Description"
            rows="4"
            name="description"
            placeholder="Enter event description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
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

        <div className="form-group">
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

        <div className="form-group">
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

        <div className="form-group">
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

        <div className="form-group">
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

        <hr></hr>

        {/* Ticket Criteria Inputs */}
        <h4 style={{textAlign: 'center'}}>Ticket Criterias</h4>
        
        <div className="form-group">
          <label htmlFor="t1">Ticket Criteria 1: </label>
          <input
            type="text"
            className="form-control"
            id="t1"
            name="t1"
            placeholder="Enter first ticket criteria"
            value={formData.t1}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="t2">Ticket Criteria 2: </label>
          <input
            type="text"
            className="form-control"
            id="t2"
            name="t2"
            placeholder="Enter second ticket criteria"
            value={formData.t2}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="t3">Ticket Criteria 3: </label>
          <input
            type="text"
            className="form-control"
            id="t3"
            name="t3"
            placeholder="Enter third ticket criteria"
            value={formData.t3}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="t4">Ticket Criteria 4: </label>
          <input
            type="text"
            className="form-control"
            id="t4"
            name="t4"
            placeholder="Enter fourth ticket criteria"
            value={formData.t4}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="t5">Ticket Criteria 5: </label>
          <input
            type="text"
            className="form-control"
            id="t5"
            name="t5"
            placeholder="Enter fifth ticket criteria"
            value={formData.t5}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="t6">Ticket Criteria 6: </label>
          <input
            type="text"
            className="form-control"
            id="t6"
            name="t6"
            placeholder="Enter sixth ticket criteria"
            value={formData.t6}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="t7">Ticket Criteria 7: </label>
          <input
            type="text"
            className="form-control"
            id="t7"
            name="t7"
            placeholder="Enter seventh ticket criteria"
            value={formData.t7}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddEvent;