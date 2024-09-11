import React from "react";
import './vehicle.css';

function Vehicle() {
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


        </form>
    </div>
)
  }

  export default Vehicle;
  