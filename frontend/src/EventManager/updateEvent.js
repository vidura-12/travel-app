import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './update.css';
import Swal from "sweetalert2";

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
    image: "", // Store image filename or path
    ticketCriteria: {
      t1: "",
      t2: "",
      t3: "",
      t4: "",
      t5: "",
      t6: "",
      t7: ""
    }
  });

  const [imageFile, setImageFile] = useState(null); // Store the new image file
  const [errors, setErrors] = useState({ name: "", location: "" }); // Error state

  const specialCharRegex = /^[a-zA-Z0-9\s]*$/; // Only allow letters, numbers, and spaces

  useEffect(() => {
    fetchEvent();
  }, []);

  // Fetch the event details
  const fetchEvent = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/event/${id}`);
      // Ensure ticketCriteria is set to default if not present
      setEvent((prevState) => ({
        ...prevState,
        ...response.data,
        ticketCriteria: response.data.ticketCriteria || {
          t1: "",
          t2: "",
          t3: "",
          t4: "",
          t5: "",
          t6: "",
          t7: ""
        }
      }));
    } catch (error) {
      console.error('Error fetching event:', error);
    }
  };

  // Handle form submission and update event
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (errors.name || errors.location) {
      alert("Please fix validation errors before submitting.");
      return;
    }

    const formData = new FormData();

    // Append event details to form data
    formData.append("name", event.name);
    formData.append("category", event.category);
    formData.append("description", event.description);
    formData.append("date", event.date);
    formData.append("time", event.time);
    formData.append("location", event.location);
    formData.append("price", event.price);

    // Append the ticket criteria to form data
    for (let key in event.ticketCriteria) {
      formData.append(key, event.ticketCriteria[key]);
    }

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
      Swal.fire({
        title: "Event Updated Successfully",
        icon: "success"
      }).then(() => {
        navigate('/EventManager/EventList'); 
      });
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  // Handle form input changes with validation
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validation for name and location fields to prevent special characters
    if (name === "name" || name === "location") {
      if (!specialCharRegex.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "No special characters allowed!",
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
      }
    }

    setEvent(prevState => ({
      ...prevState,
      [name]: value
    }));

    setEvent((prevEvent) => ({
      ...prevEvent,
      ...(name.startsWith('t') ? {
        ticketCriteria: {
          ...prevEvent.ticketCriteria,
          [name]: value
        }
      } : {
        [name]: value
      })
    }));
  };

  // Handle image file change
  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]); // Store the selected image file
  };

  return (
    <div className="update-container">
      <h2 style={{ color: "black" }}>Edit Event</h2>
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
          {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
        </div>

        <div className="form-group">
          <label>Event Category</label>
          <select
            className="form-control"
            name="category"
            value={event.category}
            onChange={handleChange}
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
            type="text"
            className="form-control"
            name="location"
            value={event.location}
            onChange={handleChange}
          />
          {errors.location && <p style={{ color: "red" }}>{errors.location}</p>}
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

        {/* Ticket Criteria Fields */}
        {Object.keys(event.ticketCriteria).map((key) => (
          <div className="form-group" key={key}>
            <label>{`Ticket Criteria ${key.charAt(1)}`}</label>
            <input
              type="text"
              className="form-control"
              name={key}
              value={event.ticketCriteria[key]}
              onChange={handleChange}
            />
          </div>
        ))}

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

        <button type="submit" className="btn btn-primary">Update Event</button>
      </form>
    </div>
  );
}

export default EditEvent;
