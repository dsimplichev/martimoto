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

     const [message, setMessage] = useState(null); 
    const [isLoading, setIsLoading] = useState(false);

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.,])[A-Za-z\d@$!%*?&.,]{8,}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formData.username) {
            setMessage({ text: 'Моля, въведете потребителско име.', type: 'error' });
            return;
        }

        if (!emailRegex.test(formData.email)) {
            setMessage({ text: 'Моля, въведете валиден имейл адрес.', type: 'error' });
            return;
        }

        if (!passwordRegex.test(formData.password)) {
            setMessage({ text: 'Паролата трябва да е поне 8 символа и да съдържа главна буква, малка буква, цифра и специален символ.', type: 'error' });
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setMessage({ text: 'Паролите не съвпадат.', type: 'error' });
            return;
        }

        setIsLoading(true);
        setMessage(null);

        try {
            const response = await axios.post('http://localhost:5000/auth/register', {
                username: formData.username,
                email: formData.email,
                password: formData.password,
            });


             setMessage({ text: response.data.message || 'Успешно регистриран!', type: 'success' });


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
                setMessage({ text: error.response.data.message, type: 'error' });
            } else {
                setMessage({ text: 'Грешка при регистрацията. Опитайте отново.', type: 'error' });
            }
        } finally {
            setIsLoading(false); 
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

                    <input
                        type="submit"
                        className="btn__register"
                        value={isLoading ? "Регистрация..." : "Регистрация"}
                        disabled={isLoading}
                    />
                </form>

                {message && <p className={`message ${message.type}`}>{message.text}</p>}

                <div className="have__account">

                    

                    <div className="account-login-row">
                        <small>Вече имате акаунт?</small>
                        <button onClick={() => {
                            
                            onLoginClick();
                        }}>
                           Влез сега
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;