import React, { useState } from 'react';
import './contactForm.css';

function ContactForm() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        querySummary: '',
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
        // Here you can handle form submission logic
        alert('Message sent!');
    };

    return (
        <div className="form-overlay">
            <div className="form-container">
                <h2 className='get-touch'>Get in Touch</h2>
                <hr className="title-line" />
                <form onSubmit={handleSubmit}>
                    <label htmlFor="fullName">Full Name</label>
                    <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="querySummary">Short description</label>
                    <input
                        type="text"
                        id="querySummary"
                        name="querySummary"
                        value={formData.querySummary}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="message">Message</label>
                    <textarea
                        id="message"
                        name="message"
                        rows="4"
                        value={formData.message}
                        onChange={handleChange}
                        required
                    ></textarea>

                    <button type="submit" className="btn-send">Send</button>
                </form>
            </div>
        </div>
    );
}

export default ContactForm;