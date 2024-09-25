import React from "react";
import './report.css';
import Swal from "sweetalert2";

const EventTable = () => {
  // Sample event data
  const events = [
    { name: "Music Festival", category: "Entertainment", bookings: 120 },
    { name: " beach blis", category: "Culture", bookings: 75 },
    { name: "Tech Conference", category: "Technology", bookings: 300 }
  ];

  // Function to handle CSV download
  const downloadCSV = () => {
    // Prepare CSV data
    const csvRows = [
      ["Event Name", "Event Category", "No. of Bookings"], // Headers
      ...events.map(event => [event.name, event.category, event.bookings])
    ];

    // Convert to CSV format
    const csvContent = csvRows.map(row => row.join(",")).join("\n");

    // Create a Blob from the CSV string
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    // Create a temporary anchor element to trigger the download
    const a = document.createElement("a");
    a.href = url;
    a.download = "events.csv";
    document.body.appendChild(a);
    a.click();

    // Cleanup the URL and anchor element
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);

    // Show SweetAlert after download is successful
    Swal.fire({
      icon: 'success',
      title: 'Download Successful',
      
      confirmButtonText: 'OK'
    });
  };

  return (
    <div 
      style={{
        backgroundImage: "url('/img/dash.jpg')",   
        backgroundSize: 'cover',                  
        backgroundPosition: 'center',              
        backgroundRepeat: 'no-repeat',             
        height: '80vh',                          
        width: '100%',                            
        display: 'flex',                           
        // alignItems: 'center',                      
        justifyContent: 'center'                  
      }}
    >


    <div style={tableContainerStyle}>
      <h2>Event Bookings</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }} className="table">
        <thead>
          <tr>
            <th style={tableHeaderStyle}>Event Name</th>
            <th style={tableHeaderStyle}>Event Category</th>
            <th style={tableHeaderStyle}>No. of Bookings</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event, index) => (
            <tr key={index}>
              <td style={tableCellStyle}>{event.name}</td>
              <td style={tableCellStyle}>{event.category}</td>
              <td style={tableCellStyle}>{event.bookings}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={centerButtonStyle}>
        <button onClick={downloadCSV} style={downloadButtonStyle} className="download">
          Download CSV
        </button>
      </div>
    </div></div>
  );
};

// Styles for table cells, headers, table container, and the download button
const tableCellStyle = {
  padding: "10px",
  border: "1px solid black",
  textAlign: "left"
};

const tableHeaderStyle = {
  padding: "10px",
  border: "1px solid black",
  textAlign: "left",
  backgroundColor: "#f2f2f2"
};

const downloadButtonStyle = {
  padding: "10px 20px",
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  cursor: "pointer",
  borderRadius: "5px"
};

const tableContainerStyle = {
  paddingLeft: "20px",
  paddingRight: "20px",
  marginTop: "20px"
};

const centerButtonStyle = {
  display: "flex",
  justifyContent: "center",
  marginTop: "20px"
};

export default EventTable;
