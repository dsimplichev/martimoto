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
            <h2>Signup</h2>
            <form onSubmit={onSubmit}>
                <label for="username">Username</label>
                <input type="text" id="username" name="username" onChange={onChange} required />

                <label for="email">Email</label>
                <input type="email" id="email" name="email" onChange={onChange} required />

                <label for="password">Password</label>
                <input type="password" id="password" name="password" onChange={onChange} required />

                <label for="confirmPassword">Confirm Password</label>
                <input type="password" id="confirmPassword" name="confirmPassword" onChange={onChange} required />

                <input type="submit" class="btn__register" value="Signup" />
            </form>

            <div class="have__account">
                <small>Already have an account?</small>
                <button onClick={onClose} >Login now</button>
            </div>
        </div>


    )
}

export default Register;