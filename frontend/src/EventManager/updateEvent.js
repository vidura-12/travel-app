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
    ticketCriteria:{
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
      setEvent(response.data);
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
    formData.append("t1", event.ticketCriteria.t1);
    formData.append("t2", event.ticketCriteria.t2);
    formData.append("t3", event.ticketCriteria.t3);
    formData.append("t4", event.ticketCriteria.t4);
    formData.append("t5", event.ticketCriteria.t5);
    formData.append("t6", event.ticketCriteria.t6);
    formData.append("t7", event.ticketCriteria.t7);

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
      }).then(()=>{
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
      <h2 style={{color: "black"}}>Edit Event</h2>
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
        <div className="form-group">
          <label>Ticket Criteria 1</label>
          <input
            type="text"
            className="form-control"
            name="t1"
            value={event.ticketCriteria.t1}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Ticket Criteria 2</label>
          <input
            type="text"
            className="form-control"
            name="t2"
            value={event.ticketCriteria.t2}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Ticket Criteria 3</label>
          <input
            type="text"
            className="form-control"
            name="t3"
            value={event.ticketCriteria.t3}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Ticket Criteria 4</label>
          <input
            type="text"
            className="form-control"
            name="t4"
            value={event.ticketCriteria.t4}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Ticket Criteria 5</label>
          <input
            type="text"
            className="form-control"
            name="t5"
            value={event.ticketCriteria.t5}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Ticket Criteria 6</label>
          <input
            type="text"
            className="form-control"
            name="t6"
            value={event.ticketCriteria.t6}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Ticket Criteria 7</label>
          <input
            type="text"
            className="form-control"
            name="t7"
            value={event.ticketCriteria.t7}
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

        <button type="submit" className="btn btn-primary">Update Event</button>
      </form>
    </div>
  );
}

export default EditEvent;
