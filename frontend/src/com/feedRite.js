import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Spinner } from 'react-bootstrap';
import './supporth.css'; // Updated CSS file

const FeedRite = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const initialFormData = location.state?.feedbackData || {};
    const [formData, setFormData] = useState(initialFormData);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [hover, setHover] = useState({
        save: false,
        update: false,
        delete: false,
        pdf: false
    });

    const handleMouseEnter = (button) => {
        setHover(prev => ({ ...prev, [button]: true }));
    };

    const handleMouseLeave = (button) => {
        setHover(prev => ({ ...prev, [button]: false }));
    };

    useEffect(() => {
        const fetchFeedbacks = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:8081/FeedBack/all');
            } catch (error) {
                console.error('Error fetching feedbacks:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFeedbacks();
    }, []);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            setIsEditing(false);
            await axios.put(`http://localhost:8081/FeedBack/update/${formData._id}`, {
                name: formData.name,
                email: formData.email,
                contact: formData.contact,
                feedbackCategory: formData.feedbackCategory,
                comment: formData.comment
            });
            console.log('Feedback updated successfully');
        } catch (error) {
            console.error('Error updating feedback:', error.response ? error.response.data : error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!formData.email) {
            console.error('Feedback ID is missing!');
            return;
        }

        setLoading(true);
        try {
            await axios.delete(`http://localhost:8081/FeedBack/delete/${formData.email}`);
            console.log('Feedback deleted successfully');
            alert('Feedback deleted successfully');
            setShowDeleteModal(false);
            navigate('/feedbackForm');
        } catch (error) {
            console.error('Error deleting feedback:', error.response ? error.response.data : error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const loadImageAsBase64 = (url) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = 'Anonymous';
            img.src = url;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                resolve(canvas.toDataURL('image/jpeg'));
            };
            img.onerror = (error) => {
                console.error(`Error loading image from ${url}:`, error);
                reject(error);
            };
        });
    };

    const handleDownloadPDF = async () => {
        const doc = new jsPDF();
        const logoUrl = '/img/logo.jpeg';
        const signatureUrl = '/img/sig.jpeg';
        
        // Get the current date and time
        const currentDateTime = new Date().toLocaleString();

        try {
            const [logoBase64, signatureBase64] = await Promise.all([
                loadImageAsBase64(logoUrl),
                loadImageAsBase64(signatureUrl)
            ]);

            // Add logo to PDF
            doc.addImage(logoBase64, 'JPEG', 120, 10, 70, 30);
            doc.setDrawColor(0, 0, 0);
            doc.setLineWidth(2);
            doc.rect(10, 10, 190, 250);

            // Add feedback information
            doc.setFontSize(16);
            doc.text('Feedback Summary', 20, 50);

            doc.setFontSize(12);
            doc.text(`Name: ${formData.name || "N/A"}`, 20, 70);
            doc.text(`Email: ${formData.email || "N/A"}`, 20, 80);
            doc.text(`Contact: ${formData.contact || "N/A"}`, 20, 90);
            doc.text(`Category: ${formData.feedbackCategory || "N/A"}`, 20, 100);
            doc.text(`Feedback: ${formData.comment || "N/A"}`, 20, 110);

            // Add signature
            doc.addImage(signatureBase64, 'JPEG', 20, 180, 50, 15);
            doc.text('Signature \n Customer Affairs Admin', 20, 200);

            // Add date and time inside the frame at the bottom-right corner
            doc.setFontSize(10);
            doc.text(currentDateTime, 180, 250, { align: 'right' });

            // Save the PDF
            doc.save('feedback-summary.pdf');
        } catch (error) {
            console.error('Error loading images:', error);
        }
    };

    return (
        <div className="feedrite-container">
            <div className="feedrite-card">
                <h1 className="feedrite-title">Feedback Summary</h1>
                {loading && <Spinner animation="border" variant="primary" />}

                <form>
                    <div className="feedrite-form-group">
                        <label className="feedrite-label">Name:</label>
                        {isEditing ? (
                            <input type="text" name="name" className="feedrite-input" value={formData.name} onChange={handleChange} required />
                        ) : (
                            <p className="feedrite-text">{formData.name || "N/A"}</p>
                        )}
                    </div>

                    <div className="feedrite-form-group">
                        <label className="feedrite-label">Email:</label>
                        {isEditing ? (
                            <input type="email" name="email" className="feedrite-input" value={formData.email} onChange={handleChange} required />
                        ) : (
                            <p className="feedrite-text">{formData.email || "N/A"}</p>
                        )}
                    </div>

                    <div className="feedrite-form-group">
                        <label className="feedrite-label">Contact:</label>
                        {isEditing ? (
                            <input type="text" name="contact" className="feedrite-input" value={formData.contact} onChange={handleChange} required />
                        ) : (
                            <p className="feedrite-text">{formData.contact || "N/A"}</p>
                        )}
                    </div>

                    <div className="feedrite-form-group">
                        <label className="feedrite-label">Category:</label>
                        {isEditing ? (
                            <select name="feedbackCategory" className="feedrite-select" value={formData.feedbackCategory} onChange={handleChange} required>
                                <option value="hotel service">Hotel Service</option>
                                <option value="transport service">Transport Service</option>
                                <option value="tour guide service">Tour Guide Service</option>
                                <option value="other">Other</option>
                            </select>
                        ) : (
                            <p className="feedrite-text">{formData.feedbackCategory || "N/A"}</p>
                        )}
                    </div>

                    <div className="feedrite-form-group">
                        <label className="feedrite-label">Feedback:</label>
                        {isEditing ? (
                            <textarea name="comment" className="feedrite-textarea" value={formData.comment} onChange={handleChange} rows="4" required />
                        ) : (
                            <p className="feedrite-text">{formData.comment || "N/A"}</p>
                        )}
                    </div>

                    <div className="feedrite-actions">
                        {isEditing ? (
                            <button
                                type="button"
                                className="feedrite-btn feedrite-btn-save"
                                onMouseEnter={() => handleMouseEnter('save')}
                                onMouseLeave={() => handleMouseLeave('save')}
                                onClick={handleSave}
                            >
                                Save
                            </button>
                        ) : (
                            <button
                                type="button"
                                className="feedrite-btn feedrite-btn-update"
                                onMouseEnter={() => handleMouseEnter('update')}
                                onMouseLeave={() => handleMouseLeave('update')}
                                onClick={handleEdit}
                            >
                                Update
                            </button>
                        )}
                        <button
                            type="button"
                            className="feedrite-btn feedrite-btn-delete"
                            onMouseEnter={() => handleMouseEnter('delete')}
                            onMouseLeave={() => handleMouseLeave('delete')}
                            onClick={() => setShowDeleteModal(true)}
                        >
                            Delete
                        </button>
                    </div>

                    <button
                        type="button"
                        className="feedrite-btn feedrite-btn-pdf"
                        onMouseEnter={() => handleMouseEnter('pdf')}
                        onMouseLeave={() => handleMouseLeave('pdf')}
                        onClick={handleDownloadPDF}
                    >
                        Download PDF
                    </button>
                </form>

                <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm Delete</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to delete this feedback?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
                        <Button variant="danger" onClick={handleDelete}>Delete</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
};

export default FeedRite;
