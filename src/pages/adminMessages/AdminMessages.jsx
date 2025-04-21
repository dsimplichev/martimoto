import React, { useEffect, useState } from 'react';
import './adminMessages.css';

function AdminMessages() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/messages')
            .then(res => res.json())
            .then(data => setMessages(data))
            .catch(err => console.error('Error fetching messages:', err));
    }, []);

    const handleHide = (id) => {
        setMessages(prev => prev.filter(msg => msg._id !== id));
    };

    return (
        <div className="admin-messages-container">
            <h2>Получени съобщения</h2>
            <ul className="message-list">
                {messages.map((msg) => (
                    <li key={msg._id} className="message-card">
                        <p><strong>Име:</strong> {msg.fullName}</p>
                        <p><strong>Имейл:</strong> {msg.email}</p>
                        <p><strong>Телефон:</strong> {msg.phone}</p>
                        <p><strong>Тема:</strong> {msg.query}</p>
                        <p><strong>Съобщение:</strong> {msg.message}</p>
                        <p className="date">{new Date(msg.createdAt).toLocaleString()}</p>
                        <button className="delete-button" onClick={() => handleHide(msg._id)}>Премахни</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AdminMessages;