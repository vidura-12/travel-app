import React, { useState } from "react";
import { Modal, Button, Carousel } from "react-bootstrap";
import "./hotelItem.css";

function HotelItem({ hotel }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className="row hotelitembs">
            <div className="col-md-4">
                {hotel.images && hotel.images.length > 0 ? (
                    <img
                        className="smallimg"
                        src={`http://localhost:8081/hotel-uploads/${hotel.images[0]}`} // URL updated to point to uploads
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
                    <Button className="btn btn-primary" onClick={handleShow}>View Details</Button>
                </div>
            </div>

            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{hotel.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Carousel>
                        {hotel.images.map((img, index) => (
                            <Carousel.Item key={index}>
                                <img
                                    className="d-block w-100 bigImg"
                                    src={`http://localhost:8081/uploads/${img}`} // URL updated to point to uploads
                                    alt={`Slide ${index + 1} for ${hotel.name}`}
                                />
                            </Carousel.Item>
                        ))}
                    </Carousel>
                    <p className="popupDescription">{hotel.description}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default HotelItem;
