import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import Modal from 'react-modal';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { FaCar, FaPalette, FaMapMarkerAlt, FaUsers, FaTags } from 'react-icons/fa';

const styles = {
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '20px',
    marginRight: '20px',
    height: '200px',

    
  },
  card: {
    position: 'relative',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    width: '300px',
    textAlign: 'center',
    transition: 'transform 0.3s ease',
    cursor: 'pointer',
    padding: '10px',
    '&:hover': {
      transform: 'scale(1.03)', 
    },
  },
  cardImage: {
    position: 'relative',
    width: '100%',
    height: '200px',
    objectFit: 'cover',
  },
  priceTag: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    backgroundColor: '#03b75d', 
    color: '#fff',
    padding: '5px 10px',
    borderRadius: '5px',
    fontSize: '14px',
    fontWeight: 'bold',
  },
  cardContent: {
    padding: '15px',
    borderTop: '1px solid #ddd', 
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start', 
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '10px',
    lineHeight: '1.2',
  },
  detailRow: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '8px', 
    color: '#555',
    fontSize: '14px', 
  },
  icon: {
    marginRight: '6px', 
    color: '#aaa',
  },
  bookNowButton: {
    padding: '10px 20px', 
    backgroundColor: '#0979e2', 
    color: '#fff',
    width: '100%',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease, transform 0.3s ease',
    marginTop: '10px',
    '&:hover': {
      backgroundColor: '#07c1da',
      transform: 'scale(1.05)',
    },
  },
  buttonStyle: {
    display: 'inline-block',
    padding: '10px 20px',
    backgroundColor: '#ff6f61',
    color: '#fff',
    border: 'none',
    borderRadius: '30px',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  buttonHoverStyle: {
    backgroundColor: '#0056b3',
  },
};

