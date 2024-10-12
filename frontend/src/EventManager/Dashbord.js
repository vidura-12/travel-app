import React from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div 
      style={{
        backgroundImage: "url(/img/event5.jpg)",   
        backgroundSize: 'cover',                   
        backgroundPosition: 'center',              
        backgroundRepeat: 'no-repeat',             
        height: '100vh',                          
        width: '100%',                            
        display: 'flex',                          
        alignItems: 'center',                      
        justifyContent: 'center'                  
      }}
    >
      <Container className="eventdashboard-container">
        
        <Row className="mb-4">
          <Col md={6}>
            <Card className="eventdashboard-card animate__animated animate__fadeInLeft">
              <Card.Body>
                <Card.Title>Approved Events</Card.Title>
                <Card.Text>
                  Check all the events that have been approved and are ready for booking.
                </Card.Text>
                <Link to={`/EventManager/EventList`}>
                <Button variant="success">View Approved Events</Button></Link>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="eventdashboard-card animate__animated animate__fadeInRight">
              <Card.Body>
                <Card.Title>Pending Approvals</Card.Title>
                <Card.Text>
                  Review events that are waiting for approval and take action.
                </Card.Text>
                <Link to={`/EventManager/PendingEvent`}>
                <Button variant="warning">Review Pending Approvals</Button></Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Center the last card */}
        <Row className="justify-content-center mb-4">
          <Col md={6} className="mx-auto">
            <Card className="eventdashboard-card animate__animated animate__fadeInRight">
              <Card.Body>
                <Card.Title>Manage Event Categories</Card.Title>
                <Card.Text>
                  Add, update, or remove event categories to keep your event list organized.
                </Card.Text>
                <Link to={`/EventManager/addEvent`}>
                <Button variant="primary">Manage Categories</Button></Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* New Paragraph describing the event management functionality */}
        <Row>
          <Col>
            <p className="eventdashboard-description">
              The Event Management Dashboard provides a centralized hub for managing all aspects of event organization. 
              With features like approval tracking, event category management, and reporting tools, this dashboard ensures 
              seamless event planning and execution, helping administrators and organizers stay on top of their tasks.
            </p>
          </Col>
        </Row>

      </Container>
    </div>
  );
};

// Inline CSS for custom styles
const styles = `
.eventdashboard-container {
    background-image: url('https://example.com/your-background-image.jpg'); /* Replace with your background image */
    background-size: cover;
    background-position: center;
    min-height: 70vh;
    padding: 20px;
    position: relative;
    backdrop-filter: blur(8px);  /* Adds a blur effect */
    -webkit-backdrop-filter: blur(8px); /* For Safari support */
    background-color: rgba(255, 255, 255, 0.1); /* Slightly transparent for better visibility */
    border-radius: 15px; /* Optional: for rounded corners */
}

.eventdashboard-title {
    font-family: 'Arial', sans-serif;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
    margin-bottom: 30px;
}

.eventdashboard-card {
    border: none;
    border-radius: 10px;
    transition: transform 0.3s;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.eventdashboard-card:hover {
    transform: scale(1.05);
}



.animate__animated {
    animation-duration: 1s;
}

.eventdashboard-description {
    font-family: 'Arial', sans-serif;
    font-size: 16px;
    color: #333;
    background-color: rgba(255, 255, 255, 0.8); /* Light background for readability */
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
    margin-top: 20px;
}
`;

// Add CSS to the page dynamically
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default Dashboard;
