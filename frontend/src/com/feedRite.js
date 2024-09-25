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
                // You might want to set the feedbacks to state here if needed
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

    const handleDownloadPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text('Feedback Summary', 20, 20);
        doc.setFontSize(12);
        doc.text(`Name: ${formData.name || "N/A"}`, 20, 40);
        doc.text(`Email: ${formData.email || "N/A"}`, 20, 50);
        doc.text(`Contact: ${formData.contact || "N/A"}`, 20, 60);
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
            
                <h1 className="text-center mb-4" style={{
           
            backgroundPosition: 'center',
            display: 'flex',
            color : 'white' ,
            position : 'relative',
            left:'40%',
            bottom:'20%', 
        }}>Feedback Summary</h1>
                {loading && <Spinner animation="border" variant="primary" />}

                <form >
                    <div className="mb-3" >
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
       
    );
};

export default FeedRite;
