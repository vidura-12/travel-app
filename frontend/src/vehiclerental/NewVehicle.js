import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import Swal from 'sweetalert2';

Modal.setAppElement('#root');

function VehicleOwnerCreatePost() {
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [pricePerDay, setPricePerDay] = useState('');
    const [numberOfSeats, setNumberOfSeats] = useState('');
    const [color, setColor] = useState('');
    const [category, setCategory] = useState('');
    const [contact, setContact] = useState('');
    const [ac, setAc] = useState('');
    const [vnumber, setVnumber] = useState('');
    const [location, setLocation] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [editModalIsOpen, setEditModalIsOpen] = useState(false);
    const [vehicles, setVehicles] = useState([]);
    const [deleteVehicleId, setDeleteVehicleId] = useState(null);
    const navigate = useNavigate();

    const email = localStorage.getItem('email');
  useEffect(() => {
    // Check if the email exists in localStorage
    if (email) {
      fetchVehicles(email);
    } else {
      // If no email, navigate to login
      navigate('/scheduler/sellersignin');
    }
  }, [email, navigate]); // Trigger fetching when the email is set
  
  
  const fetchVehicles = async (email) => {
    try {
      const token = localStorage.getItem('token');

      const response = await axios.get('http://localhost:8081/api/vehicles', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const userVehicles = response.data.data.filter(vehicle => vehicle.email === email);
      setVehicles(userVehicles);
    } catch (err) {
      // Handle session expiration
      if (err.response?.status === 401 || err.response?.status === 403) {
        alert('Session expired. Please log in again.');
        localStorage.removeItem('vehicleOwner'); // Clear user data
        localStorage.removeItem('token'); // Clear token
        navigate('/scheduler/sellersignin'); // Redirect to login
      } else {
        setError(`Failed to fetch vehicles: ${err.response?.data?.message || err.message}`);
      }
    }
  };
    
  const [validationErrors, setValidationErrors] = useState({
    pricePerDay: '',
    numberOfSeats: '',
    contact: '',
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!make || !model || !pricePerDay || !numberOfSeats || !color || !category || !contact || !ac || !vnumber || !location) {
      setError('All fields are required.');
      return;
    }

  
    // Price validation: must be at least 5000
    if (pricePerDay < 5000) {
      setError('Price per day must be at least 5000.');
      return;
    }

    // Ensure contact number is exactly 10 digits long
    if (contact.length !== 10) {
        setError('Contact number must be exactly 10 digits.');
        return;
    }

    // Ensure pricePerDay and numberOfSeats are positive
    if (numberOfSeats < 2) {
        setError('Number of seats must be greater than 2.');
        return;
    }

    const formData = new FormData();
    formData.append('email', email);
    formData.append('make', make);
    formData.append('model', model);
    formData.append('numberOfSeats', numberOfSeats);
    formData.append('pricePerDay', pricePerDay);
    formData.append('color', color);
    formData.append('category', category);
    formData.append('contact', contact);
    formData.append('ac', ac);
    formData.append('vnumber', vnumber);
    formData.append('location', location);
    if (image) {
      formData.append('image', image);
    }

    try {
      const token = localStorage.getItem('token');

      const response = await axios.post('http://localhost:8081/api/vehicles/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });

      Swal.fire({
        icon: 'success',
        title: 'Success!',
        html: `
            Vehicle posted successfully!<br>
            <span style="color: red;">Your vehicle will be available for rent after admin approval</span>
        `,
        confirmButtonText: 'OK'
    });

      setSuccess('Vehicle posted successfully!');
      setMake('');
      setModel('');
      setPricePerDay('');
      setNumberOfSeats('');
      setColor('');
      setCategory('');
      setContact('');
      setAc('');
      setVnumber('');
      setLocation('');
      setImage(null);
      setImagePreview(null);
      setError('');
      setModalIsOpen(false);

      fetchVehicles(email);
    } catch (err) {
      setError(`Failed to create vehicle post: ${err.response?.data?.message || err.message}`);
    }
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

    return (
        <div>
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={modalStyles}>
          <h2>Add Your Vehicle</h2>
          {error && <p style={errorStyle}>{error}</p>}
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div style={formGroupStyle}>
              <div style={inputRowStyle}>
                <div style={inputContainerStyle}>
                  <label>Make:</label>
                  <input type="text" value={make} onChange={(e) => setMake(e.target.value)} style={inputStyle} required />
                </div>
                <div style={inputContainerStyle}>
                  <label>Model:</label>
                  <input type="text" value={model} onChange={(e) => setModel(e.target.value)} style={inputStyle} required />
                </div>
                <div style={inputContainerStyle}>
                  <label>Number of Seats:</label>
                  <input 
                    type="number" 
                    value={numberOfSeats} 
                    onChange={(e) => {
                      const value = e.target.value;
                      // Allow only numbers and prevent empty value
                      if (/^[0-9]+$/.test(value)) {
                        setNumberOfSeats(value);
                      }
                    }} 
                    style={inputStyle} 
                    required 
                    min="2" 
                    max="100" 
                  />
                </div>
              </div>
              <div style={inputRowStyle}>
              <div style={inputContainerStyle}>
                <label>Price Per Day:</label>
                <input 
                  type="number" 
                  value={pricePerDay} 
                  onChange={(e) => {
                    const value = e.target.value;
                    // Allow only valid number inputs
                    if (/^\d*\.?\d*$/.test(value)) {
                      setPricePerDay(value);
                    }
                  }} 
                  style={inputStyle} 
                  required 
                  min="2" 
                />
              </div>
              <div style={inputContainerStyle}>
                <label>Color:</label>
                <input 
                  type="text"
                  value={color} 
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^[A-Za-z]*$/.test(value)) {
                      setColor(value);
                      setValidationErrors({ ...validationErrors, color: '' }); // Clear error if valid
                    } else {
                      setValidationErrors({ ...validationErrors, color: 'Color must contain only letters' }); // Set error
                    }
                  }}
                  style={inputStyle}
                  required 
                />
                {validationErrors.color && <p style={errorStyle}>{validationErrors.color}</p>}
              </div>
                <div style={inputContainerStyle}>
                  <label>Category:</label>
                  <select value={category} onChange={(e) => setCategory(e.target.value)} style={inputStyle} required>
                    <option value="">Select Category</option>
                    <option value="Car">Car</option>
                    <option value="SUV">SUV</option>
                    <option value="Sedan">Sedan</option>
                    <option value="Truck">Truck</option>
                    <option value="Van">Van</option>
                  </select>
                </div>
              </div>
              <div style={inputRowStyle}>     
              </div>
              <div style={inputRowStyle}>
              <div style={inputContainerStyle}>
                <label>Contact:</label>
                <input 
                    type="text" 
                    value={contact} 
                    onChange={(e) => {
                        const regex = /^[0-9]*$/;
                        if (regex.test(e.target.value) && e.target.value.length <= 10) {
                            setContact(e.target.value);
                        }
                    }} 
                    maxLength="10"
                    style={inputStyle} 
                    required 
                />
              </div>
               
                <div style={inputContainerStyle}>
                <label>AC:</label>
                <div style={radioContainerStyle}>
                  <label>
                    <input
                      type="radio"
                      name="ac"
                      value="Yes"
                      checked={ac === 'Yes'}
                      onChange={(e) => setAc(e.target.value)}
                    />
                    <span style={radioLabelStyle}>Yes</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="ac"
                      value="No"
                      checked={ac === 'No'}
                      onChange={(e) => setAc(e.target.value)}
                    />
                    <span style={radioLabelStyle}>No</span>
                  </label>
                </div>
                </div>
                <div style={inputContainerStyle}>
                  <label>Vehicle Number:</label>
                  <input type="text" value={vnumber} onChange={(e) => setVnumber(e.target.value)} style={inputStyle} required />
                </div>
              </div>
              <div style={inputRowStyle}>
              
                <div style={inputContainerStyle}>
                  <label>Location:</label>
                  <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} style={inputStyle} required />
                </div>
                <div style={inputContainerStyle}>
                  <label>Image:</label>
                  <input type="file" onChange={handleImageChange} style={inputStyle} />
                  {/* {imagePreview && <img src={imagePreview} alt="Preview" style={imagePreviewStyle} />} */}
                </div>
              </div>
              <div style={inputRowStyle}>
               
              </div>
            </div>
            <button type="submit" style={submitButtonStyle}>Submit</button>
            <button onClick={closeModal} style={closeButtonStyle}>Close</button>
          </form>
        
        </Modal>
        </div>
    );
}
// Styles
const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    background: '#f0f0f0',
    minHeight: '100vh',
  };
  
  const contentStyle = {
    width: '100%',
    maxWidth: '1200px',
    margin: '120px 120px 20px 120px',
    background: '#fff',
    padding: '20px',
    borderRadius: '25px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    opacity: 0.9,
    
  
  };
  
  const addButtonStyle = {
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    margin: '10px 0',
    cursor: 'pointer',
    borderRadius: '5px',
  };
  
  const myBookingButtonStyle = {
    backgroundColor: '#deaf05',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    margin: '10px 0',
    cursor: 'pointer',
    borderRadius: '5px',
    marginLeft: '850px',
  };
  
  
  const errorStyle = {
    color: 'red',
    fontSize: '16px',
    marginBottom: '10px',
    
  };
  
  const radioContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    padding: '10px',
    borderRadius: '15px',
  };
  
  const radioLabelStyle = {
    marginLeft: '10px',
    marginRight: '20px',
    fontSize: '16px',
  };
  
  const successStyle = {
    color: 'green',
    fontSize: '16px',
    marginBottom: '10px',
    marginTop: '10px',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '18px',
  
  };
  
  const tableContainerStyle = {
    marginTop: '20px',
    marginBottom: '20px',
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    background: '#f0f0f0',
    borderRadius: '25px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  
  };
  
  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '100px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    overflow: 'hidden',
    
  };
  
  const tbodyStyle = {
    textAlign: 'center',
    marginBottom: '100px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    overflow: 'hidden',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  
  
  };
  
  const tableCellStyle = {
    padding: '20px 10px 20px 10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    overflow: 'hidden',
    textAlign: 'center',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#333',
    backgroundColor: '#f0f0f0',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    
  };
  const vehicleImageStyle = {
    width: '100px',
    height: 'auto',
    borderRadius: '5px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    marginTop: '20px',
  
  };
  const editButtonStyle = {
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '14px',
    margin: '0 5px',
    cursor: 'pointer',
    borderRadius: '5px',
  
  };
  
  const deleteButtonStyle = {
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '14px',
    margin: '0 5px',
    cursor: 'pointer',
    borderRadius: '5px',
  };
  
  const submitButtonStyle = {
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    cursor: 'pointer',
    borderRadius: '5px',
    
  };
  
  const closeButtonStyle = {
    backgroundColor: '#ccc',
    color: 'black',
    border: 'none',
    padding: '10px 20px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    margin: '0 5px',
    cursor: 'pointer',
    borderRadius: '5px',
  };
  
  const inputStyle = {
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    marginBottom: '10px',
  };
  
  const inputRowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
  };
  
  const inputContainerStyle = {
    flex: '1',
    marginRight: '10px',
  };
  
  const formGroupStyle = {
    marginBottom: '30px',
  };
  
  const modalStyles = {
    content: {
      width: '90%',
      maxWidth: '900px',
      margin: 'auto',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      height: '500px',
      marginBottom: '20px',
    }, 
  };
  
  
  const modalStyles2 = {
    content: {
      width: '90%',
      maxWidth: '450px',
      margin: 'auto',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      height: '330px',
      marginBottom: '120px',
      
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
    },}
  
  
  const imagePreviewStyle = {
    width: '100px',
    height: 'auto',
    marginTop: '10px',
    borderRadius: '5px',
  };
  
  const deleteButtonStyle2 = {
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    padding: '12px 20px 10px 20px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '14px',
    margin: '0 5px 10px 5px',
    cursor: 'pointer',
    borderRadius: '5px',
  };
   
  
  const body1Style = {
  
  
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    backgroundImage: 'url(https://www.rentallsoftware.com/wp-content/uploads/2020/10/type-car-rental.jpg)',
    backgroundSize: 'cover',
    minHeight: '100vh',
    width: '100%',
  };
  
  
   const logoutButtonStyle  = {
  
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '14px',
    margin: '0 5px',
    cursor: 'pointer',
    borderRadius: '5px',
   }
  
  
   const getStatusColor = (status) => {
    switch (status) {
        case 'pending':
            return 'blue';
        case 'approved':
            return 'green';
        case 'rejected':
            return 'red';
        default:
            return 'gray'; 
    }
  };
  
  const tableCellStyle2 = (status) => ({
    color: getStatusColor(status),
  
    padding: '8px',
    border: '1px solid #ddd',
    textAlign: 'center',
  }); 
  
export default VehicleOwnerCreatePost;