Modal.setAppElement('#root');

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const VehicleBook = () => {
  const { vehicleId } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [formData, setFormData] = useState({
    userName: '',
    userEmail: '',
    userPhoneNumber: '',
    numberOfDays: '',
    startDate: '',
    additionalNotes: '',
    licenseId: ''
  });
  const [error, setError] = useState('');
  const [totalCost, setTotalCost] = useState(0);
  const [returnDate, setReturnDate] = useState('');
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/vehicles/${vehicleId}`)
      .then(response => setVehicle(response.data.data))
      .catch(error => console.error('Error fetching vehicle details:', error));
  }, [vehicleId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => {
      const newFormData = { ...prevData, [name]: value };

      if (name === 'startDate' || name === 'numberOfDays') {
        const startDate = new Date(newFormData.startDate);
        const numberOfDays = parseInt(newFormData.numberOfDays, 10) || 0;
        if (startDate && numberOfDays) {
          const today = new Date();
          if (startDate < today) {
            setError('Start date cannot be in the past.');
            return prevData;
          } else {
            setError('');
          }
          const returnDate = new Date(startDate);
          returnDate.setDate(returnDate.getDate() + numberOfDays);
          setReturnDate(returnDate.toISOString().split('T')[0]);

          const dailyPrice = vehicle ? vehicle.pricePerDay : 0;
          setTotalCost(numberOfDays * dailyPrice);
        }
      }

      return newFormData;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('http://localhost:5000/api/bookings', {
      vehicleId,
      ...formData,
      startDate: formData.startDate,
      returnDate,
      totalCost
    })
    .then(() => {
      setSuccessModalOpen(true);
      generatePDF(); 
      setFormData({
        userName: '',
        userEmail: '',
        userPhoneNumber: '',
        numberOfDays: '',
        startDate: '',
        additionalNotes: '',
        licenseId: ''
      });
      setTotalCost(0);
      setReturnDate('');
    })
    .catch(error => {
      console.error('Error submitting booking:', error);
      setError('An error occurred while submitting the booking.');
    });
  };

  const handleNumberOfDaysChange = (e) => {
    if (/^[0-9]*$/.test(e.target.value)) {
      handleChange(e);
    }
  };

  const handlePhoneNumberChange = (e) => {
    if (/^[0-9]*$/.test(e.target.value)) {
      handleChange(e);
    }
  };

  const generatePDF = () => {
    const docDefinition = {
      content: [
        {
          text: 'Travel Mate',
          style: 'companyName',
          alignment: 'center',
          margin: [0, 20, 0, 10]
        },
        {
          text: 'Booking Confirmation',
          style: 'header',
          alignment: 'center',
          margin: [0, 0, 0, 20]
        },
        {
          text: 'Vehicle Details',
          style: 'sectionHeader',
          margin: [0, 0, 0, 10]
        },
        {
          ul: [
            `Make and Model : ${vehicle.make} ${vehicle.model}`,
            `Color : ${vehicle.color}`,
            `Category : ${vehicle.category}`,
            `Price per Day : $${vehicle.pricePerDay}`,
            `Location : ${vehicle.location}`,
            `Number of Seats : ${vehicle.numberOfSeats}`
          ],
          style: 'detailsList'
        },
        {
          text: 'Customer Details',
          style: 'sectionHeader',
          margin: [0, 20, 0, 10]
        },
        {
          ul: [
            `Name : ${formData.userName}`,
            `Email : ${formData.userEmail}`,
            `Phone Number : ${formData.userPhoneNumber}`,
            `Start Date : ${formData.startDate}`,
            `Number of Days : ${formData.numberOfDays}`,
            `License ID : ${formData.licenseId}`,
            `Additional Notes : ${formData.additionalNotes || 'N/A'}`
          ],
          style: 'detailsList'
        },
        {
          text: 'Cost Calculation',
          style: 'sectionHeader',
          margin: [0, 20, 0, 10]
        },
        {
          ul: [
            `Total Cost : $${totalCost}`,
            `Return Date : ${returnDate}`
          ],
          style: 'costList'
        },
        {
          text: 'Thank you for booking with us!',
          style: 'thankYou',
          alignment: 'center',
          margin: [0, 20, 0, 0]
        }
      ],
      styles: {
        companyName: {
          fontSize: 24,
          bold: true,
          color: '#2c3e50'
        },
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
          color: '#34495e'
        },
        sectionHeader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5],
          color: '#16a085'
        },
        detailsList: {
          margin: [0, 0, 0, 10]
        },
        costList: {
          margin: [0, 0, 0, 10],
          bold: true
        },
        thankYou: {
          fontSize: 16,
          italics: true,
          color: '#27ae60'
        }
      },
      defaultStyle: {
        // Default font is used if not specified
      }
    };

    pdfMake.createPdf(docDefinition).download('Booking_Confirmation.pdf');
  };

  if (!vehicle) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <div className="content" style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
        
        
        <div style={styles.cardContainer}>
          <div style={styles.card}>
          <img
            src={vehicle.image ? `http://localhost:5000/uploads/${vehicle.image}` : '/placeholder.png'}
            alt={`${vehicle.make} ${vehicle.model}`}
            style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
          />
          <  div style={styles.priceTag}>${vehicle.pricePerDay}/day</div>

          <h2 style={{ fontSize: '1.3em', margin: '10px 0' }}>{vehicle.make} {vehicle.model}</h2>

          <div style={styles.cardContent}>

          <p style={{ fontSize: '1em', margin: '5px 0' }}>  < FaPalette style={styles.icon} /><strong></strong> {vehicle.color}</p>
          <p style={{ fontSize: '1em', margin: '5px 0' }}>< FaTags style={styles.icon} /><strong></strong> {vehicle.location}</p>
          <p style={{ fontSize: '1em', margin: '5px 0' }}>< FaUsers style={styles.icon} /><strong></strong> {vehicle.numberOfSeats}</p>
          <p style={{ fontSize: '1em', margin: '5px 0' }}>< FaMapMarkerAlt style={styles.icon} /> <strong></strong> {vehicle.category}</p>
         
</div>


          </div>
        </div>





        <div style={{
          width: '40%',
          marginRight: '20px',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.15)',
          backgroundColor: '#fff',
          padding: '15px',
          boxSizing: 'border-box'
        }}>
          <h1 style={{ fontSize: '1.5em', marginBottom: '20px' }}>Book Your Vehicle</h1>
          <form onSubmit={handleSubmit}>
            <label>
              Name:
              <input
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd', marginBottom: '15px' }}
                required
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="userEmail"
                value={formData.userEmail}
                onChange={handleChange}
                style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd', marginBottom: '15px' }}
                required
              />
            </label>
            <label>
              Phone Number:
              <input
                type="text"
                name="userPhoneNumber"
                value={formData.userPhoneNumber}
                onChange={handlePhoneNumberChange}
                style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd', marginBottom: '15px' }}
                required
              />
            </label>
            <label>
              Start Date:
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd', marginBottom: '15px' }}
                required
              />
            </label>
            <label>
              Number of Days:
              <input
                type="number"
                name="numberOfDays"
                value={formData.numberOfDays}
                onChange={handleNumberOfDaysChange}
                style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd', marginBottom: '15px' }}
                required
              />
            </label>
            <label>
              License ID:
              <input
                type="text"
                name="licenseId"
                value={formData.licenseId}
                onChange={handleChange}
                style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd', marginBottom: '15px' }}
                required
              />
            </label>
            <label>
              Additional Notes:
              <textarea
                name="additionalNotes"
                value={formData.additionalNotes}
                onChange={handleChange}
                style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd', marginBottom: '15px' }}
              />
            </label>
            <p style={{ fontSize: '1.2em', margin: '10px 0' }}><strong>Total Cost:</strong> ${totalCost}</p>
            <p style={{ fontSize: '1.2em', margin: '10px 0' }}><strong>Return Date:</strong> {returnDate}</p>
            {error && <p style={{ color: 'red', marginBottom: '15px' }}>{error}</p>}
            <button
              type="submit"
              style={{
                padding: '10px 20px',
                borderRadius: '5px',
                border: 'none',
                backgroundColor: '#27ae60',
                color: '#fff',
                fontSize: '1em',
                cursor: 'pointer'
              }}
            >
              Book Now
            </button>
          </form>
        </div>
      </div>

      <Modal
        isOpen={successModalOpen}
        onRequestClose={() => setSuccessModalOpen(false)}
        style={{
          content: {
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '320px',
            height: '170px',
            padding: '20px',
            borderRadius: '8px',
            backgroundColor: '#f4f4f9',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.15)'
          }
        }}
      >
        <h2 style={{ color: '#27ae60' }}>Success</h2>
        <p>Your booking was successful!</p>
        <button
          onClick={() => setSuccessModalOpen(false)}
          style={{
            padding: '10px',
            borderRadius: '5px',
            border: 'none',
            backgroundColor: '#27ae60',
            color: '#fff',
            cursor: 'pointer',
            marginTop: '20px',
            marginLeft : '120px'
          }}
        >
          OK
        </button>
      </Modal>
    </div>
  );
};

export default VehicleBook;
