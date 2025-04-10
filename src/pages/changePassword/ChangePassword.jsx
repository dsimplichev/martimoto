import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './changepassword.css';

const ChangePassword = () => {
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== repeatPassword) {
            alert("Паролите не съвпадат!");
            return;
        }

        try {
            const token = localStorage.getItem("token"); 
            const response = await fetch("http://localhost:5000/api/users/change-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ newPassword: password }),
            });

            const data = await response.json();

            if (response.ok) {
                alert("Паролата беше успешно променена.");
                navigate('/profile');
            } else {
                alert(data.message || "Грешка при промяна на паролата.");
            }
        } catch (error) {
            console.error("Грешка при заявка:", error);
            alert("Сървърна грешка. Опитай по-късно.");
        }
    };

    const handleBack = () => {
        navigate('/profile');
    };

    return (
        <div className="change-password-wrapper">
            <div className="profile-header-section">
                <h1 className="profile-title">Промени паролата</h1>
            </div>
            <div className="divider-profile"></div>

            <form onSubmit={handleSubmit} className="password-form">
                <div className="field-row">
                    <label><span className="required">*</span>Парола</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="field-row">
                    <label><span className="required">*</span>Потвърди паролата</label>
                    <input
                        type="password"
                        value={repeatPassword}
                        onChange={(e) => setRepeatPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="buttons-row">
                    <button type="button" className="back-button" onClick={handleBack}>Назад</button>
                    <button type="submit" className="save-password-button">Запази</button>
                </div>
            </form>
        </div>
    );
};

export default ChangePassword;