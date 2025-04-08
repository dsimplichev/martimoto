import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './changepassword.css';

const ChangePassword = () => {
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== repeatPassword) {
      alert("Паролите не съвпадат!");
      return;
    }

    console.log("Нова парола:", password);
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
        <label>Парола</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label>Промени паролата</label>
        <input
          type="password"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
          required
        />

        <div className="buttons-row">
          <button type="button" className="back-button" onClick={handleBack}>Назад</button>
          <button type="submit" className="save-password-button">Запази</button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;