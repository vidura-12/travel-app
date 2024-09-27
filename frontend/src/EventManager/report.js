import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './report.css'; // Include your CSS styles if needed

function TicketReport() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
<<<<<<< HEAD
        const response = await axios.get('http://localhost:8081/tickets'); // Update with your endpoint
        setTickets(response.data);
=======
        const response = await axios.get('http://localhost:8081/tickets'); // Adjust the endpoint as necessary
        const events = response.data; // Fetch all events with tickets

        // Flatten the userTickets from all events
        const allTickets = events.flatMap(event => event.userTickets);
        
        console.log('Fetched tickets:', allTickets);  // Debugging
        setTickets(allTickets);
>>>>>>> origin/Final
      } catch (error) {
        console.error('Error fetching ticket details:', error);
      }
    };

    fetchTickets();
  }, []);

  return (
    <div>
      <h2>Ticket Booking Details</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Number of Tickets</th>
            <th>Category</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {tickets.length > 0 ? (
            tickets.map((ticket, index) => (
              <tr key={index}>
                <td>{ticket.tname}</td>
                <td>{ticket.phone}</td>
                <td>{ticket.email}</td>
                <td>{ticket.noOfTicket}</td>
<<<<<<< HEAD
                <td>{ticket.category}</td>
                <td>${ticket.totalPrice.toFixed(2)}</td> {/* Formatting the total price */}
=======
                <td>{ticket.tcategory}</td>
                <td>${ticket.totalPrice?.toFixed(2)}</td> {/* Add safety check for totalPrice */}
>>>>>>> origin/Final
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No ticket bookings found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TicketReport;
