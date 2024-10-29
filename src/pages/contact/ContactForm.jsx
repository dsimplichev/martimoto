

import React, { useState } from 'react';
import './contactForm.css';

function ContactForm({ onClose }) {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        summary: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Message sent!");
        setFormData({
            fullName: '',
            email: '',
            summary: '',
            message: ''
        });
        onClose();
    };

    return (
        <div className="contact-form-overlay" onClick={onClose}>
            <div className="contact-form-container" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>X</button>
                <h2>Contact Us</h2>
                <form onSubmit={handleSubmit}>
                    <label>Full Name</label>
                    <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />

                    <label>Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />

                    <label>Short Summary of Query</label>
                    <input type="text" name="summary" value={formData.summary} onChange={handleChange} required />

                    <label>Message</label>
                    <textarea name="message" value={formData.message} onChange={handleChange} required></textarea>

                    <button type="submit">Send</button>
                </form>
            </div>
        </div>
    );
}

export default ContactForm;