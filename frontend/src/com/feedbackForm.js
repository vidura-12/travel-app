import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function FeedbackForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        feedbackCategory: 'hotel service', // Default value
        comment: '', // Initialize comment
        contact: '' // Initialize contact
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();  // Initialize useNavigate

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validate = () => {
        const newErrors = {};
        // Validate name
        if (!/^[A-Za-z\s]+$/.test(formData.name)) {
            newErrors.name = 'Name must contain only letters';
        }
        // Validate email
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is not valid';
        }
        // Validate contact
        if (!formData.contact) {
            newErrors.contact = 'Contact number is required';
        }
        // Validate comment
        if (!formData.comment) {
            newErrors.comment = 'Feedback comment is required';
        }
        // Validate feedback category
        if (!formData.feedbackCategory) {
            newErrors.feedbackCategory = 'Please select a feedback category';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {  // Ensure validation is called before submission
            try {
                // Prepare payload to match Mongoose schema
                const payload = {
                    name: formData.name,
                    email: formData.email,
                    feedbackCategory: formData.feedbackCategory, // Match the key to the backend
                    comment: formData.comment, // Match the key to the backend
                    contact: formData.contact // Include contact in the payload
                };

                // Attempt to post the feedback data
                const response = await axios.post('http://localhost:8081/FeedBack/save', payload, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                console.log('Feedback submitted successfully:', response.data); // Log the response

                // Navigate to FeedRite page with the submitted data
                navigate('/feedRite', { state: { feedbackData: payload } });

                // Reset form data
                setFormData({
                    name: '',
                    email: '',
                    feedbackCategory: 'hotel service', // Reset to default
                    comment: '', // Reset to default
                    contact: '' // Reset contact
                });

            } catch (error) {
                console.error('Error submitting form:', error.response ? error.response.data : error.message); // Log any errors
            }
        } else {
            console.log('Validation failed:', errors); // Log validation errors
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            backgroundImage: 'url("/img/sl24.jpg")', // Replace with your actual image URL
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start', // Changed to flex-start for better alignment
            padding: '50px',
            marginTop: '50px' // Adjust this value to move the form down
        }}>
            <form onSubmit={handleSubmit} style={{
                maxWidth: '800px', // Width for the form
                width: '100%',
                backgroundColor: 'rgba(255, 255, 255, 0.95)', // Slightly opaque for better readability
                borderRadius: '15px', // Softer corners
                padding: '40px', // Generous padding
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)' // Enhanced shadow for depth
            }}>
                <h1 className="text-center mb-4">Feedback Form</h1>
                <div className="mb-4" style={{ width: '100%' }}>
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        style={{ borderRadius: '10px', padding: '15px', fontSize: '16px' }} // Adjusted padding and font size
                    />
                    {errors.name && <div className="text-danger">{errors.name}</div>}
                </div>
                <div className="mb-4" style={{ width: '100%' }}>
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={{ borderRadius: '10px', padding: '15px', fontSize: '16px' }} // Adjusted padding and font size
                    />
                    {errors.email && <div className="text-danger">{errors.email}</div>}
                </div>
                <div className="mb-4" style={{ width: '100%' }}>
                    <label className="form-label">Contact</label>
                    <input
                        type="text"
                        className="form-control" 
                        name="contact"
                        value={formData.contact}
                        onChange={handleChange}
                        required
                        style={{ borderRadius: '10px', padding: '15px', fontSize: '16px' }} // Adjusted padding and font size
                    />
                    {errors.contact && <div className="text-danger">{errors.contact}</div>}
                </div>
                <div className="mb-4" style={{ width: '100%' }}>
                    <label className="form-label">Feedback Category</label>
                    <select
                        className="form-select" 
                        name="feedbackCategory"
                        value={formData.feedbackCategory}
                        onChange={handleChange}
                        required
                        style={{ borderRadius: '10px', padding: '15px', fontSize: '16px' }} // Adjusted padding and font size
                    >
                        <option value="hotel service">Hotel Service</option>
                        <option value="transport service">Transport Service</option>
                        <option value="tour guide service">Tour guide Service</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div className="mb-4" style={{ width: '100%' }}>
                    <label className="form-label">Feedback</label>
                    <textarea
                        className="form-control" 
                        name="comment"
                        value={formData.comment}
                        onChange={handleChange}
                        rows="6" // Increased rows for textarea
                        required
                        style={{ borderRadius: '10px', padding: '15px', fontSize: '16px' }} // Adjusted padding and font size
                    />
                    {errors.comment && <div className="text-danger">{errors.comment}</div>}
                </div>
                <button type="submit" className="btn btn-primary btn-lg w-100">Submit Feedback</button> {/* Larger button */}
            </form>
        </div>
    );
}
