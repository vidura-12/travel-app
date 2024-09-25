import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'bootstrap/dist/css/bootstrap.min.css';

const FeedRite = () => {
    const location = useLocation();
    const initialFormData = location.state?.feedbackData || {};  // Get the feedback data passed via navigation
    const [formData, setFormData] = useState(initialFormData);
    const [isEditing, setIsEditing] = useState(false);
    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const response = await axios.get('http://localhost:8081/FeedBack/all'); // Ensure this endpoint is correct
                setFeedbacks(response.data);
            } catch (error) {
                console.error('Error fetching feedbacks:', error);
            }
        };

        fetchFeedbacks();
    }, []);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        try {
             
            setIsEditing(false);

            const response = await axios.put(`http://localhost:8081/FeedBack/update/${formData._id}`, {
                name: formData.name,
                email: formData.email,
                contact: formData.contact,  // Include contact field
                feedbackCategory: formData.feedbackCategory,
                comment: formData.comment
            });

            console.log('Update response:', response.data);
            const updatedFeedbacks = await axios.get('http://localhost:8081/FeedBack/all');
            setFeedbacks(updatedFeedbacks.data);

            console.log('Feedback updated successfully');
        } catch (error) {
            console.error('Error updating feedback:', error.response ? error.response.data : error.message);
        }
    };

    const handleDelete = async () => {
        if (!formData._id) {
            console.error('Feedback ID is missing!');
            return;
        }

        try {
            await axios.delete(`http://localhost:8081/FeedBack/delete/${formData._id}`);
            console.log('Feedback deleted successfully');

            const updatedFeedbacks = await axios.get('http://localhost:8081/FeedBack/all');
            setFeedbacks(updatedFeedbacks.data);
        } catch (error) {
            console.error('Error deleting feedback:', error.response ? error.response.data : error.message);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDownloadPDF = () => {
        const doc = new jsPDF();

        doc.setFontSize(16);
        doc.text('Feedback Summary', 20, 20);
        doc.setFontSize(12);
        doc.text(`Name: ${formData.name || "N/A"}`, 20, 40);
        doc.text(`Email: ${formData.email || "N/A"}`, 20, 50);
        doc.text(`Contact: ${formData.contact || "N/A"}`, 20, 60);  // Include contact in PDF
        doc.text(`Category: ${formData.feedbackCategory || "N/A"}`, 20, 70);
        doc.text(`Feedback: ${formData.comment || "N/A"}`, 20, 80);

        doc.save('feedback-summary.pdf');
    };

    return (
        <div style={{
            minHeight: '100vh',
            backgroundImage: 'url("/img/sl25.jpg")',
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
                            <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
                        ) : (
                            <p>{formData.name || "N/A"}</p>
                        )}
                    </div>

                    <div className="mb-3">
                        <label className="form-label"><strong>Email:</strong></label>
                        {isEditing ? (
                            <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
                        ) : (
                            <p>{formData.email || "N/A"}</p>
                        )}
                    </div>

                    <div className="mb-3">
                        <label className="form-label"><strong>Contact:</strong></label>
                        {isEditing ? (
                            <input type="text" name="contact" className="form-control" value={formData.contact} onChange={handleChange} required />
                        ) : (
                            <p>{formData.contact || "N/A"}</p>
                        )}
                    </div>

                    <div className="mb-3">
                        <label className="form-label"><strong>Category:</strong></label>
                        {isEditing ? (
                            <select name="feedbackCategory" className="form-control" value={formData.feedbackCategory} onChange={handleChange} required>
                                <option value="hotel service">Hotel Service</option>
                                <option value="transport service">Transport Service</option>
                                <option value="tour guide service">Tour guide Service</option>
                                <option value="other">Other</option>
                            </select>
                        ) : (
                            <p>{formData.feedbackCategory || "N/A"}</p>
                        )}
                    </div>

                    <div className="mb-3">
                        <label className="form-label"><strong>Feedback:</strong></label>
                        {isEditing ? (
                            <textarea name="comment" className="form-control" value={formData.comment} onChange={handleChange} rows="4" required />
                        ) : (
                            <p>{formData.comment || "N/A"}</p>
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
                            onClick={handleDelete}
                        >
                            Delete
                        </button>
                    </div>

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
