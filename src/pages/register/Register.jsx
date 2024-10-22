import React, { useState } from 'react';
import './register.css';


function Register({ onClose }) {
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

    const onSubmit = (e) => {
        e.preventDefault();
        
        if (formData.password !== formData.confirmPassword) {
            setMessage('Паролите не съвпадат.');
            return;
        }

        setMessage('Успешно регистриран!');

        setFormData({
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
        });
    };
    
    
    return (
        <div class="form-container">
            <h2>Регистрирай се</h2>
            <form onSubmit={onSubmit}>
                <label for="username">Потребителско име</label>
                <input type="text" id="username" name="username" onChange={onChange} required />

                <label for="email">Email</label>
                <input type="email" id="email" name="email" onChange={onChange} required />

                <label for="password">Парола</label>
                <input type="password" id="password" name="password" onChange={onChange} required />

                <label for="confirmPassword">Повтори паролата</label>
                <input type="password" id="confirmPassword" name="confirmPassword" onChange={onChange} required />

                <input type="submit" class="btn__register" value="Регистрирай се" />
            </form>

            <div class="have__account">
                <small>Имаш акаунт?</small>
                <button onClick={onClose} >Натисни тук</button>
            </div>
        </div>


    )
}

export default Register;