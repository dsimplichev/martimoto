import React, { useState } from 'react';
import './contactForm.css';

function ContactForm({onClose}) {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        query: '',
        message: ''
    });

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        console.log("Message sent:", formData);
        setFormData({ fullName: '', email: '', query: '', message: '' });
    };

    const handleOverlayClick = (e) => {
        if (e.target.classList.contains('contact-form-overlay')) {
            onClose();
        }
    };

    return (
   
        <div className="contact-form-overlay" onClick={handleOverlayClick}>
            <div className="contact-form-container">
                <h3 className="contact-form-title">Get in Touch</h3>
                <hr className="title-underline" />
                <form onSubmit={onSubmit}>
                    <label htmlFor="fullName">Full Name</label>
                    <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={onChange}
                        required
                    />

                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={onChange}
                        required
                    />

                    <label htmlFor="query">Short description</label>
                    <input
                        type="text"
                        id="query"
                        name="query"
                        value={formData.query}
                        onChange={onChange}
                        required
                    />

                    <label htmlFor="message">Message</label>
                    <textarea
                        id="message"
                        name="message"
                        rows="5"
                        value={formData.message}
                        onChange={onChange}
                        required
                    ></textarea>

                    <button type="submit" className="send-button">Send</button>
                </form>
            </div>
        </div>
    
    );
}

export default ContactForm;