import './login.css';
import React, { useState, useContext } from 'react';
import { ImGoogle2 } from "react-icons/im";
import { FaFacebook } from "react-icons/fa6";
import { AuthContext } from '../../Context/AuthContext';

function Login({ onClose, onCreateAccountClick }) {
    const { login } = useContext(AuthContext);
    
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState(null);

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            setError("Моля, попълнете всички полета.");
            return;
        }

        try {
            await login(formData.email, formData.password);
            onClose();
        } catch (err) {
            setError("Внимание: Въведените име и/или парола не си съответстват или са грешни.");
        }
    };

    const handleOverlayClick = (e) => {
        if (e.target.classList.contains('modal__login')) {
            onClose();
        }
    };

    return (
        <div className="modal__login" onClick={handleOverlayClick}>
            <div className="login__container">
                <div className="login__form">
                    <h2 className="login__title">Вход</h2>
                    <div className="social-login">
                        <ul className="social__wrap">
                            <li className="google">
                                <a href="#"><ImGoogle2 className="google__icon" />Вход с Google</a>
                            </li>
                            <li className="fb">
                                <a href="#"><FaFacebook className="facebook__icon" />Вход с Facebook</a>
                            </li>
                        </ul>
                    </div>
                    <div className="or">или</div>
                    {error && <p className="error-message">{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="email">Имейл</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={onChange}
                            autoComplete="email"
                        />
                        <label htmlFor="password">Парола</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={formData.password}
                            onChange={onChange}
                            autoComplete="current-password"
                        />
                        <button className="btn__login" type="submit">Вход</button>
                    </form>

                    <div className="register-prompt">
                        Нямате акаунт?{' '}
                        <span className="create-account" onClick={onCreateAccountClick}>
                            Регистрация
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;