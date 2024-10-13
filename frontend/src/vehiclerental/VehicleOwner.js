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
  //const [username, setUsername] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [vehicles, setVehicles] = useState([]);
  //const [editingVehicle, setEditingVehicle] = useState(null);
  const [deleteVehicleId, setDeleteVehicleId] = useState(null);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  
  //const email = localStorage.getItem('email');
  useEffect(() => {

    const user = JSON.parse(localStorage.getItem('vehicleOwner'));
    // Check if the email exists in localStorage
    if (user && user.email) {
      setEmail(user.email);
      fetchVehicles(user.email);
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Login Required',
        text: 'You need to log in first.',
        confirmButtonText: 'OK',
        customClass: {
          icon: 'vehicle-red-icon',  // Apply custom class for the icon
      }
      }).then(() => {
        navigate('/vehicle-owner/login'); // Redirect to login page after closing the alert
        });
      return;// If no email, navigate to login
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
      const userVehicles = response.data.data.filter(vehicle => vehicle.ownerEmail === email);
      setVehicles(userVehicles);
    } catch (err) {
      // Handle session expiration
      if (err.response?.status === 401 || err.response?.status === 403) {
        alert('Session expired. Please log in again.');
        localStorage.removeItem('vehicleOwner'); // Clear user data
        localStorage.removeItem('token'); // Clear token
        navigate('/vehicle-owner/login'); // Redirect to login
      } else {
        setError(`Failed to fetch vehicles: ${err.response?.data?.message || err.message}`);
      }
    }
  };
    
  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };

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
    formData.append('ownerEmail', email);
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

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out and redirected to the login page.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, logout',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
          // Proceed with logout
          localStorage.removeItem('token');
          localStorage.removeItem('vehicleOwner');
          sessionStorage.clear();  
          navigate('/vehicle-owner/login');  // Redirect to the login page
      }
    });  
  };

  const handleMyBookingsClick = () => {
    navigate('/vehicle-owner/mybookings');
  };

  const openModal = () => {
    //navigate('/Vehicle-Owner/Add-Vehicle')
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const openEditModal = (vehicle) => {
    setEditingVehicle(vehicle);
    setImagePreview(vehicle.image ? `http://localhost:8081/uploads-vehicle-owner/${vehicle.image}` : null);
    setEditModalIsOpen(true);
  };

  const closeEditModal = () => {
    setEditModalIsOpen(false);
    setEditingVehicle(null);
    setImagePreview(null);
  };

  const [editingVehicle, setEditingVehicle] = useState({
    make: '',
    model: '',
    pricePerDay: '',
    numberOfSeats: '',
    color: '',
    category: 'Car',
    contact: '',
    vnumber: '',
    location: '',
  });
  
  const [validationErrors, setValidationErrors] = useState({
    pricePerDay: '',
    numberOfSeats: '',
    contact: '',
  });

  const handlePriceChange = (e) => {
    const value = e.target.value;
    // Validate price input
    if (!/^\d*\.?\d*$/.test(value) || value < 5000) {
      setValidationErrors({ ...validationErrors, pricePerDay: 'Minimum price per day is 5000' });
    } else {
      setValidationErrors({ ...validationErrors, pricePerDay: '' });
    }
    setEditingVehicle({ ...editingVehicle, pricePerDay: value });
  };

  const handleSeatsChange = (e) => {
    const value = e.target.value;
  
    // Validate number of seats
    if (/^\d*$/.test(value) && value.length <= 2) { // Check if input is numeric
      const numericValue = parseInt(value, 10);
      if (numericValue < 2 || numericValue >= 60) {
        setValidationErrors({
          ...validationErrors,
          numberOfSeats: 'Number of seats must be between 2 and 59',
        });
      } else {
        setValidationErrors({ ...validationErrors, numberOfSeats: '' }); // Clear error if valid
      }
      setEditingVehicle({ ...editingVehicle, numberOfSeats: value });
    } else {
      setValidationErrors({ ...validationErrors, numberOfSeats: 'Number of seats must be numeric' });
    }
  };

  const handleContactChange = (e) => {
    const value = e.target.value;
    
    // Allow only numeric inputs and check length
    if (/^\d*$/.test(value) && value.length <= 10) {
      if (value.length === 10 ) {
        setValidationErrors({ ...validationErrors, contact: '' }); // Clear error if valid
      } else {
        setValidationErrors({ ...validationErrors, contact: 'Contact number must be exactly 10 digits' });
      }
      setEditingVehicle({ ...editingVehicle, contact: value });
    } else {
      setValidationErrors({ ...validationErrors, contact: 'Contact number must be numeric' });
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    
    if (!editingVehicle) return;

    const { _id, make, model, numberOfSeats, pricePerDay, color, category, contact, ac, vnumber, location } = editingVehicle;

    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to update this vehicle?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, update it!',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {

      try {
        const token = localStorage.getItem('token');

        const response = await axios.put(`http://localhost:8081/api/vehicles/${_id}`, {
          make,
          model,
          numberOfSeats,
          pricePerDay,
          color,
          category,
          contact,
          ac,
          vnumber,
          location
          
        }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        // Check if the response indicates success
        if (response.status === 200) {
          // Show SweetAlert for successful update
          Swal.fire({
              icon: 'success',
              title: 'Success!',
              text: 'Vehicle updated successfully!',
              confirmButtonText: 'OK'
          });

          setSuccess('Vehicle updated successfully!');
        }
        
        setError('');
        closeEditModal();

        fetchVehicles(email);
      } catch (err) {
        setError(`Failed to update vehicle post: ${err.response?.data?.message || err.message}`);
      }
    };
  };

  const handleDelete = async (vehicleId) => {
    
    Swal.fire({
      title: 'Confirm Deletion?',
      html: `
          <span style="color: red;">This action cannot be undone!</span><br>
          Are you sure you want to delete this vehicle ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      customClass: {
        icon: 'vehicle-red-icon', // Custom class for the icon
        confirmButton: 'vehicle-btn-danger', // Red color for the Yes button
        cancelButton: 'vehicle-btn-success'   // Green color for the Cancel button
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try{
          const token = localStorage.getItem('token');

          await axios.delete(`http://localhost:8081/api/vehicles/${vehicleId}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }); 

          // Show success message
          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'Vehicle has been deleted successfully.',
            confirmButtonText: 'OK',
            customClass: {
              confirmButton: 'vehicle-btn-OK' // Green color for the OK button
            }
          });
              
          setSuccess('Vehicle deleted successfully!');
          setError('');
          setDeleteVehicleId(null);

          fetchVehicles(email);
        }catch (err) {
          setError(`Failed to delete vehicle post: ${err.response?.data?.message || err.message}`);
        }
      }

    }); 
  };

  return (
    <div  style={body1Style}>
      
      <div className="content" style={contentStyle}>
        <h2 style={vehicle_h2_main}>My Vehicles</h2>
        <button onClick={openModal} style={addButtonStyle}>Add Vehicle</button>
        <button onClick={handleMyBookingsClick} style={myBookingButtonStyle}>My Bookings</button>
        {error && <p style={errorStyle}>{error}</p>}
        {success && <p style={successStyle}>{success}</p>}
        {/* <p>Welcome, {username}!</p> */}

        <div style={tableContainerStyle}>
        <table style={tableStyle}>
  <thead>
    <tr>
      <th>Image</th>
      <th>Make</th>
      <th>Model</th>
      <th>Seats</th>
      <th>Rent Price (Day)</th>
      <th>Color</th>
      <th>Category</th>
      <th>Status</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody style={tbodyStyle}>
    {vehicles.length > 0 ? (
      vehicles.map((vehicle) => (
        <tr key={vehicle._id}>
          <td>
            <img 
              src={vehicle.image ? `http://localhost:8081/uploads-vehicle-owner/${vehicle.image}` : '/placeholder.png'} 
              alt={vehicle.make} 
              style={vehicleImageStyle} 
            />
          </td>
          <td style={tableCellStyle}>{vehicle.make}</td>
          <td style={tableCellStyle}>{vehicle.model}</td>
          <td style={tableCellStyle}>{vehicle.numberOfSeats}</td>
          <td style={tableCellStyle}>LKR {vehicle.pricePerDay}</td>
          <td style={tableCellStyle}>{vehicle.color}</td>
          <td style={tableCellStyle}>{vehicle.category}</td>
          <td style={tableCellStyle2(vehicle.status)}>{vehicle.status}</td>
          
          <td>
            <button onClick={() => openEditModal(vehicle)} style={editButtonStyle}>Update</button>
            <button onClick={() => handleDelete(vehicle._id)} style={deleteButtonStyle}>Delete</button>
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="8" style={tableCellStyle}>No vehicles found</td>
      </tr>
      )}
  </tbody>

</table>
<button onClick={handleLogout} style={logoutButtonStyle}>Logout & Go Back</button>    
        </div>

        <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={modalStyles}>
          <h2 style={vehicle_model_h2}>Add Your Vehicle</h2>
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
            <button
              type="submit"
              style={isHovered ? { ...submitButtonStyle, ...submitButtonStyleHover } : submitButtonStyle}
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}>
              Submit
            </button>
            <button
              onClick={closeModal}
              style={isHovered ? { ...closeButtonStyle, ...closeButtonStyleHover } : closeButtonStyle}
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}>
              Close
            </button>
          </form>
        
        </Modal>

        {editingVehicle && (
          <Modal isOpen={editModalIsOpen} onRequestClose={closeEditModal} style={modalStyles}>
      <h2 style={vehicle_model_h2}>Edit Vehicle</h2>
      <form onSubmit={handleEditSubmit}>
        <div style={formGroupStyle}>
          <div style={inputRowStyle}>
            <div style={inputContainerStyle}>
              <label>Make:</label>
              <input
                type="text"
                value={editingVehicle.make}
                onChange={(e) => setEditingVehicle({ ...editingVehicle, make: e.target.value })}
                style={inputStyle}
                required
              />
            </div>
            <div style={inputContainerStyle}>
              <label>Model:</label>
              <input
                type="text"
                value={editingVehicle.model}
                onChange={(e) => setEditingVehicle({ ...editingVehicle, model: e.target.value })}
                style={inputStyle}
                required
              />
            </div>
            <div style={inputContainerStyle}>
              <label>Price Per Day:</label>
              <input
                type="text" // Use text type for more flexible validation
                value={editingVehicle.pricePerDay}
                onChange={handlePriceChange}
                style={inputStyle}
                required
              />
              {validationErrors.pricePerDay && <p style={errorStyle}>{validationErrors.pricePerDay}</p>}
            </div>
          </div>
          <div style={inputRowStyle}>
            <div style={inputContainerStyle}>
              <label>Number of Seats:</label>
              <input
                type="number"
                value={editingVehicle.numberOfSeats}
                onChange={handleSeatsChange}
                style={inputStyle}
                required
              />
              {validationErrors.numberOfSeats && <p style={errorStyle}>{validationErrors.numberOfSeats}</p>}
            </div>
            <div style={inputContainerStyle}>
              <label>Color:</label>
              <input
                type="text"
                value={editingVehicle.color}
                onChange={(e) => {
                  const regex = /^[A-Za-z]+$/;
                  if (e.target.value === '' || regex.test(e.target.value)) {
                    setEditingVehicle({ ...editingVehicle, color: e.target.value });
                  }
                }}
                style={inputStyle}
                required
              />
            </div>
            <div style={inputContainerStyle}>
              <label>Category:</label>
              <select
                value={editingVehicle.category}
                onChange={(e) => setEditingVehicle({ ...editingVehicle, category: e.target.value })}
                style={inputStyle}
                required
              >
                <option value="Car">Car</option>
                <option value="SUV">SUV</option>
                <option value="Sedan">Sedan</option>
                <option value="Truck">Truck</option>
                <option value="Van">Van</option>
              </select>
            </div>
          </div>
          <div style={inputRowStyle}>
          <div style={inputContainerStyle}>
            <label>Contact:</label>
            <input
              type="text"
              value={editingVehicle.contact}
              onChange={handleContactChange}
              style={inputStyle}
              maxLength="10"
              required
            />
            {validationErrors.contact && <p style={errorStyle}>{validationErrors.contact}</p>}
          </div>
            <div style={inputContainerStyle}>
              <label>AC:</label>
              <div style={radioContainerStyle}>
                <label>
                  <input
                    type="radio"
                    name="ac"
                    value="Yes"
                    checked={editingVehicle.ac === 'Yes'}
                    onChange={(e) => setEditingVehicle({ ...editingVehicle, ac: e.target.value })}
                  />
                  <span style={radioLabelStyle}>Yes</span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="ac"
                    value="No"
                    checked={editingVehicle.ac === 'No'}
                    onChange={(e) => setEditingVehicle({ ...editingVehicle, ac: e.target.value })}
                  />
                  <span style={radioLabelStyle}>No</span>
                </label>
              </div>
            </div>
          </div>
          <div style={inputRowStyle}>
            <div style={inputContainerStyle}>
              <label>Vehicle Number:</label>
              <input
                type="text"
                value={editingVehicle.vnumber}
                onChange={(e) => setEditingVehicle({ ...editingVehicle, vnumber: e.target.value })}
                style={inputStyle}
                required
              />
            </div>
            <div style={inputContainerStyle}>
              <label>Location:</label>
              <input
                type="text"
                value={editingVehicle.location}
                onChange={(e) => setEditingVehicle({ ...editingVehicle, location: e.target.value })}
                style={inputStyle}
                required
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          style={isHovered ? { ...submitButtonStyle, ...submitButtonStyleHover } : submitButtonStyle}
          onMouseOver={handleMouseOver}
          nMouseOut={handleMouseOut}>
          Save Changes
        </button>
        <button
          onClick={closeEditModal}
          style={isHovered ? { ...closeButtonStyle, ...closeButtonStyleHover } : closeButtonStyle}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}>
          Close
        </button>
      </form>
    </Modal>
        )}

        {deleteVehicleId && (
          <Modal isOpen={true} onRequestClose={() => setDeleteVehicleId(null)} style={modalStyles2}>
            <h2>Confirm Deletion</h2>
            <p style={{ marginBottom: '20px', marginTop: '20px' }}>Are you sure you want to delete this vehicle?</p>
            <button onClick={() => handleDelete(deleteVehicleId)} style={deleteButtonStyle2}>Delete</button>
            <button onClick={() => setDeleteVehicleId(null)} style={closeButtonStyle}>Cancel</button>
          </Modal>
        )}
      </div>
    </div>
  );
}

