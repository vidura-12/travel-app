import React,{useState, useEffect, useRef} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';


 function AddEvent(){

    const [formData, setFormData] = useState({
        name: '',
        category: '',
        Description: '',
        location: '',
        date: '',
        time: '',
        price: '',
      });

      const [image, setImage] = useState(null);

     //Hanle text fiels
      const handleInputChange = (e) =>{
        const {name, value} = e.target;
        setFormData({...formData, [name]:value});
      }

    //handle image upload
    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
      };

    // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const eventdata = new FormData();

    formData.append('name', formData.name);
    formData.append('category', formData.category);
    formData.append('Description', formData.Description);
    formData.append('location', formData.location);
    formData.append('date', formData.date);
    formData.append('time', formData.time);
    
    if (image) {
      formData.append('image', image);
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


    return(
        <div>
            <h2>Add your Event </h2>

            <form >

                <div className="form-group">
                    <label for="name">Event Name : </label>
                    <input 
                    type="text" 
                    className="form-control" 
                    id="name" 
                    name = "name"
                    placeholder="Enter event name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required/>
                </div>

                <div className="form-group">
                    <label for="category">Event category : </label>
                    <input 
                    type="text" 
                    className="form-control" 
                    id="category" 
                    name="category"
                    placeholder="Enter event category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required/>
                </div>

                <div className="form-group">
                    <label for="details">Event Description : </label>
                    <textarea 
                    type="text" 
                    className="form-control"
                     id="Description" rows="4" 
                     name="Description"
                     placeholder="Enter event Description"
                     value={formData.Description}
                     onChange={handleInputChange}
                     required/>
                </div>

                <div className="form-group">
                    <label for="venue">Location : </label>
                    <input 
                    type="text" 
                    className="form-control" 
                    id="location" 
                    name="location"
                    placeholder="Enter event venue"
                    value={formData.location}
                    onChange={handleInputChange}
                    required/>
                </div>

                <div className="form-group">
                    <label for="date">Date : </label>
                    <input 
                    type="text"
                     className="form-control" 
                     id="date" 
                     name="date"
                     placeholder="Enter event date"
                     value={formData.location}
                     onChange={handleInputChange}
                     required/>
                </div>

                <div className="form-group">
                    <label for="Time">Time : </label>
                    <input 
                    type="text"
                     className="form-control" 
                     id="time"
                     name="time"
                     placeholder="Enter event time"
                     value={formData.time}
                     onChange={handleInputChange}
                     required/>
                </div>

                <div className="form-group">
                    <label for="category">price : </label>
                    <input 
                    type="text" 
                    className="form-control"
                    id="price" 
                    name="price"
                    placeholder="Enter event price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required/>
                </div>

                <div class="form-group">
                    <label class="image" for="image">Upload</label>
                    <input 
                    type="file" 
                    class="form-control" 
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}/>
                </div>

                <button type="submit" className="submit">Submit</button>


            </form>
        </div>
    )
}

export default AddEvent;