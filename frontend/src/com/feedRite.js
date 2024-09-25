import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';  // Import useLocation to access passed data
import axios from 'axios';  // Make sure you import axios
import jsPDF from 'jspdf';  // Import jsPDF for generating PDF
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap

const FeedRite = () => {
    const location = useLocation();
    const initialFormData = location.state;  // Get the form data passed via navigation

    const [formData, setFormData] = useState(initialFormData);
    const [isEditing, setIsEditing] = useState(false);
    const [feedbacks, setFeedbacks] = useState([]); // Initialize feedbacks array

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        // Save updated data logic here
        setIsEditing(false);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8081/FeedBack/delete/${id}`);
            setFeedbacks(feedbacks.filter(feedback => feedback._id !== id));

            // Optionally log or display a success message
            console.log('Feedback deleted successfully');
        } catch (error) {
            console.error('Error deleting feedback:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Function to generate PDF
    const handleDownloadPDF = () => {
        const doc = new jsPDF();

        doc.setFontSize(16);
        doc.text('Feedback Summary', 20, 20);  // Title for PDF

        doc.setFontSize(12);
        doc.text(`Name: ${formData.name}`, 20, 40);
        doc.text(`Email: ${formData.email}`, 20, 50);
        doc.text(`Contact: ${formData.contact}`, 20, 60);
        doc.text(`Category: ${formData.category}`, 20, 70);
        doc.text(`Feedback: ${formData.feedback}`, 20, 80);

        doc.save('feedback-summary.pdf');  // Save PDF with this name
    };

    return (
        <div style={{
            minHeight: '100vh',
            backgroundImage: 'url("/img/sl25.jpg")',  // Background image URL
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '50px'
        }}>
            <div className="card shadow-lg" style={{
                maxWidth: '600px',
                width: '100%',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '10px',
                padding: '20px',
            }}>
                <h1 className="text-center mb-4">Feedback Summary</h1>
                <form>
                    <div className="mb-3">
                        <label className="form-label"><strong>Name:</strong></label>
                        {isEditing ? (
                            <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} />
                        ) : (
                            <p>{formData.name}</p>
                        )}
                    </div>

                    <div className="mb-3">
                        <label className="form-label"><strong>Email:</strong></label>
                        {isEditing ? (
                            <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} />
                        ) : (
                            <p>{formData.email}</p>
                        )}
                    </div>

                    <div className="mb-3">
                        <label className="form-label"><strong>Contact Number:</strong></label>
                        {isEditing ? (
                            <input type="text" name="contact" className="form-control" value={formData.contact} onChange={handleChange} />
                        ) : (
                            <p>{formData.contact}</p>
                        )}
                    </div>

                    <div className="mb-3">
                        <label className="form-label"><strong>Category:</strong></label>
                        {isEditing ? (
                            <input type="text" name="category" className="form-control" value={formData.category} onChange={handleChange} />
                        ) : (
                            <p>{formData.category}</p>
                        )}
                    </div>

                    <div className="mb-3">
                        <label className="form-label"><strong>Feedback:</strong></label>
                        {isEditing ? (
                            <textarea name="feedback" className="form-control" value={formData.feedback} onChange={handleChange} rows="4" />
                        ) : (
                            <p>{formData.feedback}</p>
                        )}
                    </div>

                    <div className="d-flex justify-content-between mb-3">
                        {isEditing ? (
                            <button type="button" className="btn btn-success" onClick={handleSave}>Save</button>
                        ) : (
                            <button type="button" className="btn btn-primary" onClick={handleEdit}>Update</button>
                        )}
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => handleDelete(formData._id)}  // Use formData._id for delete
                        >
                            Delete
                        </button>
                    </div>

                    {/* Download PDF Button */}
                    <button 
                        type="button" 
                        className="btn btn-secondary w-100" 
                        onClick={handleDownloadPDF}
                    >
                        Download PDF
                    </button>
                </form>
            </div>
        </div>
    );
};

export default FeedRite;
