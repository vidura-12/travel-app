import jsPDF from 'jspdf';
import 'jspdf-autotable';
import logoImage from './imgs/logo.png';
import signatureImage from './imgs/signature.jpg';

/**
 * Generates a comprehensive hotel management report as a PDF.
 * @param {Array} hotels - Array of hotel objects to include in the report.
 */
export const generateHotelReport = async (hotels) => {
  // Initialize jsPDF
  const doc = new jsPDF();
  
  // Define page dimensions and margins
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  let currentY = margin;

  // Function to add header to the first page
  const addHeader = async () => {
    // Load and add logo
    const logo = new Image();
    logo.src = logoImage;
    await new Promise((resolve) => {
      logo.onload = resolve;
      logo.onerror = () => {
        console.error('Failed to load logo image.');
        resolve();
      };
    });

    const logoWidth = 30;
    const logoHeight = (logo.height / logo.width) * logoWidth;
    doc.addImage(logo, 'PNG', pageWidth - logoWidth - margin, margin, logoWidth, logoHeight);

    // Add title and date
    doc.setFontSize(18);
    doc.text('Hotel Management Report', margin, margin + 10);
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, margin, margin + 18);

    return margin + 25; // Return the Y position after the header
  };

  // Function to check remaining space and add new page if needed
  const checkPageBreak = (requiredSpace) => {
    if (currentY + requiredSpace > pageHeight - margin) {
      doc.addPage();
      currentY = margin; // Reset currentY for new page
      return true;
    }
    return false;
  };

  // Add initial header (only on the first page)
  currentY = await addHeader();

  // Hotel Summary Section
  const hotelSummary = [
    ['Total Hotels', hotels.length.toString()],
    ['Approved Hotels', hotels.filter(h => h.status === 'approved').length.toString()],
    ['Pending Hotels', hotels.filter(h => h.status === 'pending').length.toString()],
    ['Rejected Hotels', hotels.filter(h => h.status === 'rejected').length.toString()]
  ];

  doc.autoTable({
    startY: currentY,
    head: [['Summary', 'Count']],
    body: hotelSummary,
    theme: 'grid',
    headStyles: { fillColor: [41, 128, 185], textColor: 255 },
    styles: { fontSize: 10 },
    margin: { left: margin, right: margin }
  });
  
  currentY = doc.lastAutoTable.finalY + 10;

  // Detailed Hotel List
  checkPageBreak(40);
  
  const hotelDetails = hotels.map(hotel => [
    hotel.name,
    hotel.location,
    hotel.status.charAt(0).toUpperCase() + hotel.status.slice(1),
    hotel.rooms.reduce((acc, room) => acc + room.availableRooms, 0).toString(),
    hotel.owner?.email || 'N/A',
    new Date(hotel.createdAt).toLocaleDateString()
  ]);

  doc.autoTable({
    startY: currentY,
    head: [['Hotel Name', 'Location', 'Status', 'Available Rooms', 'Owner Email', 'Created Date']],
    body: hotelDetails,
    theme: 'grid',
    headStyles: { fillColor: [41, 128, 185], textColor: 255 },
    styles: { fontSize: 8 },
    margin: { left: margin, right: margin }
  });
  
  currentY = doc.lastAutoTable.finalY + 10;

  // Detailed Room Information for Each Hotel
  for (const hotel of hotels) {
    checkPageBreak(60);

    doc.setFontSize(12);
    doc.text(`Details for ${hotel.name}`, margin, currentY);
    currentY += 7;

    // Hotel description
    if (hotel.description) {
      doc.setFontSize(10);
      const descriptionLines = doc.splitTextToSize(hotel.description, pageWidth - (2 * margin));
      
      if (checkPageBreak(descriptionLines.length * 5 + 20)) {
        currentY += 7; // Additional spacing after page break
      }
      
      doc.text(descriptionLines, margin, currentY);
      currentY += descriptionLines.length * 5 + 10;
    }

    // Room details table
    if (hotel.rooms && hotel.rooms.length > 0) {
      const roomDetails = hotel.rooms.map(room => [
        room.roomType,
        room.availableRooms.toString(),
        `LKR ${room.price.toFixed(2)}`
      ]);

      checkPageBreak(40);

      doc.autoTable({
        startY: currentY,
        head: [['Room Type', 'Available Rooms', 'Price']],
        body: roomDetails,
        theme: 'grid',
        headStyles: { fillColor: [52, 152, 219], textColor: 255 },
        styles: { fontSize: 8 },
        margin: { left: margin, right: margin }
      });
      
      currentY = doc.lastAutoTable.finalY + 10;
    }
  }

  // Add signature on the last page
  const signature = new Image();
  signature.src = signatureImage;
  await new Promise((resolve) => {
    signature.onload = resolve;
    signature.onerror = () => {
      console.error('Failed to load signature image.');
      resolve();
    };
  });

  const signatureWidth = 40;
  const signatureHeight = (signature.height / signature.width) * signatureWidth;
  
  // Check if current position exceeds page height
  if (currentY + signatureHeight + 20 > pageHeight - margin) {
    doc.addPage();
    currentY = margin; // Reset currentY for the new page
  }

  doc.addImage(signature, 'PNG', margin, currentY, signatureWidth, signatureHeight);
  doc.setFontSize(10);
  doc.text('Hotel Manager: Vidusha Pathirana', margin, currentY + signatureHeight + 5);

  // Save the PDF
  doc.save('Hotel_Management_Report.pdf');
};
