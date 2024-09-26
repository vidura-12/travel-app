import React,{useState} from "react";

 function AddEvent(){

    return(
        <div>
            <form>

                <div className="form-group">
                    <label for="name">Event Name : </label>
                    <input type="text" className="form-control" id="name" placeholder="Enter event name"></input>
                </div>

                <div className="form-group">
                    <label for="category">Event category : </label>
                    <input type="text" className="form-control" id="category" placeholder="Enter event category"></input>
                </div>

                <div className="form-group">
                    <label for="details">Event Description : </label>
                    <textarea type="text" className="form-control" id="Description" rows="4" placeholder="Enter event Description"></textarea>
                </div>

                <div className="form-group">
                    <label for="venue">Location : </label>
                    <input type="text" className="form-control" id="venue" placeholder="Enter event venue"></input>
                </div>

                <div className="form-group">
                    <label for="date">Date : </label>
                    <input type="text" className="form-control" id="date" placeholder="Enter event date"></input>
                </div>

                <div className="form-group">
                    <label for="category">Time : </label>
                    <input type="text" className="form-control" id="time" placeholder="Enter event time"></input>
                </div>

                <div className="form-group">
                    <label for="category">price : </label>
                    <input type="text" className="form-control" id="price" placeholder="Enter event price"></input>
                </div>

                <div class="form-group">
                    <label class="image" for="image">Upload</label>
                    <input type="file" class="form-control" id="image"></input>
                </div>

                <button type="submit" className="submit">Submit</button>


<<<<<<< HEAD
            </form>
        </div>
    )
=======
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
        // Reset form data
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

        // Redirect to the same page
        navigate(0); // This reloads the current page
      });
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  return (
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
    </div>
  );
>>>>>>> Final
}

export default AddEvent;