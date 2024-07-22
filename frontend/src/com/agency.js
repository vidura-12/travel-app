import React from 'react';
import './agency.css';

const Agency = () => {
  return (
    <>
      <div className="travelagency">
        <h1>Travel Packages</h1>
      </div>
      <div className='traveltitle'>
          <h1>Welcome Travel Agencies!</h1> 
          <p>Customize the travel packages</p>
        </div>
      <form>
        <div className="m1">
          <label>Name of the Travel Agency</label>
          <input type="text" className="form-control" id="agencyName" />
        
          <label>Phone Number</label>
          <input type="tel" className="form-control" id="phoneNumber" />
        
          <label>Email Address</label>
          <input type="email" className="form-control" id="email" aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
       
          <label>Location</label>
          <input type="text" className="form-control" id="location" />
      
          <label>Places of Specific Location</label>
          <input type="text" className="form-control" id="places" />
      
          <label>Max People</label>
          <input type="number" className="form-control" id="maxPeople" />

          <label>Price</label>
          <input type="number" className="form-control" id="maxPeople" />

        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </>
  );
}

export default Agency;
