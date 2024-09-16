import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './addEvent.css';

function AddEvent() {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    location: '',
    date: '',
    time: '',
    price: '',
  });

  const [image, setImage] = useState(null);

  // Handle text fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
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

    if (image) {
      eventdata.append('image', image);
    }

    try {
      const response = await axios.post('http://localhost:8081/event/add', eventdata, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Event added successfully:', response.data);
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
            placeholder="Enter event Description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="venue">Location: </label>
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
          <label htmlFor="price">Price: </label>
          <input
            type="number"
            className="form-control"
            id="price"
            name="price"
            placeholder="Enter event price"
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

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddEvent;
