import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaCar, FaPalette, FaMapMarkerAlt, FaUsers, FaTags, FaDollarSign } from 'react-icons/fa';

const styles = {

  bodyStyle: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    backgroundColor: '#f4f4f4',
    backgroundImage: 'url(./Vehicle_Images/vehicle_back.jpg)',
  },
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '20px',
    marginTop: '20px',
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
    marginTop: '10px',
    marginLeft: '10px',
    marginRight: '10px',
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
  searchContainer: {
    margin: '20px 0',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '10px',
  },
  searchBoxContainer: {
    position: 'relative',
    width: '250px',
  },
  searchBox: {
    padding: '10px 35px 10px 10px',
    borderRadius: '10px',
    border: '1px solid #ddd',
    width: '100%',
    fontSize: '16px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
  },
  searchIcon: {
    position: 'absolute',
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#aaa',
  },
 
};

const VehicleRentalHome = () => {
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [filters, setFilters] = useState({
    make: '',
    model: '',
    category: '',
    minPrice: '',
    maxPrice: '',
    location: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8081/api/vehicles')
      .then(response => {
        const approvedVehicles = response.data.data.filter(vehicle => vehicle.status === 'approved');
        setVehicles(approvedVehicles);
        setFilteredVehicles(approvedVehicles);
      })
      .catch(error => console.error('Error fetching vehicles:', error));
  }, []);

  useEffect(() => {
    const { make, model, category, minPrice, maxPrice, location } = filters;
    const filtered = vehicles.filter(vehicle => {
      return (
        (make === '' || vehicle.make.toLowerCase().includes(make.toLowerCase())) &&
        (model === '' || vehicle.category.toLowerCase().includes(model.toLowerCase())) &&
        (category === '' || vehicle.category.toLowerCase().includes(category.toLowerCase())) &&
        (location === '' || vehicle.location.toLowerCase().includes(location.toLowerCase())) &&
        (minPrice === '' || vehicle.pricePerDay >= parseFloat(minPrice)) &&
        (maxPrice === '' || vehicle.pricePerDay <= parseFloat(maxPrice))
      );
    });
    setFilteredVehicles(filtered);
  }, [filters, vehicles]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleVehicleBook = (vehicleId) => {
    navigate(`/vehiclebook/${vehicleId}`); 
  };

  return (
    <div style={styles.bodyStyle}>
      
      <div className="content" style={{ textAlign: 'center' }}>
        <h1>Vehicle Rental Home Page</h1>
        
        <button
          style={styles.buttonStyle}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.buttonHoverStyle.backgroundColor}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.buttonStyle.backgroundColor}
          onClick={() => navigate('/sellersignup')}
        >
          List Your Property Here...
        </button>

        <div style={styles.searchContainer}>
          <div style={styles.searchBoxContainer}>
            <input
              type="text"
              name="make"
              placeholder="Make"
              value={filters.make}
              onChange={handleFilterChange}
              style={styles.searchBox}
            />
            <FaCar style={styles.searchIcon} />
          </div>
          <div style={styles.searchBoxContainer}>
            <input
              type="text"
              name="model"
              placeholder="Model"
              value={filters.model}
              onChange={handleFilterChange}
              style={styles.searchBox}
            />
            <FaCar style={styles.searchIcon} />
          </div>
          <div style={styles.searchBoxContainer}>
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={filters.category}
              onChange={handleFilterChange}
              style={styles.searchBox}
            />
            <FaCar style={styles.searchIcon} />
          </div>
          <div style={styles.searchBoxContainer}>
            <input
              type="number"
              name="minPrice"
              placeholder="Min Price"
              value={filters.minPrice}
              onChange={handleFilterChange}
              style={styles.searchBox}
            />
            <FaDollarSign style={styles.searchIcon} />
          </div>
          <div style={styles.searchBoxContainer}>
            <input
              type="number"
              name="maxPrice"
              placeholder="Max Price"
              value={filters.maxPrice}
              onChange={handleFilterChange}
              style={styles.searchBox}
            />
            <FaDollarSign style={styles.searchIcon} />
          </div>
          <div style={styles.searchBoxContainer}>
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={filters.location}
              onChange={handleFilterChange}
              style={styles.searchBox}
            />
            <FaMapMarkerAlt style={styles.searchIcon} />
          </div>
        </div>

        <div style={styles.cardContainer}>
          {filteredVehicles.map(vehicle => (
            <div key={vehicle._id} style={styles.card}>
              <div style={styles.cardImage}>
                <img
                  src={vehicle.image ? `http://localhost:8081/uploads/${vehicle.image}` : '/placeholder.png'}
                  alt={`${vehicle.make} ${vehicle.model}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={styles.priceTag}>LKR {vehicle.pricePerDay}/day</div>
              </div>
              
              <div style={styles.cardContent}>
                <div style={styles.title}>
                  {vehicle.make} {vehicle.model}
                </div>
                <div style={styles.detailRow}>
                  <FaUsers style={styles.icon} />
                  <span>{vehicle.numberOfSeats} Passenger{vehicle.numberOfSeats > 1 ? 's' : ''}</span>
                </div>
                <div style={styles.detailRow}>
                  <FaPalette style={styles.icon} />
                  <span>{vehicle.color}</span>
                </div>
                <div style={styles.detailRow}>
                  <FaMapMarkerAlt style={styles.icon} />
                  <span>{vehicle.location}</span>
                </div>
                <div style={styles.detailRow}>
                  <FaTags style={styles.icon} />
                  <span>{vehicle.category}</span>
                </div>
                <button
                  style={styles.bookNowButton}
                  onClick={() => handleVehicleBook(vehicle._id)}
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VehicleRentalHome;
