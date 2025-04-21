import React, { useState } from 'react';
import './contactForm.css';

function ContactForm({ onClose }) {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        query: '',
        message: ''
    });

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            await fetch('http://localhost:5000/api/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            alert('Съобщението е изпратено успешно!');
            setFormData({ fullName: '', email: '', query: '', message: '' });
            onClose();
        } catch (error) {
            alert('Възникна грешка. Опитайте отново.');
            console.error('Error sending message:', error);
        }
    };

    const handleOverlayClick = (e) => {
        if (e.target.classList.contains('contact-form-overlay')) {
            onClose();
        }
    };

    return (

        <div className="contact-form-overlay" onClick={handleOverlayClick}>
            <div className="contact-form-container">
                <h3 className="contact-form-title">Свържи се с нас</h3>
                <hr className="title-underline" />
                <form onSubmit={onSubmit}>
                    <label htmlFor="fullName">Име</label>
                    <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={onChange}
                        required
                    />

                    <label htmlFor="email">Е-поща</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={onChange}
                        required
                    />

                    <label htmlFor="phone">Телефон:</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={onChange}
                        required
                        placeholder=""
                    />

                    <label htmlFor="query">Кратко описание</label>
                    <input
                        type="text"
                        id="query"
                        name="query"
                        value={formData.query}
                        onChange={onChange}
                        required
                    />

                    <label htmlFor="message">Съобщение</label>
                    <textarea
                        id="message"
                        name="message"
                        rows="5"
                        value={formData.message}
                        onChange={onChange}
                        required
                    ></textarea>

                    <button type="submit" className="send-button">Изпрати</button>
                </form>
            </div>
        </div>

    );
}

export default ContactForm;