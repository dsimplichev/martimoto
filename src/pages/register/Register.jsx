import React, { useState } from 'react';
import axios from 'axios';
import { Eye, EyeOff, Check } from 'lucide-react';
import './register.css';

function Register({ onClose, onLoginClick }) {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    
    const [passwordCriteria, setPasswordCriteria] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        digit: false,
        special: false,
    });

    const onChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === 'password') {
            setPasswordCriteria({
                length: value.length >= 8,
                uppercase: /[A-Z]/.test(value),
                lowercase: /[a-z]/.test(value),
                digit: /\d/.test(value),
                special: /[@$!%*?&.,]/.test(value),
            });
        }
    };

    
    const isPasswordValid = Object.values(passwordCriteria).every(Boolean);
    const doPasswordsMatch = formData.password && formData.password === formData.confirmPassword;

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!isPasswordValid) {
            setMessage({ text: 'Паролата не отговаря на изискванията.', type: 'error' });
            return;
        }
        if (!doPasswordsMatch) {
            setMessage({ text: 'Паролите не съвпадат.', type: 'error' });
            return;
        }

        setIsLoading(true);
        try {
            await axios.post('http://localhost:5000/auth/register', {
                username: formData.username,
                email: formData.email,
                password: formData.password,
            });
            setMessage({ text: 'Успешно регистриран!', type: 'success' });
            setTimeout(() => onClose(), 1800);
        } catch (error) {
            setMessage({ text: error.response?.data?.message || 'Грешка при регистрация.', type: 'error' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleOverlayClick = (e) => {
        if (e.target.classList.contains('modal-overlay')) onClose();
    };

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="form-container">
                <h2 className="regtitle">Регистрация</h2>

                <form onSubmit={onSubmit}>
                    <label>Потребителско име</label>
                    <input type="text" name="username" value={formData.username} onChange={onChange} required />

                    <label>Е-поща</label>
                    <input type="email" name="email" value={formData.email} onChange={onChange} required />

                   
                    <label>Парола</label>
                    <div className="password-wrapper">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={onChange}
                            required
                        />
                        <button type="button" className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                        {isPasswordValid && formData.password && (
                            <Check className="password-check" size={20} />
                        )}
                    </div>

                    
                    <label>Потвърди паролата</label>
                    <div className="password-wrapper">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={onChange}
                            required
                        />
                        <button type="button" className="toggle-password" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                        {doPasswordsMatch && isPasswordValid && (
                            <Check className="password-check match" size={20} />
                        )}
                    </div>

                    
                    <div className="password-requirements">
                        <p className="req-title">Паролата трябва да съдържа:</p>
                        <ul>
                            <li className={passwordCriteria.length ? 'valid' : ''}>Минимум 8 символа</li>
                            <li className={passwordCriteria.uppercase ? 'valid' : ''}>Голяма буква (A-Z)</li>
                            <li className={passwordCriteria.lowercase ? 'valid' : ''}>Малка буква (a-z)</li>
                            <li className={passwordCriteria.digit ? 'valid' : ''}>Цифра (0-9)</li>
                            <li className={passwordCriteria.special ? 'valid' : ''}>Специален знак (!@#$...)</li>
                        </ul>
                    </div>

                    <button type="submit" className="btn__register" disabled={isLoading}>
                        {isLoading ? "Регистрация..." : "Регистрация"}
                    </button>
                </form>

                {message && <p className={`message ${message.type}`}>{message.text}</p>}

                <div className="have__account">
                    <div className="account-login-row">
                        <small>Вече имате акаунт?</small>
                        <button onClick={onLoginClick}>Влез сега</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;