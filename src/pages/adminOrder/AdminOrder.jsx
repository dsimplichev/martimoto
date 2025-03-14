import { useEffect, useState } from 'react';
import './adminOrder.css';

const AdminOrder = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/orders/pending', { credentials: 'include' })
            .then(res => res.json())
            .then(data => setOrders(data))
            .catch(error => console.error("Грешка при зареждане на поръчките:", error));
    }, []);

    return (
        <div className="admin-orders-container">
            <h2 className="admin-orders-title">Поръчки за изпращане</h2>
            {orders.length === 0 ? (
                <p className="no-orders-message">Няма чакащи поръчки.</p>
            ) : (
                <ul className="orders-list">
                    {orders.map(order => (
                        <li key={order._id} className="order-item">
                            <p className="order-id">Поръчка № {order._id}</p>
                            <p className="customer-name">Клиент: {order.customerName}</p>
                            <p className="order-status">Статус: {order.status}</p>
                            {/* Тук можеш да добавиш бутон за промяна на статуса */}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AdminOrder;