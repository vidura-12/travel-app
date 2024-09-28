import React, { useEffect, useState } from 'react';
import axios from 'axios';
//import './hotels.css'; // Import your CSS file
import HotelItem from './hotelItem'; // Correctly import HotelItem

const Hotels = () => {
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const response = await axios.get('http://localhost:8081/api/hotels'); // Correct API call
                setHotels(response.data);
            } catch (err) {
                console.error('Error fetching hotels:', err);
                if (err.response) {
                    setError(err.response.data.message || 'Failed to fetch hotels');
                } else {
                    setError('Network error: Unable to reach the server');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchHotels();
    }, []);

    if (loading) return <div className="loading-message">Loading...</div>;
    if (error) return <div className="error-message">{error}</div>;
    if (hotels.length === 0) return <div className="no-hotels-message">No approved hotels found.</div>;

    return (
        <div className='container'>
            <div className="row justify-content-center mt-5">
                {hotels.map((hotel) => (
                    <div className="col-md-9 mt-2" key={hotel._id}> 
                       
                        <HotelItem hotel={hotel} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Hotels;
