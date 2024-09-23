import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import Header from './Header';

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
  const [username, setUsername] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [vehicles, setVehicles] = useState([]);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [deleteVehicleId, setDeleteVehicleId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('vehicleOwner'));
    if (user && user.username) {
      setUsername(user.username);
      fetchVehicles(user.username);
    } else {
      navigate('/vehicle-owner/login');
    }
  }, [navigate]);

  const fetchVehicles = async (username) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8081/api/vehicles', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const userVehicles = response.data.data.filter(vehicle => vehicle.username === username);
      setVehicles(userVehicles);
    } catch (err) {
      setError(`Failed to fetch vehicles: ${err.response?.data?.message || err.message}`);
    }
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

    if (pricePerDay <= 0 || numberOfSeats <= 0) {
      setError('Price per day and number of seats must be greater than 0.');
      return;
    }

    const formData = new FormData();
    formData.append('username', username);
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

      fetchVehicles(username);
    } catch (err) {
      setError(`Failed to create vehicle post: ${err.response?.data?.message || err.message}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('vehicleOwner');
    navigate('/vehicle-owner/login');
  };

  const handleMyBookingsClick = () => {
    navigate('/mybookings');
  };

  const openModal = () => {
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

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    
    if (!editingVehicle) return;

    const { _id, make, model, numberOfSeats, pricePerDay, color, category, contact, ac, vnumber, location } = editingVehicle;

    try {
      const token = localStorage.getItem('token');

      await axios.put(`http://localhost:8081/api/vehicles/${_id}`, {
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

      setSuccess('Vehicle updated successfully!');
      setError('');
      closeEditModal();

      fetchVehicles(username);
    } catch (err) {
      setError(`Failed to update vehicle post: ${err.response?.data?.message || err.message}`);
    }
  };

  const handleDelete = async (vehicleId) => {
    try {
      const token = localStorage.getItem('token');

      await axios.delete(`http://localhost:8081/api/vehicles/${vehicleId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setSuccess('Vehicle deleted successfully!');
      setError('');
      setDeleteVehicleId(null);

      fetchVehicles(username);
    } catch (err) {
      setError(`Failed to delete vehicle post: ${err.response?.data?.message || err.message}`);
    }
  };

  return (
    <div  style={body1Style}>
      <Header />
      <div className="content" style={contentStyle}>
        <h2>My Vehicles</h2>
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
          <td style={tableCellStyle}>${vehicle.pricePerDay}</td>
          <td style={tableCellStyle}>{vehicle.color}</td>
          <td style={tableCellStyle}>{vehicle.category}</td>
          <td style={tableCellStyle2(vehicle.status)}>{vehicle.status}</td>
          
          <td>
            <button onClick={() => openEditModal(vehicle)} style={editButtonStyle}>Update</button>
            <button onClick={() => setDeleteVehicleId(vehicle._id)} style={deleteButtonStyle}>Delete</button>
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
          <h2>Add Your Vehicle</h2>
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
                  <input type="number" value={numberOfSeats} onChange={(e) => setNumberOfSeats(e.target.value)} style={inputStyle} required />
                </div>
              </div>
              <div style={inputRowStyle}>
                <div style={inputContainerStyle}>
                  <label>Price Per Day:</label>
                  <input type="number" value={pricePerDay} onChange={(e) => setPricePerDay(e.target.value)} style={inputStyle} required />
                </div>
                <div style={inputContainerStyle}>
                  <label>Color:</label>
                  <input type="text" value={color} onChange={(e) => setColor(e.target.value)} style={inputStyle} required />
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
                  <input type="text" value={contact} onChange={(e) => setContact(e.target.value)} style={inputStyle} required />
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

        {editingVehicle && (
          <Modal isOpen={editModalIsOpen} onRequestClose={closeEditModal} style={modalStyles}>
            <h2>Edit Vehicle</h2>
            <form onSubmit={handleEditSubmit}>
              <div style={formGroupStyle}>
                <div style={inputRowStyle}>
                  <div style={inputContainerStyle}>
                    <label>Make:</label>
                    <input type="text" value={editingVehicle.make} onChange={(e) => setEditingVehicle({ ...editingVehicle, make: e.target.value })} style={inputStyle} required />
                  </div>
                  <div style={inputContainerStyle}>
                    <label>Model:</label>
                    <input type="text" value={editingVehicle.model} onChange={(e) => setEditingVehicle({ ...editingVehicle, model: e.target.value })} style={inputStyle} required />
                  </div>
                  <div style={inputContainerStyle}>
                    <label>Price Per Day:</label>
                    <input type="number" value={editingVehicle.pricePerDay} onChange={(e) => setEditingVehicle({ ...editingVehicle, pricePerDay: e.target.value })} style={inputStyle} required />
                  </div>
                </div>
                <div style={inputRowStyle}>
                  
                  <div style={inputContainerStyle}>
                    <label>Number of Seats:</label>
                    <input type="number" value={editingVehicle.numberOfSeats} onChange={(e) => setEditingVehicle({ ...editingVehicle, numberOfSeats: e.target.value })} style={inputStyle} required />
                  </div>
                  <div style={inputContainerStyle}>
                    <label>Color:</label>
                    <input type="text" value={editingVehicle.color} onChange={(e) => setEditingVehicle({ ...editingVehicle, color: e.target.value })} style={inputStyle} required />
                  </div>
                  <div style={inputContainerStyle}>
                    <label>Category:</label>
                    <select value={editingVehicle.category} onChange={(e) => setEditingVehicle({ ...editingVehicle, category: e.target.value })} style={inputStyle} required>
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
                    <input type="text" value={editingVehicle.contact} onChange={(e) => setEditingVehicle({ ...editingVehicle, contact: e.target.value })} style={inputStyle} required />
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
                </div>
                <div style={inputRowStyle}>                   
                </div>
                <div style={inputRowStyle}>
                  <div style={inputContainerStyle}>
                    <label>Vehicle Number:</label>
                    <input type="text" value={editingVehicle.vnumber} onChange={(e) => setEditingVehicle({ ...editingVehicle, vnumber: e.target.value })} style={inputStyle} required />
                  </div>
                  <div style={inputContainerStyle}>
                    <label>Location:</label>
                    <input type="text" value={editingVehicle.location} onChange={(e) => setEditingVehicle({ ...editingVehicle, location: e.target.value })} style={inputStyle} required />
                  </div>
                </div>
              </div>
              <button type="submit" style={submitButtonStyle}>Save Changes</button>
              <button onClick={closeEditModal} style={closeButtonStyle}>Close</button>
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
  marginBottom: '20px',
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

