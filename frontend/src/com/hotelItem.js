import React, { useState, useEffect } from "react";
import { Modal, Button, Carousel, Form, Alert } from "react-bootstrap";
import axios from "axios";
import { jwtDecode } from 'jwt-decode'; // Correct import for jwt-decode
import "./hotelItem.css";

function HotelItem({ hotel }) {
    const [showDetails, setShowDetails] = useState(false);
    const [showBooking, setShowBooking] = useState(false);
    const [bookingDetails, setBookingDetails] = useState({
        roomId: '',
        numberOfGuests: 1,
        checkInDate: '',
        checkOutDate: ''
    });
    const [error, setError] = useState(null);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        // Retrieve and decode the JWT token to get the user ID
        const token = localStorage.getItem('token'); 
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUserId(decoded.userId); 
            } catch (err) {
                console.error("Invalid token:", err);
            }
        }
    }, []);

    const handleCloseDetails = () => setShowDetails(false);
    const handleShowDetails = () => setShowDetails(true);

    const handleCloseBooking = () => {
        setShowBooking(false);
        setError(null); 
    };
    const handleShowBooking = () => setShowBooking(true);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBookingDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));

        // Update checkout date range based on check-in date
        if (name === 'checkInDate') {
            const checkOutInput = document.getElementById('formCheckOutDate');
            const minCheckOutDate = new Date(value);
            minCheckOutDate.setDate(minCheckOutDate.getDate() + 1); // At least one day after check-in
            const maxCheckOutDate = new Date(value);
            maxCheckOutDate.setDate(maxCheckOutDate.getDate() + 14); // At most 14 days after check-in
            checkOutInput.min = minCheckOutDate.toISOString().split('T')[0];
            checkOutInput.max = maxCheckOutDate.toISOString().split('T')[0];
        }
    };

    const handleBookingSubmit = async (e) => {
        e.preventDefault();
        setError(null); 

        // Basic validation
        if (bookingDetails.checkInDate >= bookingDetails.checkOutDate) {
            setError("Check-out date must be after check-in date.");
            return;
        }

        if (!userId) {
            setError("You must be logged in to make a booking.");
            return;
        }

        if (!bookingDetails.roomId) {
            setError("Please select a room type.");
            return;
        }

        try {
            const token = localStorage.getItem('token'); 
            const response = await axios.post('http://localhost:8081/api/hotelBookings', {
                roomId: bookingDetails.roomId,
                numberOfGuests: Number(bookingDetails.numberOfGuests),
                checkInDate: bookingDetails.checkInDate,
                checkOutDate: bookingDetails.checkOutDate,
                hotelId: hotel._id,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });

            console.log("Booking successful:", response.data);
            setShowBooking(false); 
            alert("Booking successful!");
        } catch (error) {
            console.error("Error booking hotel:", error);
            setError(
                error.response && error.response.data && error.response.data.message
                    ? error.response.data.message
                    : "There was an error booking the hotel. Please try again."
            ); 
        }
    };

    const getTodayDate = () => {
        return new Date().toISOString().split('T')[0];
    };

    return (
        <div className="row hotelitembs">
            <div className="col-md-4">
                {hotel.images && hotel.images.length > 0 ? (
                    <img
                        className="smallimg"
                        src={`http://localhost:8081/hotel-uploads/${hotel.images[0]}`}
                        alt={`Image of ${hotel.name}`}
                    />
                ) : (
                    <div className="no-image">No image available</div>
                )}
            </div>
            <div className="col-md-7 text-left">
                <h1>{hotel.name}</h1>
                <p>Location: {hotel.location}</p>
                <p className="hotel-amenities">Amenities: {hotel.amenities.join(', ')}</p>
                <p className="hotel-rooms-title">Rooms:</p>
                <ul className="rooms-list">
                    {hotel.rooms.map((room) => (
                        <li className="room-item" key={room._id}>
                            {room.roomType} - LKR {room.price} (Available: {room.availableRooms})
                        </li>
                    ))}
                </ul>
                <div style={{ float: 'right' }}>
                    <Button className="btn btn-primary" onClick={handleShowDetails}>View Details</Button>
                    <Button className="btn btn-primary" onClick={handleShowBooking}>Book Now</Button>
                </div>
            </div>

            {/* Booking Modal */}
            <Modal show={showBooking} onHide={handleCloseBooking}>
                <Modal.Header closeButton>
                    <Modal.Title>Book a Room at {hotel.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleBookingSubmit}>
                        <Form.Group controlId="formRoomType">
                            <Form.Label>Room Type</Form.Label>
                            <Form.Control 
                                as="select" 
                                name="roomId" 
                                onChange={handleInputChange} 
                                required
                            >
                                <option value="">Select a room type</option>
                                {hotel.rooms.map((room) => (
                                    <option key={room._id} value={room._id}>
                                        {room.roomType} - LKR {room.price} (Available: {room.availableRooms})
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formNumberOfGuests">
                            <Form.Label>Number of Guests</Form.Label>
                            <Form.Control
                                type="number"
                                name="numberOfGuests"
                                value={bookingDetails.numberOfGuests}
                                onChange={handleInputChange}
                                min="1"
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formCheckInDate">
                            <Form.Label>Check-in Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="checkInDate"
                                value={bookingDetails.checkInDate}
                                min={getTodayDate()}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formCheckOutDate">
                            <Form.Label>Check-out Date</Form.Label>
                            <Form.Control
                                type="date"
                                id="formCheckOutDate"
                                name="checkOutDate"
                                value={bookingDetails.checkOutDate}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Confirm Booking
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseBooking}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default HotelItem;
