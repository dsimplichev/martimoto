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

    const handleStatusUpdate = async (orderId, newStatus) => {
        try {
            const response = await fetch(`http://localhost:5000/api/orders/update/${orderId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }),
            });
            if (response.ok) {
                const updatedOrder = await response.json();
                setOrders((prevOrders) =>
                    prevOrders.map((order) =>
                        order._id === updatedOrder._id ? updatedOrder : order
                    )
                );
            } else {
                console.error("Грешка при актуализиране на поръчката.");
            }
        } catch (error) {
            console.error("Грешка при изпращане на заявката за промяна на статуса:", error);
        }
    };

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
                            <p className="customer-name">Клиент: {order.firstName} {order.lastName}</p>
                            <p className="order-status">Статус: {order.status}</p>
                            {/* Бутон за промяна на статуса */}
                            {order.status === "Pending" && (
                                <button onClick={() => handleStatusUpdate(order._id, "Shipped")}>
                                    Промени на Изпратена
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AdminOrder;