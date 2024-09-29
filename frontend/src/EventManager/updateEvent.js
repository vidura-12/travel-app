import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import './update.css'; // External CSS file import

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

  const fetchEvent = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/event/${id}`);
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

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (errors.name || errors.location) {
      Swal.fire("Validation Error", "Please fix validation errors before submitting.", "error");
      return;
    }

    const formData = new FormData();
    formData.append("name", event.name);
    formData.append("category", event.category);
    formData.append("description", event.description);
    formData.append("date", event.date);
    formData.append("time", event.time);
    formData.append("location", event.location);
    formData.append("price", event.price);

    for (let key in event.ticketCriteria) {
      formData.append(key, event.ticketCriteria[key]);
    }

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
      Swal.fire("Error", "There was an issue updating the event.", "error");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
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

    setEvent((prevState) => ({
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

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]); // Store the selected image file
  };

  return (
    <div className="edit-container">
      <form onSubmit={handleUpdate} className="edit-form">
        <h2>Edit Event</h2>

        <div className="edit-form-group">
          <label>Event Name</label>
          <input
            type="text"
            className="edit-form-control"
            name="name"
            value={event.name}
            onChange={handleChange}
          />
          {errors.name && <p className="edit-error-message">{errors.name}</p>}
        </div>

        <div className="edit-form-group">
          <label>Event Category</label>
          <select
            className="edit-form-control"
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

        <div className="edit-form-group">
          <label>Description</label>
            <textarea
              className="edit-form-control"
              name="description"
              value={event.description}
              onChange={handleChange}
              rows="4"  // Adjust the number of rows as needed
           />
        </div>


        <div className="edit-form-group">
          <label>Date</label>
          <input
            type="date"
            className="edit-form-control"
            name="date"
            value={event.date.split('T')[0]} // format date
            onChange={handleChange}
          />
        </div>

        <div className="edit-form-group">
          <label>Time</label>
          <input
            type="time"
            className="edit-form-control"
            name="time"
            value={event.time}
            onChange={handleChange}
          />
        </div>

        <div className="edit-form-group">
          <label>Location</label>
          <input
            type="text"
            className="edit-form-control"
            name="location"
            value={event.location}
            onChange={handleChange}
          />
          {errors.location && <p className="edit-error-message">{errors.location}</p>}
        </div>

        <div className="edit-form-group">
          <label>Price</label>
          <input
            type="number"
            className="edit-form-control"
            name="price"
            value={event.price}
            onChange={handleChange}
          />
        </div>

        {Object.keys(event.ticketCriteria).map((key) => (
          <div className="edit-form-group" key={key}>
            <label>{`Ticket Criteria ${key.charAt(1)}`}</label>
            <input
              type="text"
              className="edit-form-control"
              name={key}
              value={event.ticketCriteria[key]}
              onChange={handleChange}
            />
          </div>
        ))}

        {event.image && (
          <div className="edit-form-group">
            <img
              src={`http://localhost:8081/images/${event.image}`}
              alt="Event"
              className="edit-event-image"
            />
          </div>
        )}

        <div className="edit-form-group">
          <label>Upload New Image</label>
          <input
            type="file"
            className="edit-form-control"
            onChange={handleImageChange}
          />
        </div>

        <button type="submit" className="edit-submit-btn">
          Update Event
        </button>
      </form>
    </div>
  );
}

export default EditEvent;
