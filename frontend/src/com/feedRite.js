import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Spinner } from 'react-bootstrap';

const FeedRite = () => {
    const location = useLocation();
    const initialFormData = location.state?.feedbackData || {};
    const [formData, setFormData] = useState(initialFormData);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        const fetchFeedbacks = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:8081/FeedBack/all');
                // Handle response if needed
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
        if (!formData._id) {
            console.error('Feedback ID is missing!');
            return;
        }

        setLoading(true);
        try {
            await axios.delete(`http://localhost:8081/FeedBack/delete/${formData._id}`);
            console.log('Feedback deleted successfully');
            setShowDeleteModal(false);
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

    // Function to convert image to base64
    const loadImageAsBase64 = (url) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = 'Anonymous'; // Handle cross-origin issues
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

        // Paths to the logo and signature images
        const logoUrl = '/img/logo.jpeg';  // Ensure this path is correct
        const signatureUrl = '/img/sig.jpeg';  // Ensure this path is correct

        try {
            // Load both logo and signature images
            const [logoBase64, signatureBase64] = await Promise.all([
                loadImageAsBase64(logoUrl),
                loadImageAsBase64(signatureUrl)
            ]);

            // Add logo to the PDF
            doc.addImage(logoBase64, 'JPEG', 150, 10, 40, 15); // Adjust position (x, y), width, and height

            // Add the title and feedback content after the logo
            doc.setFontSize(16);
            doc.text('Feedback Summary', 20, 40);  // Adjust positioning for title

            doc.setFontSize(12);
            doc.text(`Name: ${formData.name || "N/A"}`, 20, 60);
            doc.text(`Email: ${formData.email || "N/A"}`, 20, 70);
            doc.text(`Contact: ${formData.contact || "N/A"}`, 20, 80);
            doc.text(`Category: ${formData.feedbackCategory || "N/A"}`, 20, 90);
            doc.text(`Feedback: ${formData.comment || "N/A"}`, 20, 100);

            // Add the signature image
            doc.addImage(signatureBase64, 'JPEG', 20, 180, 50, 15); // Adjust position (x, y), width, and height
            doc.text('Admin Signature', 20, 200);  // Add text label under the signature if desired

            // Save the PDF
            doc.save('feedback-summary.pdf');
        } catch (error) {
            console.error('Error loading images:', error);
        }
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
            <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.8)', // Optional: to give some contrast
                padding: '20px',
                borderRadius: '8px',
                width: '100%',
                maxWidth: '600px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
            }}>
                <h1 className="text-center mb-4" style={{
                    color: 'black', // Change color if needed
                    position: 'relative',
                    top: '-20px', // Adjust this value to move it higher
                }}>
                    Feedback Summary
                </h1>
                {loading && <Spinner animation="border" variant="primary" />}

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
                                <option value="tour guide service">Tour Guide Service</option>
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
                            onClick={() => setShowDeleteModal(true)}
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

                {/* Delete Confirmation Modal */}
                <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm Deletion</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure you want to delete this feedback?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={handleDelete}>
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
};

export default FeedRite;
