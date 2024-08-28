import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function EditEvent() {
  const { id } = useParams(); // Get the event ID from the URL
  const navigate = useNavigate();

  const [event, setEvent] = useState({
    name: "",
    category: "",
    description: "",
    date: "",
    time: "",
    location: "",
    price: "",
    image: "" // Store image filename or path
  });
  const [imageFile, setImageFile] = useState(null); // Store the new image file

  useEffect(() => {
    fetchEvent();
  }, []);

  // Fetch the event details
  const fetchEvent = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/event/${id}`);
      setEvent(response.data);
    } catch (error) {
      console.error('Error fetching event:', error);
    }
  };

  // Handle form submission and update event
  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Append event details to form data
    formData.append("name", event.name); 
    formData.append("category", event.category);
    formData.append("description", event.description);
    formData.append("date", event.date);
    formData.append("time", event.time);
    formData.append("location", event.location);
    formData.append("price", event.price);

    // Append the new image file if a new one was selected
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      await axios.put(`http://localhost:8081/event/update/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate('/'); // Redirect to EventList page after update
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle image file change
  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]); // Store the selected image file
  };

  return (
    <div className="container">
      <h2>Edit Event</h2>
      <form onSubmit={handleUpdate}>
        <div className="form-group">
          <label>Event Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={event.name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Event category</label>
          <input
            type="text"
            className="form-control"
            name="category"
            value={event.category}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            className="form-control"
            name="description"
            value={event.description}
            onChange={handleChange}
          />
        </div>


        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            className="form-control"
            name="date"
            value={event.date.split('T')[0]} // format date
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Time</label>
          <input
            type="time"
            className="form-control"
            name="time"
            value={event.time}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Location</label>
          <input
            type="location"
            className="form-control"
            name="location"
            value={event.location}
            onChange={handleChange}
          />
        </div>

        
        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            className="form-control"
            name="price"
            value={event.price}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Current Image</label>
          <img
            src={`http://localhost:8081/backend/frontend/public/img/${event.image}`}
            alt={event.name}
            className="img-thumbnail"
            style={{ width: "150px", height: "150px" }}
          />
        </div>
        <div className="form-group">
          <label>Upload New Image</label>
          <input
            type="file"
            className="form-control"
            name="image"
            onChange={handleImageChange}
          />
        </div>

        <button type="submit" className="btn btn-primary"><Link to={`/EventManager/EventList`}>
          Update Event
          </Link>
        </button>

    

      </form>
    </div>
  );
}

export default EditEvent;
