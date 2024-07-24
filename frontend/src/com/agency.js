import React, { useState } from 'react';
import './agency.css';

const Agency = () => {
  const [agencyName, setAgencyName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [places, setPlaces] = useState(['']); // Initialize with one empty place
  const [maxPeople, setMaxPeople] = useState('');
  const [price, setPrice] = useState('');
  const [errors, setErrors] = useState({});

  const handleAgencyNameChange = (e) => {
    const value = e.target.value;
    const regex = /^[A-Za-z\s]+$/; // Regular expression to allow only letters and spaces
    if (value === '' || regex.test(value)) {
      setAgencyName(value);
      setErrors({ ...errors, agencyName: '' });
    } else {
      setErrors({ ...errors, agencyName: 'Name must contain only letters and spaces.' });
    }
  };

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    const regex = /^\d{0,10}$/; // Regular expression to allow only up to 10 digits
    if (regex.test(value)) {
      setPhoneNumber(value);
      if (value.length === 10) {
        setErrors({ ...errors, phoneNumber: '' });
      } else {
        setErrors({ ...errors, phoneNumber: 'Phone number must be exactly 10 digits.' });
      }
    } else {
      setErrors({ ...errors, phoneNumber: 'Phone number must contain only digits.' });
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression for email validation
    if (regex.test(value)) {
      setEmail(value);
      setErrors({ ...errors, email: '' });
    } else {
      setEmail(value);
      setErrors({ ...errors, email: 'Invalid email address.' });
    }
  };

  const handleLocationChange = (e) => {
    const value = e.target.value;
    const regex = /^[A-Za-z\s]+$/; // Regular expression to allow only letters and spaces
    if (value === '' || regex.test(value)) {
      setLocation(value);
      setErrors({ ...errors, location: '' });
    } else {
      setLocation(value);
      setErrors({ ...errors, location: 'Location must contain only letters and spaces.' });
    }
  };

  const handlePlaceChange = (index, value) => {
    const regex = /^[A-Za-z\s]+$/; // Regular expression to allow only letters and spaces
    const newPlaces = [...places];
    if (value === '' || regex.test(value)) {
      newPlaces[index] = value;
      setPlaces(newPlaces);
      setErrors({ ...errors, [`place${index}`]: '' });
    } else {
      setErrors({ ...errors, [`place${index}`]: 'Place must contain only letters and spaces.' });
    }
  };

  const handleMaxPeopleChange = (e) => {
    const value = e.target.value;
    const regex = /^\d+$/; // Regular expression to allow only digits
    if (value === '' || regex.test(value)) {
      setMaxPeople(value);
      setErrors({ ...errors, maxPeople: '' });
    } else {
      setErrors({ ...errors, maxPeople: 'Max People must be a number.' });
    }
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    const regex = /^\d+$/; // Regular expression to allow only digits
    if (value === '' || regex.test(value)) {
      setPrice(value);
      setErrors({ ...errors, price: '' });
    } else {
      setErrors({ ...errors, price: 'Price must be a number.' });
    }
  };

  const addPlace = () => {
    setPlaces([...places, '']);
  };

  const removePlace = (index) => {
    const newPlaces = [...places];
    newPlaces.splice(index, 1);
    setPlaces(newPlaces);
    const newErrors = { ...errors };
    delete newErrors[`place${index}`];
    setErrors(newErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add any additional validation or submission logic here
    if (
      agencyName &&
      phoneNumber.length === 10 &&
      email &&
      location &&
      places.every((place) => place !== '') &&
      maxPeople &&
      price &&
      !errors.agencyName &&
      !errors.phoneNumber &&
      !errors.email &&
      !errors.location &&
      !errors.maxPeople &&
      !errors.price &&
      Object.values(errors).every((error) => error === '')
    ) {
      console.log("Form submitted successfully");
    } else {
      console.log("Form has errors");
    }
  };

  return (
    <>
      <div className="travelagency">
        <h1>Travel Packages</h1>
      </div>
      <div className='traveltitle'>
        <h1>Welcome Travel Agencies!</h1>
        <p>Customize the travel packages</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="m1">
          <label>Name of the Travel Agency</label>
          <input
            type="text"
            className="form-control"
            id="agencyName"
            value={agencyName}
            onChange={handleAgencyNameChange}
          />
          {errors.agencyName && <div className="error">{errors.agencyName}</div>}

          <label>Phone Number</label>
          <input
            type="tel"
            className="form-control"
            id="phoneNumber"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
          />
          {errors.phoneNumber && <div className="error">{errors.phoneNumber}</div>}

          <label>Email Address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={handleEmailChange}
          />
          {errors.email && <div className="error">{errors.email}</div>}
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>

          <label>Location</label>
          <input
            type="text"
            className="form-control"
            id="location"
            value={location}
            onChange={handleLocationChange}
          />
          {errors.location && <div className="error">{errors.location}</div>}

          <label>Places of Specific Location</label>
          {places.map((place, index) => (
            <div key={index} className="place-input">
              <input
                type="text"
                className="form-control"
                value={place}
                onChange={(e) => handlePlaceChange(index, e.target.value)}
              />
              {errors[`place${index}`] && <div className="error">{errors[`place${index}`]}</div>}
              {places.length > 1 && (
                <button type="button" onClick={() => removePlace(index)} className="btn btn-danger">
                  Remove
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={addPlace} className="btn btn-secondary">
            Add Place
          </button>

          <label>Max People</label>
          <input
            type="number"
            className="form-control"
            id="maxPeople"
            value={maxPeople}
            onChange={handleMaxPeopleChange}
          />
          {errors.maxPeople && <div className="error">{errors.maxPeople}</div>}

          <label>Price</label>
          <input
            type="number"
            className="form-control"
            id="price"
            value={price}
            onChange={handlePriceChange}
          />
          {errors.price && <div className="error">{errors.price}</div>}
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </>
  );
}

export default Agency;
