import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Import jspdf-autotable
import './report.css'; // Include your CSS styles if needed

function TicketReport() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get('http://localhost:8081/tickets'); // Adjust the endpoint as necessary
        const events = response.data; // Fetch all events with tickets

        // Flatten the userTickets from all events
        const allTickets = events.flatMap(event => event.userTickets);

        console.log('Fetched tickets:', allTickets);  // Debugging
        setTickets(allTickets);
      } catch (error) {
        console.error('Error fetching ticket details:', error);
      }
    };

    fetchTickets();
  }, []);

  const generatePDF = () => {
    const doc = new jsPDF();

    // Define the columns and their styles
    const columns = [
      { title: "Name", dataKey: "tname" },
      { title: "Phone", dataKey: "phone" },
      { title: "Email", dataKey: "email" },
      { title: "Number of Tickets", dataKey: "noOfTicket" },
      { title: "Category", dataKey: "tcategory" },
      { title: "Total Price", dataKey: "totalPrice" },
    ];

    // Prepare the data for the PDF
    const data = tickets.map(ticket => ({
      tname: ticket.tname,
      phone: ticket.phone,
      email: ticket.email,
      noOfTicket: ticket.noOfTicket,
      tcategory: ticket.tcategory,
      totalPrice: `$${ticket.totalPrice?.toFixed(2)}`, // Add safety check for totalPrice
    }));

    // Generate the table in the PDF with borders
    doc.autoTable(columns, data, {
      styles: {
        cellPadding: 5,
        fontSize: 10,
        halign: 'center', // Align text to center
        valign: 'middle', // Align text to middle
        lineColor: [0, 0, 0], // Border color
        lineWidth: 0.75, // Border width
      },
      headStyles: {
        fillColor: [255, 255, 255], // Header background color
        textColor: [0, 0, 0], // Header text color
        fontStyle: 'bold',
      },
      margin: { top: 20 },
      theme: 'grid', // Optional: Use grid theme for borders
    });

    // Save the generated PDF
    doc.save("Ticket_Report.pdf");
  };

  return (
    <div>
      <h2>Ticket Booking Details</h2>
      <button onClick={generatePDF} className="btn btn-primary mb-3">Download PDF</button>
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
                <td>{ticket.tcategory}</td>
                <td>${ticket.totalPrice?.toFixed(2)}</td> {/* Add safety check for totalPrice */}
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
