import React, { useState } from 'react';
import './contactForm.css';
import { FaEnvelope, FaPhoneAlt } from 'react-icons/fa'; // Добавяме икони

function ContactForm({ onClose }) {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        query: '',
        message: '',
        acceptTerms: false // Ново състояние за чекбокса
    });
    const [submissionStatus, setSubmissionStatus] = useState(null); // 'success', 'error', null
    const [errorMessage, setErrorMessage] = useState(''); // За съобщение за грешка

    const onChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setSubmissionStatus(null); // Изчистваме предишното състояние
        setErrorMessage('');

        if (!formData.acceptTerms) {
            setErrorMessage('Моля, приемете Общите условия.');
            return;
        }

        try {
            const payload = {
                fullName: formData.fullName,
                email: formData.email,
                phone: formData.phone, // Включваме phone
                query: formData.query, // Включваме query
                message: formData.message
            };

            const response = await fetch('http://localhost:5000/api/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                setSubmissionStatus('success');
                setFormData({ fullName: '', email: '', phone: '', query: '', message: '', acceptTerms: false });
                console.log('Съобщението е изпратено успешно!');
            } else {
                const errorData = await response.json();
                setSubmissionStatus('error');
                setErrorMessage(errorData.message || 'Възникна грешка при изпращане. Опитайте отново.');
                console.error('Error sending message:', errorData);
            }
        } catch (error) {
            setSubmissionStatus('error');
            setErrorMessage('Възникна мрежова грешка. Моля, проверете връзката си.');
            console.error('Network error sending message:', error);
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
                <button className="close-btn" onClick={onClose}>&times;</button>
                <div className="contact-header">
                    
                    <h2 className="contact-title-sub">СВЪРЖИ СЕ С НАС</h2>
                </div>

                <div className="contact-content">
                    <div className="contact-info-section">
                        
                        <h3 className="contact-info-title">ПИШЕТЕ НИ</h3>
                        <p className="contact-info-text">
                            Чувствайте се свободни да ни пишете. Ние винаги сме на разположение за нашите клиенти.
                        </p>
                        <div className="contact-detail">
                            <FaEnvelope className="contact-icon" />
                            <span>Пишете ни</span> {/* 🆕 Преведено на български */}
                            <a href="mailto:info@mail.com">info@mail.com</a>
                        </div>
                        <div className="contact-detail">
                            <FaPhoneAlt className="contact-icon" />
                            <span>Обадете ни се</span> {/* 🆕 Преведено на български */}
                            <a href="tel:+13334545544">+1 333 454 55 44</a>
                        </div>
                    </div>

                    <form onSubmit={onSubmit} className="contact-form-fields">
                        <input
                            type="text"
                            name="fullName"
                            placeholder="Въведете вашето име"
                            value={formData.fullName}
                            onChange={onChange}
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Въведете валиден имейл адрес"
                            value={formData.email}
                            onChange={onChange}
                            required
                        />
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Въведете вашия телефон"
                            value={formData.phone}
                            onChange={onChange}
                            required
                        />
                        <input
                            type="text"
                            name="query"
                            placeholder="Въведете кратко описание"
                            value={formData.query}
                            onChange={onChange}
                            required
                        />
                        <textarea
                            name="message"
                            rows="5"
                            placeholder="Въведете вашето съобщение"
                            value={formData.message}
                            onChange={onChange}
                            required
                        ></textarea>

                         <div className="terms-checkbox">
                            <input
                                type="checkbox"
                                id="acceptTerms"
                                name="acceptTerms"
                                checked={formData.acceptTerms}
                                onChange={onChange}
                            />
                            <label htmlFor="acceptTerms">Приемам Общите условия</label>
                        </div>

                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                        {submissionStatus === 'success' && (
                            <p className="success-message">Съобщението е изпратено успешно!</p>
                        )}

                        <button type="submit" className="submit-button">ИЗПРАТИ</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ContactForm;