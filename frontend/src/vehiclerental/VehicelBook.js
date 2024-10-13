import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal';
import { FaCar, FaPalette, FaMapMarkerAlt, FaUsers, FaTags } from 'react-icons/fa';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { jwtDecode } from 'jwt-decode';


const styles = {

  bodyStyle: {
    margin: '0',
    padding: '0',
    fontFamily: 'Poppins, sans-serif',
    backgroundColor: '#f4f4f4',
  },
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
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserId(decoded.userId); // Ensure your JWT payload contains 'userId'
      } catch (err) {
        console.error("Invalid token:", err);
      }
    }

    axios.get(`http://localhost:8081/api/vehicles/${vehicleId}`)
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

    if (formData.userPhoneNumber.length !== 10) {
      alert("Phone number must be exactly 10 digits.");
      return;
    }

    if(!userId) { 
      alert("You must be logged in to make a booking.");
      return;
    }

    axios.post('http://localhost:8081/api/bookings', {
      vehicleId,
      ...formData,
      startDate: formData.startDate,
      returnDate,
      totalCost
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(() => {
      setSuccessModalOpen(true);
      try{
        generatePDF(formData, vehicle, totalCost, returnDate);
        console.log(formData, vehicle, totalCost, returnDate);
      } catch (pdfError) {
        console.error('Error generating PDF:', pdfError);
      } 
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
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Error submitting booking:', error.response.data);
        setError(error.response.data.msg);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.error('Error submitting booking:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error submitting booking:', error.message);
      }
    });
  };

  const handleNumberOfDaysChange = (e) => {
    const value = e.target.value;
    
    // Check if the input contains only numbers and has a maximum length of 10
    if (/^[0-9]*$/.test(value) && value.length <= 10) {
      handleChange(e);
    }
  };

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
  
    // Check if value is numeric and has a maximum length of 10
    if (/^\d{0,10}$/.test(value)) {
      setFormData({ ...formData, userPhoneNumber: value });
    }
  };

  const generatePDF = async (formData, vehicle, totalCost, returnDate) => {
    const doc = new jsPDF();
    
    const logo = await import('./Vehicle_Images/logo.png');     // Adding logo (adjust path based on your project)
    const signature = await import('./Vehicle_Images/signature.jpg'); // Adding signature image (adjust path based on your project)
    const logoImg = new Image();
    const signatureImg = new Image();

    logoImg.src = logo.default;
    logoImg.onload = () => {
      doc.addImage(logoImg, 'PNG', 150, 10, 50, 50); // Position the logo (centered)

      // Add a border frame
      doc.rect(5, 5, 200, 287, 'S'); // Adjust size and position for the border 

      // Company Name
      doc.setFontSize(24);
      doc.setTextColor(44, 62, 80); // Color #2c3e50
      doc.text('Travel Mate', 25, 33);
      doc.text('Good Travel !', 25, 45);
    
      // Booking Confirmation Header
      doc.setFontSize(18);
      doc.setTextColor(52, 73, 94); // Color #34495e
      doc.text('Vehicle Booking Confirmation', 105, 64, null, null, 'center');
    
      // Vehicle Details Section
      doc.setFontSize(16);
      doc.setTextColor(22, 160, 133); // Color #16a085
      doc.text('Vehicle Details', 10, 78);
      
      // Vehicle details in a horizontal table format
      doc.autoTable({
        head: [['Vehicle', 'Color', 'Category', 'Price per Day', 'Location', 'Number of Seats', 'Contact Number']],
        body: [[
          `${vehicle.make} ${vehicle.model}`,
          vehicle.color,
          vehicle.category,
          `LKR ${vehicle.pricePerDay}`,
          vehicle.location,
          vehicle.numberOfSeats,
          vehicle.contact
        ]],
        startY: 85, // Position the table below the header
        theme: 'grid',
        headStyles: { fillColor: [22, 160, 133] }, // Color for table headers
        margin: { left: 10, right: 10 },
      });

      // Customer Details Section
      doc.setFontSize(16);
      doc.setTextColor(22, 160, 133);
      doc.text('Customer Details', 10, 115);
    
      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);
      doc.text(`Name: ${formData.userName}`, 10, 125);
      doc.text(`Email: ${formData.userEmail}`, 10, 132);
      doc.text(`Phone Number: ${formData.userPhoneNumber}`, 10, 139);
      doc.text(`Start Date: ${formData.startDate}`, 10, 146);
      doc.text(`Number of Days: ${formData.numberOfDays}`, 10, 153);
      doc.text(`License ID: ${formData.licenseId}`, 10, 160);
      doc.text(`Additional Notes: ${formData.additionalNotes || 'N/A'}`, 10, 167);
    
      // Cost Calculation Section
      doc.setFontSize(16);
      doc.setTextColor(22, 160, 133);
      doc.text('Cost Calculation', 10, 180);
    
      doc.autoTable({
        head: [['Vehicle', 'Price per Day', 'Start Date', 'Return Date','Number of rent Days', 'Total Cost (LKR)']],
        body: [[
          vehicle.make + ' ' + vehicle.model,
          `LKR ${vehicle.pricePerDay}`,
          formData.startDate,
          returnDate,
          formData.numberOfDays,
          `LKR ${totalCost}/=`,
        ]],
        startY: 187, // Position the table below the previous text
        theme: 'grid',
        headStyles: { fillColor: [22, 160, 133] }, // Color for table headers
        margin: { left: 10, right: 10 },
      });
  
      // Thank You Note
      doc.setFontSize(16);
      doc.setTextColor(39, 174, 96); // Color #27ae60
      doc.text('Thank you for booking with us!', 105, doc.lastAutoTable.finalY + 20, null, null, 'center'); // Display below the table
    
      // Signature
      signatureImg.src = signature.default;
      signatureImg.onload = () => {
        doc.addImage(signatureImg, 'JPG', 25, doc.lastAutoTable.finalY + 50, 50, 20); // Position the signature image 

        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text('Vehicle Manager: Buwaneka Wijesinghe', 15,doc.lastAutoTable.finalY + 75, null, null);
        doc.text('Customer Signature', 139,doc.lastAutoTable.finalY + 75, null, null);

        // Save the PDF
        doc.save('Booking_Confirmation.pdf');
      };

      signatureImg.onerror = () => {
        console.error('Failed to load the signature image.');
        // You can proceed without the signature or handle the error as needed
        doc.save('Booking_Confirmation.pdf');
      }
      
    }
    logoImg.onerror = () => {
      console.error('Failed to load the logo image.');
      // You can proceed without the logo or handle the error as needed
      doc.text('Travel Mate', 105, 50, null, null, 'center');
      doc.save('Booking_Confirmation.pdf');
    };
  };

  if (!vehicle) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{margin: '0',
                padding: '0',
                fontFamily: 'Poppins, sans-serif',
                backgroundColor: '#f4f4f4'}}>
      
      <div className="content" style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
        
        
        <div style={styles.cardContainer}>
          <div style={styles.card}>
          <img
            src={vehicle.image ? `http://localhost:8081/uploads-vehicle-owner/${vehicle.image}` : '/placeholder.png'}
            alt={`${vehicle.make} ${vehicle.model}`}
            style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
          />
          <  div style={styles.priceTag}>LKR {vehicle.pricePerDay}/day</div>

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
          width: '34%',
          marginRight: '20px',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.15)',
          backgroundColor: '#fff',
          padding: '15px',
          boxSizing: 'border-box'
        }}>
          <h1 style={{ marginBottom: '20px', fontSize: '26px', fontWeight: 'bold', textAlign: 'center' }}>Book Your Vehicle</h1>
          <form onSubmit={handleSubmit}>
          <label>
              Name:
              <input
                type="text"
                name="userName"
                value={formData.userName}
                onChange={(e) => {
                  const value = e.target.value;
                  // Allow only letters and spaces
                  if (/^[A-Za-z\s]*$/.test(value)) {
                    setFormData({ ...formData, userName: value });
                  }
                }}
                style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd', marginBottom: '-10px' }}
                required
              />
            </label>
            <br/>
            <label>
              Email:
              <input
                type="email"
                name="userEmail"
                value={formData.userEmail}
                onChange={handleChange}
                style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd', marginBottom: '-10px' }}
                required
              />
            </label><br/>
            <label>
              Phone Number:
              <input
                type="text"
                name="userPhoneNumber"
                value={formData.userPhoneNumber}
                onChange={handlePhoneNumberChange}
                style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd', marginBottom: '-10px' }}
                required
              />
            </label><br/>
            <label>
              Start Date:
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd', marginBottom: '-10px' }}
                required
              />
            </label><br/>
            <label>
              Number of Days:
              <input
                type="number"
                name="numberOfDays"
                value={formData.numberOfDays}
                onChange={handleNumberOfDaysChange}
                style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd', marginBottom: '-10px' }}
                required
              />
            </label><br/>
            <label>
              License ID:
              <input
                type="text"
                name="licenseId"
                value={formData.licenseId}
                onChange={handleChange}
                style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd', marginBottom: '-10px' }}
                required
              />
            </label><br/>
            <label>
              Additional Notes:
              <textarea
                name="additionalNotes"
                value={formData.additionalNotes}
                onChange={handleChange}
                style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd', marginBottom: '-10px' }}
              />
            </label>
            <p style={{ fontSize: '1.2em', margin: '10px 0' }}><strong>Total Cost:</strong> LKR {totalCost}</p>
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
            height: '200px',
            padding: '20px',
            borderRadius: '8px',
            backgroundColor: '#f4f4f9',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.15)'
          }
        }}
      >
        <h2 style={{ color: '#27ae60'}}>Success</h2>
        <p>Your booking was successful!</p>
        <button
          onClick={() => setSuccessModalOpen(false)}
          style={{
            width: '110px',
            padding: '8px',
            borderRadius: '5px',
            border: 'none',
            backgroundColor: '#27ae60',
            color: '#fff',
            cursor: 'pointer',
            marginTop: '20px',
            marginLeft : '80px'
          }}
        >
          OK
        </button>
      </Modal>
    </div>
  );
};

export default VehicleBook;
