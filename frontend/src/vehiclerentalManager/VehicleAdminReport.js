import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const generateVehicleReport = async (vehicles) => {
  const doc = new jsPDF();

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
    doc.text('Summary', margin, margin + 55);

    
    //Vehicle Summary Section
    // const vehicleSummary = [
    //     ['Total Vehicles', Vehicles.length.toString()],
    //     ['Approved Vehicles', Vehicles.filter(h => h.status === 'approved').length.toString()],
    //     ['Pending Vehicles', Vehicles.filter(h => h.status === 'pending').length.toString()],
    //     ['Rejected Vehicles', Vehicles.filter(h => h.status === 'rejected').length.toString()]
    //   ];

    // doc.autoTable({
    //     head: [['Summary', 'Count']],
    //     body: vehicleSummary,
    //     startY: margin + 48, // Adjust Y position of the table
    //     theme: 'grid',
    //     headStyles: { fillColor: [22, 160, 133] }, // Custom header color
    //     margin: { left: 10, right: 10 },
    //     startY: currentY + 10
    // });

    //Add a table with vehicle details
    doc.autoTable({
        head: [['Owner Email', 'Make', 'Model', 'Color', 'Category', 'Price Per Day (LKR)', 'Status']],
        body: vehicles.map(vehicle => [
        vehicle.ownerEmail,
        vehicle.make,
        vehicle.model,
        vehicle.color,
        vehicle.category,
        `LKR ${vehicle.pricePerDay}`,
        vehicle.status
        ]),
        startY: margin + 62,  // Adjust Y position of the table
        theme: 'grid',
        headStyles: { fillColor: [22, 160, 133] },  // Custom header color
        margin: { left: 10, right: 10 },
    });

    // Signature
    signatureImg.src = signature.default;
    signatureImg.onload = () => {
      doc.addImage(signatureImg, 'JPG', 25, 245, 50, 20); // Position the signature image 

      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text('Vehicle Manager: Buwaneka Wijesinghe', 15,275, null, null);

      // Save the PDF
      doc.save('Vehicle_Manage_Report.pdf');
    };

    signatureImg.onerror = () => {
      console.error('Failed to load the signature image.');
      // You can proceed without the signature or handle the error as needed
      doc.save('Vehicle_Manage_Report.pdf');
    }
  
  }
  logoImg.onerror = () => {
    console.error('Failed to load the logo image.');
    // You can proceed without the logo or handle the error as needed
    doc.text('Travel Mate', 105, 50, null, null, 'center');
    doc.save('Vehicle_Manage_Report.pdf');
  }
};
