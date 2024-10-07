import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HotelItem from './hotelItem';
import './hotels.css';

const Hotels = () => {
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        searchTerm: '',
        roomTypes: [],
        amenities: []
    });

    const roomTypesList = [
        "Single Room",
        "Double Room",
        "Twin Room",
        "Triple Room",
        "Suite"
    ];

    const amenitiesList = [
        "Wi-Fi", "Pool", "Gym", "Restaurant", "Parking",
        "Room Service", "Bar", "Spa", "Air Conditioning"
    ];

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const response = await axios.get('http://localhost:8081/api/hotels/approved');
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

    const handleFilterChange = (type, value) => {
        if (type === 'amenities' || type === 'roomTypes') {
            setFilters(prev => ({
                ...prev,
                [type]: prev[type].includes(value)
                    ? prev[type].filter(item => item !== value)
                    : [...prev[type], value]
            }));
        } else {
            setFilters(prev => ({
                ...prev,
                [type]: value
            }));
        }
    };

    const clearFilters = () => {
        setFilters({
            searchTerm: '',
            roomTypes: [],
            amenities: []
        });
    };

    const filteredHotels = hotels.filter(hotel => {
        const matchesSearch = hotel.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                             hotel.location.toLowerCase().includes(filters.searchTerm.toLowerCase());
        
        const matchesRoomTypes = filters.roomTypes.length === 0 ||
                                hotel.rooms.some(room => filters.roomTypes.includes(room.roomType));
        
        const matchesAmenities = filters.amenities.length === 0 ||
                                 filters.amenities.every(amenity => hotel.amenities.includes(amenity));
        
        return matchesSearch && matchesRoomTypes && matchesAmenities;
    });

    if (loading) return <div className="loading-message">Loading...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className='container'>
            <div className="filter-bar">
                <input 
                    type="text" 
                    placeholder="Search hotels..." 
                    value={filters.searchTerm}
                    onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
                    className="search-input"
                />

                <div className="dropdown">
                    <button className="dropdown-button">
                        Room Types
                    </button>
                    <div className="dropdown-content">
                        {roomTypesList.map(roomType => (
                            <label key={roomType} className="checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={filters.roomTypes.includes(roomType)}
                                    onChange={() => handleFilterChange('roomTypes', roomType)}
                                />
                                <span>{roomType}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="dropdown">
                    <button className="dropdown-button">
                        Amenities
                    </button>
                    <div className="dropdown-content">
                        {amenitiesList.map(amenity => (
                            <label key={amenity} className="checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={filters.amenities.includes(amenity)}
                                    onChange={() => handleFilterChange('amenities', amenity)}
                                />
                                <span>{amenity}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <button onClick={clearFilters} className="clear-filters-button">
                    Clear Filters
                </button>
            </div>

            <div className="hotels-list">
                {filteredHotels.length === 0 ? (
                    <div className="no-hotels-message">No hotels found.</div>
                ) : (
                    filteredHotels.map((hotel) => (
                        <div className="hotel-item-wrapper" key={hotel._id}>
                            <HotelItem hotel={hotel} />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Hotels;
