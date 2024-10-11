import jsPDF from 'jspdf';
import 'jspdf-autotable';
import axios from 'axios';

export const generateVehicleReport = async () => {
  const doc = new jsPDF();

  const response = await axios.get('http://localhost:8081/api/vehicles');
  console.log('API Response:', response.data);
  

  const vehicles = Array.isArray(response.data) ? response.data : []

  // Proceed only if vehicles is an array
  if (!vehicles.length) {
    alert('No vehicles found in the response.');
    return;
  }

  const logo = await import('../vehiclerental/Vehicle_Images/logo.png');
  const signature = await import('../vehiclerental/Vehicle_Images/signature.jpg');

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 12;
  let currentY = margin;

  const logoImg = new Image();
  const signatureImg = new Image();

  logoImg.src = logo.default;
  logoImg.onload = () => {

    doc.addImage(logo.default, 'PNG', pageWidth - 50, 5, 40, 40);

    doc.rect(5, 5, 200, 287, 'S');

    //company name
    doc.setFontSize(24);
    doc.setTextColor(44, 62, 30); // Color #2c3e50
    doc.text('Travel Mate', margin + 15, margin + 16);

    // Title for the report
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text('Vehicle Manager Report', margin, margin + 35);
    doc.setFontSize(9);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, margin, margin + 41);

    doc.setFontSize(16);
    doc.setTextColor(22, 160, 133);
    doc.text('Summary', margin, margin + 52);

    // Vehicle Summary Section
    const totalVehicles = vehicles.length || 0;
    const approvedVehicles = vehicles.filter(v => v.status === 'approved').length || 0;
    const pendingVehicles = vehicles.filter(v => v.status === 'pending').length || 0;
    const rejectedVehicles = vehicles.filter(v => v.status === 'rejected').length || 0;
    const deletedVehicles = vehicles.filter(v => v.status === 'deleted').length || 0;

    const vehicleSummary = [
      ['Total Vehicles', totalVehicles.toString()],
      ['Approved Vehicles', approvedVehicles.toString()],
      ['Pending Vehicles', pendingVehicles.toString()],
      ['Rejected Vehicles', rejectedVehicles.toString()],
      ['Deleted Vehicles', deletedVehicles.toString()]
    ];
    doc.autoTable({
        head: [['Summary', 'Count']],
        body: vehicleSummary,
        startY: margin + 48, // Adjust Y position of the table
        theme: 'grid',
        headStyles: { fillColor: [22, 160, 133] }, // Custom header color
        margin: { left: 10, right: 10 },
        startY: currentY + 10
    });

    //Add a table with vehicle details
    doc.autoTable({
        head: [['Owner Email', 'Make', 'Model', 'Color', 'Category', 'Price Per Day (LKR)', 'Status']],
        body: vehicles.map(vehicle => [
        vehicle.email,
        vehicle.make,
        vehicle.model,
        vehicle.color,
        vehicle.category,
        `LKR ${vehicle.pricePerDay}`,
        vehicle.status
        ]),
        startY: margin + 55,  // Adjust Y position of the table
        theme: 'grid',
        headStyles: { fillColor: [22, 160, 133] },  // Custom header color
        margin: { left: 10, right: 10 },
    });

    // Save the PDF
    doc.save('Vehicle_Report.pdf');
  }
};
