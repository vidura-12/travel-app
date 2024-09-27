import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import jsPDF from 'jspdf';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Spinner } from 'react-bootstrap';

const FeedRite = () => {
    const location = useLocation();
    const navigate = useNavigate(); // Initialize navigate
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
        if (!formData.email) {
            console.error('Feedback ID is missing!');
            return;
        }

        setLoading(true);
        try {
            await axios.delete(`http://localhost:8081/FeedBack/delete/${formData.email}`);
            console.log('Feedback deleted successfully');
            alert('Feedback deleted successfully'); // Show alert
            setShowDeleteModal(false);
            navigate('/feedbackForm'); // Navigate to /feedbackForm after deletion
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

        try {
            const [logoBase64, signatureBase64] = await Promise.all([
                loadImageAsBase64(logoUrl),
                loadImageAsBase64(signatureUrl)
            ]);

            // Add logo to the PDF, enlarged
            doc.addImage(logoBase64, 'JPEG', 120, 10, 70, 30); // Increased size

            // Add a frame
            doc.setDrawColor(0, 0, 0); // Set color for frame (black)
            doc.setLineWidth(2); // Set line width for frame
            doc.rect(10, 10, 190, 250); // Draw the frame (x, y, width, height)

            doc.setFontSize(16);
            doc.text('Feedback Summary', 20, 50);

            doc.setFontSize(12);
            doc.text(`Name: ${formData.name || "N/A"}`, 20, 70);
            doc.text(`Email: ${formData.email || "N/A"}`, 20, 80);
            doc.text(`Contact: ${formData.contact || "N/A"}`, 20, 90);
            doc.text(`Category: ${formData.feedbackCategory || "N/A"}`, 20, 100);
            doc.text(`Feedback: ${formData.comment || "N/A"}`, 20, 110);

            // Add signature to the PDF
            doc.addImage(signatureBase64, 'JPEG', 20, 180, 50, 15);
            doc.text(' Signature \n Customer Affairs Admin', 20, 200);
            doc.save('feedback-summary.pdf');
        } catch (error) {
            console.error('Error loading images:', error);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            backgroundImage: 'url("/img/sl69.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '60px'
        }}>
            <div style={{
                padding: '20px',
                width: '100%',
                maxWidth: '1000px',
                color: 'black',
                backgroundColor: 'rgba(0, 0, 0, 0.2)', // Background with transparency
                borderRadius: '8px', // Rounded corners
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.9)', // Shadow effect
            }}>
                <h1 className="text-center mb-4" style={{ color: 'white' }}>
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
                            <button
                                type="button"
                                className="btn btn-success"
                                style={{
                                    width: '48%',
                                    padding: '10px',
                                    fontSize: '16px',
                                    backgroundColor: hover.save ? '#28a745cc' : '#28a745', // Hover effect
                                    color: hover.save ? 'white' : 'white',
                                    transition: 'background-color 0.3s ease',
                                }}
                                onMouseEnter={() => handleMouseEnter('save')}
                                onMouseLeave={() => handleMouseLeave('save')}
                                onClick={handleSave}
                            >
                                Save
                            </button>
                        ) : (
                            <button
                                type="button"
                                className="btn btn-primary"
                                style={{
                                    width: '48%',
                                    padding: '10px',
                                    fontSize: '16px',
                                    backgroundColor: hover.update ? '#007bffcc' : '#007bff', // Hover effect
                                    color: hover.update ? 'white' : 'white',
                                    transition: 'background-color 0.3s ease',
                                }}
                                onMouseEnter={() => handleMouseEnter('update')}
                                onMouseLeave={() => handleMouseLeave('update')}
                                onClick={handleEdit}
                            >
                                Update
                            </button>
                        )}
                        <button
                            type="button"
                            className="btn btn-danger"
                            style={{
                                width: '48%',
                                padding: '10px',
                                fontSize: '16px',
                                backgroundColor: hover.delete ? '#dc3545cc' : '#dc3545', // Hover effect
                                color: hover.delete ? 'white' : 'white',
                                transition: 'background-color 0.3s ease',
                            }}
                            onMouseEnter={() => handleMouseEnter('delete')}
                            onMouseLeave={() => handleMouseLeave('delete')}
                            onClick={() => setShowDeleteModal(true)}
                        >
                            Delete
                        </button>
                    </div>

                    <button
                        type="button"
                        className="btn btn-secondary w-100"
                        style={{
                            backgroundColor: hover.pdf ? '#6c757dcc' : '#6c757d', // Hover effect
                            color: hover.pdf ? 'white' : 'white',
                            transition: 'background-color 0.3s ease',
                        }}
                        onMouseEnter={() => handleMouseEnter('pdf')}
                        onMouseLeave={() => handleMouseLeave('pdf')}
                        onClick={handleDownloadPDF}
                    >
                        Download PDF
                    </button>
                </form>

                <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm Deletion</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure you want to delete this feedback? This action cannot be undone.
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
