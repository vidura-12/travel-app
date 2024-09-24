import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

export default function FeedbackForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        contact: '',
        category: 'hotel service',
        feedback: ''
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();  // Initialize useNavigate

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validate = () => {
        const newErrors = {};
        if (!/^[A-Za-z\s]+$/.test(formData.name)) {
            newErrors.name = 'Name must contain only letters';
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is not valid';
        }
        if (!/^\d{10}$/.test(formData.contact)) {
            newErrors.contact = 'Contact number must be exactly 10 digits';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            console.log('Feedback Submitted:', formData);
            // Navigate to feedRite page with form data
            navigate('/feedRite', { state: formData });
        } else {
            console.log('Validation failed');
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
                <h1 className="text-center mb-4">Feedback Form</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        {errors.name && <div className="text-danger">{errors.name}</div>}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        {errors.email && <div className="text-danger">{errors.email}</div>}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Contact Number</label>
                        <input
                            type="tel"
                            className="form-control"
                            name="contact"
                            value={formData.contact}
                            onChange={handleChange}
                            required
                        />
                        {errors.contact && <div className="text-danger">{errors.contact}</div>}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Feedback Category</label>
                        <select
                            className="form-select"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                        >
                            <option value="Hotel service">Hotel Service</option>
                            <option value="Transport service">Transport Service</option>
                            <option value="Tour guide service">Tour guide Service</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Feedback</label>
                        <textarea
                            className="form-control"
                            name="feedback"
                            value={formData.feedback}
                            onChange={handleChange}
                            rows="4"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Submit Feedback</button>
                </form>
            </div>
        </div>
    );
}
