import React from 'react';
import { useNavigate } from 'react-router-dom';
import './userprofile.css';

const UserProfile = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    
    localStorage.removeItem("user"); 
    navigate('/');
    window.location.reload(); 
  };

  return (
    <div className="user-profile-container">
      <div className="profile-header-section">
        <h1 className='profile-title'>Моят профил</h1>
      </div>
      <div className="divider-profile"></div>

      <div className="profile-links">
        <button onClick={() => navigate('/profile/edit')}>Редакция на профила</button>
        <button onClick={() => navigate('/profile/password')}>Парола</button>
        <button onClick={() => navigate('/favorites')}>Желани продукти</button>
        <button onClick={() => navigate('/order-history')}>История на поръчките</button>
        <button onClick={handleLogout} className="logout-button">Изход</button>
      </div>
    </div>
  );
};

export default UserProfile;