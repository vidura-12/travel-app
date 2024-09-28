import React, { useState } from "react";
import "./hotelItem.css";
import { Modal, Button, Carousel} from "react-bootstrap";

function HotelItem({ hotel }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className="row hotelitembs">
            <div className="col-md-4">
                {/* Check if images exist before rendering the img element */}
                {hotel.images && hotel.images.length > 0 ? (
                    <img
                        className="smallimg"
                        src={hotel.images[0]}
                        alt={`Image of ${hotel.name}`} // Provide meaningful alt text
                    />
                ) : (
                    <div className="no-image">No image available</div> // Placeholder if no images exist
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
                            {room.roomType} - ${room.price} (Available: {room.availableRooms})
                        </li>
                    ))}
                </ul>
                <div style={{ float: 'right' }}>
                <button className="btn btn-primary" onClick={handleShow}>View Details</button>
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
                                    src={img}
                                    alt={`Slide ${index + 1} for ${hotel.name}`} // Better alt text
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
