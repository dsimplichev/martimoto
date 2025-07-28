import React from "react";
import "./notificationCard.css";

export default function NotificationCard({ type = "success", message, onClose }) {
  return (
    <div className="notification-card-wrapper">
      <div className="notification-card-backdrop" />
      <div className={`notification-card ${type}`}>
        <p>{message}</p>
        <button className="close-btn2" onClick={onClose}>Затвори</button>
      </div>
    </div>
  );
}