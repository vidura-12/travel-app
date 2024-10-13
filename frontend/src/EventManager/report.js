import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Pie } from 'react-chartjs-2'; // Import only Pie chart component
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js'; // Import necessary components from chart.js
import jsPDF from 'jspdf'; // Import jsPDF for PDF generation
import 'jspdf-autotable'; // Import the autotable plugin for tables
import './report.css';

// Register necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const TicketReport = () => {
  const [tickets, setTickets] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [chartImage, setChartImage] = useState(null); // To store pie chart image
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const ticketImage = queryParams.get('image');

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await axios.get('http://localhost:8081/ticket/tickets');
      setTickets(response.data);
    } catch (error) {
      console.error('Error fetching tickets:', error);
      setFetchError('Error fetching tickets. Please try again later.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/ticket/tickets/${id}`);
      fetchTickets();
    } catch (error) {
      console.error('Error deleting ticket:', error);
      setFetchError('Error deleting ticket. Please try again later.');
    }
  };

  // Prepare data for the pie chart
  const categoryCounts = tickets.reduce((acc, ticket) => {
    acc[ticket.tcategory] = (acc[ticket.tcategory] || 0) + ticket.noOfTicket;
    return acc;
  }, {});

  const pieChartData = {
    labels: Object.keys(categoryCounts),
    datasets: [
      {
        data: Object.values(categoryCounts),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF9F40', '#4BC0C0'],
      },
    ],
  };

  // Generate PDF report
  const generatePDF = async () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Ticket Report', 14, 22);

    // Add logo in the top right corner
    const logoImg = '/img/logo.jpeg'; // Path to your logo image
    const signatureImg = '/img/sig.jpeg'; // Path to your signature image
    const margin = 10; // Margin from the right edge
    const logoWidth = 60; // Logo width
    const logoHeight = 20; // Logo height

    // Calculate x position to align the logo to the right
    const xPosition = doc.internal.pageSize.getWidth() - logoWidth - margin;
    doc.addImage(logoImg, 'JPEG', xPosition, 10, logoWidth, logoHeight); // Logo position and size

    const tableData = tickets.map(ticket => [
      ticket.tname,
      ticket.tcategory,
      ticket.username,
      ticket.phone,
      ticket.email,
      ticket.price,
      ticket.noOfTicket,
      ticket.total,
    ]);

    // Add table
    doc.autoTable({
      head: [['Name', 'Category', 'Username', 'Phone', 'Email', 'Price', 'Number of Tickets', 'Total']],
      body: tableData,
      startY: 30, // Start position for the table
    });

    // Add pie chart image after the table
    if (chartImage) {
      doc.addImage(chartImage, 'PNG', 14, doc.autoTable.previous.finalY + 10, 140, 70); // Reduced size and position below the table
    }

    // Add a border around the PDF page
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    doc.rect(5, 5, pageWidth - 10, pageHeight - 10); // Adjust for margin

    // Add signature below the pie chart in the bottom left corner
    doc.addImage(signatureImg, 'JPEG', 10, doc.autoTable.previous.finalY + 80, 50, 15); // Adjusted position and size
     
    // Add "Admin Signature" text below the signature
    doc.setFontSize(10); // Decrease font size for "Admin Signature"
    doc.text('Admin Signature', 10, doc.autoTable.previous.finalY + 95); // Adjust position for the text

    doc.save('ticket-report.pdf');
  };

  // Generate the pie chart image
  const getPieChartImage = async () => {
    const canvas = document.getElementsByTagName('canvas')[0];
    if (canvas) {
      const image = await canvas.toDataURL('image/png');
      setChartImage(image);
    }
  };

  // Call getPieChartImage after rendering the chart
  useEffect(() => {
    getPieChartImage();
  }, [tickets]);

  return (
    <div className="ticketReport-dashboard-body" style={{ backgroundImage: `url(/img/${ticketImage})` }}>
      
      <h2 className="ticketReport-dashboard-title">Tickets Booking</h2>
      {fetchError && <span className="error">{fetchError}</span>}

      {/* Position the button above the table on the left */}
      <button className="ticketReport-btn-generate" onClick={generatePDF}>Get Report</button>

      <table className="ticketReport-dashboard-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Username</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Price</th>
            <th>Number of Tickets</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map(ticket => (
            <tr key={ticket._id}>
              <td style={{ color: 'black' }}>{ticket.tname}</td>
              <td style={{ color: 'black' }}>{ticket.tcategory}</td>
              <td style={{ color: 'black' }}>{ticket.username}</td>
              <td style={{ color: 'black' }}>{ticket.phone}</td>
              <td style={{ color: 'black' }}>{ticket.email}</td>
              <td style={{ color: 'black' }}>{ticket.price}.00</td>
              <td style={{ color: 'black' }}>{ticket.noOfTicket}</td>
              <td style={{ color: 'black' }}>{ticket.total}.00</td>
              <td>
                <button className="ticketReport-btn-delete" onClick={() => handleDelete(ticket._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br></br><br></br>

      {/* Add the Pie Chart below the table */}
      <div style={{ width: '30%', margin: '20px auto' }}>
        <h3>Booking Percentage by Category</h3>
        <Pie data={pieChartData} />
      </div>
    </div>
  );
};

export default TicketReport;
