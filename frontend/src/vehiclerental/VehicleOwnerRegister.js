import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function VehicleOwnerRegister() {
  const [firstname, setFirstname] = useState('');
  // const [secondname, setSecondname] = useState('');
  const [phoneno, setPhoneNo] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('vehicleOwner'); // Default role for vehicle owners
  const [error, setError] = useState(''); // State for error messages
  const [nameError, setNameError] = useState(''); // State for name error messages
  const [phoneError, setPhoneError] = useState(''); 
  const [roleError, setRoleError] = useState(''); // State for role error messages
  const navigate = useNavigate();

  // Handler for first name and second name input to allow only letters
  const handleNameChange = (setter) => (e) => {
    const { value } = e.target;
    if (/^[a-z A-Z]*$/.test(value)) {
      setter(value);
      setNameError(''); // Clear name error if valid
    } else {
      setNameError('You can only enter letters for first and last names.');
    }
  };

  // Handler for phone number input to allow only numbers
  const handlePhoneNoChange = (e) => {
    const { value } = e.target;
    if (/^[0-9]*$/.test(value)) {
      setPhoneNo(value);
      setPhoneError(''); // Clear phone error if valid
    } else {
      setPhoneError('You can only enter numbers.');
    }
  };

  // Handler for username input to allow only letters
  const handleUsernameChange = (e) => {
    const { value } = e.target;
    if (/^[a-z A-Z]*$/.test(value)) {
      setUsername(value); // Update state only if value is valid
    }
  };

  // Check if the password meets the requirements
  const isPasswordValid = (password) => {
    // Regex to check for at least one uppercase letter and one number
    return /[A-Z]/.test(password) && /[0-9]/.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Clear previous errors
    setError('');
    setRoleError('');

    // Validate password
    if (!isPasswordValid(password)) {
      setError('Password must contain at least one uppercase letter and number.');
      return; // Stop form submission
    }

    if(!role) {
      setError('Please select a role.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8081/vehicle-owner/register', {
        firstname,
        // secondname,
        phoneno,
        username,
        email,
        password,
        role,
      });
      localStorage.setItem('token', response.data.token);
      navigate('/vehicle-owner/login');

    } catch (error) {
      
      // Capture error and set the error state
      console.error('Registration failed:', error.response.data);
      setError(error.response.data.msg || 'Registration failed. Please try again.');
    }
  };

  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundImage: 'url(https://www.rentallsoftware.com/wp-content/uploads/2020/10/type-car-rental.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  const boxStyle = {
    width: '100%',
    maxWidth: '400px',
    padding: '40px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  };

  const inputGroupStyle = {
    marginBottom: '15px',
  };

  const labelStyle = {
    display: 'block',
    fontSize: '14px',
    color: '#555',
    marginBottom: '5px',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  };

  const buttonStyle = {
    width: '100%',
    padding: '10px',
    backgroundColor: '#4d4d3c',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  };

  const buttonStylelogin = {
    width: '100%',
    padding: '10px',
    backgroundColor: '#bdb76b',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '10px'
  };

  const buttonHoverStyle = {
    backgroundColor: '#39392d',
  };

  return (
    <div style={containerStyle}>
      <div style={boxStyle}>
        <h2>Vehicle Owner Register</h2>
        {error && <div style={{ color: 'red', marginBottom: '15px' }}>{error}</div>} {/* Display error message */}
        <form onSubmit={handleSubmit}>
           <div style={inputGroupStyle}>
            <label htmlFor="firstname" style={labelStyle}> Full name:</label>
            <input
              type="text"
              id="name"
              value={firstname}
              onChange={handleNameChange(setFirstname)}
              required
              style={inputStyle}
            />
          </div>
          {/* {/* <div style={inputGroupStyle}>
            <label htmlFor="secondname" style={labelStyle}> Second name:</label>
            <input
              type="text"
              id="name"
              value={secondname}
              onChange={handleNameChange(setSecondname)}
              required
              style={inputStyle}
            />
          </div> */}
          <div style={inputGroupStyle}>
            <label htmlFor="phoneno" style={labelStyle}> Phone number:</label>
            <input
              type="text"
              id="phoneno"
              value={phoneno}
              onChange={handlePhoneNoChange} // Updated onChange handler
              required
              style={inputStyle}
            />
          </div>
          <div style={inputGroupStyle}>
            <label htmlFor="username" style={labelStyle}>Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange} // Updated onChange handler
              required
              style={inputStyle}
            />
          </div>
          <div style={inputGroupStyle}>
            <label htmlFor="email" style={labelStyle}>Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={inputStyle}
            />
          </div>
          <div style={inputGroupStyle}>
            <label htmlFor="password" style={labelStyle}>Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={inputStyle}
            />
          </div>
          <div style={inputGroupStyle}>
          <label htmlFor="role" style={labelStyle}>Select Role:</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)} // Add role state handling
            required
            style={inputStyle}>
            <option value="">Choose your role</option>
            <option value="vehicleOwner">Vehicle Owner</option>
            <option value="tourGuide">Tour Guide</option>
            <option value="agent">Agent</option>
          </select>
        </div>
          <button
            type="submit"
            style={buttonStyle}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}
          >
            Register
          </button>
          <button
            type="button" // Change to "button" to avoid triggering form submission
            style={buttonStylelogin}
            onClick={() => window.location.href = '/vehicle-owner/login'}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default VehicleOwnerRegister;