// Styles
const style = document.createElement('style');
style.innerHTML = `
    .vehicle-red-icon {
        color: red !important;
    }
`;
document.head.appendChild(style);

const vehicle_h2_main = {
  fontSize: '30px', 
  fontWeight: 'bold', 
  textAlign: 'center' 
};

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
  maxWidth: '1300px',
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
  marginLeft: '960px',
};


const errorStyle = {
  color: 'red',
  fontSize: '16px',
  marginBottom: '10px',
  
};

const vehicle_model_h2 = {
  fontSize: '26px',
  fontWeight: 'bold',
  textAlign: 'center',
};
const radioContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#f0f0f0',
  padding: '0px',
  borderRadius: '15px',
};

const radioLabelStyle = {
  marginLeft: '10px',
  marginRight: '20px',
  fontSize: '16px',
  textAlign: 'center',
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
  maxWidth: '1300px',
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

const submitButtonStyleHover = {
  backgroundColor: '#45a049',
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

const closeButtonStyleHover = {
  backgroundColor: '#bbb',
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  border: '1px solid #ddd',
  borderRadius: '5px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
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
    backgroundColor: 'F5F5F7',
    width: '90%',
    maxWidth: '900px',
    margin: 'auto',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    height: '650px',
    marginBottom: '50px',
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
  backgroundImage: 'url(/img/Vehicle_Owne_p.jpg)',
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

