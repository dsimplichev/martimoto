import React, { useState } from 'react';
import axios from 'axios';
import './register.css';

function Register({ onClose, onLoginClick }) {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [message, setMessage] = useState('');

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setMessage('Паролите не съвпадат.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/auth/register', {
                username: formData.username,
                email: formData.email,
                password: formData.password,
            });


            setMessage(response.data.message || 'Успешно регистриран!');


            setFormData({
                username: '',
                email: '',
                password: '',
                confirmPassword: '',
            });


            setTimeout(() => {
                onClose();
            }, 1500);

        } catch (error) {
            if (error.response && error.response.data.message) {
                setMessage(error.response.data.message);
            } else {
                setMessage('Грешка при регистрацията. Опитайте отново.');
            }
        }
    };

    const handleOverlayClick = (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            onClose();
        }
    };

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="form-container">
                <h2>Регистрация</h2>
                <form onSubmit={onSubmit}>
                    <label htmlFor="username">Потребителско име</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
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

                    <label htmlFor="password">Парола</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={onChange}
                        required
                    />

                    <label htmlFor="confirmPassword">Потвърди паролата</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={onChange}
                        required
                    />

                    <input type="submit" className="btn__register" value="Signup" />
                </form>

                {message && <p className="message">{message}</p>}

                <div className="have__account">

                    

                    <div className="account-login-row">
                        <small>Вече имате акаунт?</small>
                        <button onClick={() => {
                            
                            onLoginClick();
                        }}>
                            Login now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;