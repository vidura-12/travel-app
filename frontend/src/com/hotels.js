import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HotelItem from './hotelItem'; // Ensure correct import path

const Hotels = () => {
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const response = await axios.get('http://localhost:8081/api/hotels/approved'); // Ensure the API URL is correct
                setHotels(response.data);
            } catch (err) {
                console.error('Error fetching hotels:', err);
                setError(err.response ? err.response.data.message : 'Network error: Unable to reach the server');
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
