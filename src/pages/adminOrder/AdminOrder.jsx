import { useEffect, useState } from 'react';
import './adminOrder.css';

const AdminOrder = () => {
    const [orders, setOrders] = useState([]);
    const [expandedOrder, setExpandedOrder] = useState(null); 

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
                headers: { 'Content-Type': 'application/json' },
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
                            <p className="order-id"><strong>Поръчка №:</strong> {order._id}</p>
                            <p className="customer-name"><strong>Клиент:</strong> {order.firstName} {order.lastName}</p>
                            <p className="customer-phone"><strong>Телефон:</strong> {order.phone}</p>
                            <p className="order-status"><strong>Статус:</strong> {order.status}</p>
                            
                            <div className="button-group">
                                {order.status === "Pending" && (
                                    <button className="status-button" onClick={() => handleStatusUpdate(order._id, "Shipped")}>
                                        Промени на Изпратена
                                    </button>
                                )}
                                <button className="details-button" onClick={() => setExpandedOrder(expandedOrder === order._id ? null : order._id)}>
                                    {expandedOrder === order._id ? "Скрий детайли" : "Преглед на поръчката"}
                                </button>
                            </div>

                            {expandedOrder === order._id && (
                                <div className="order-details">
                                    <p><strong>Адрес:</strong> {order.address}</p>
                                    <p><strong>Имейл:</strong> {order.email}</p>
                                    <p><strong>Продукти:</strong></p>
                                    <ul>
                                        {order.items.map((item, index) => (
                                            <li key={index}>
                                                {item.productName} - {item.quantity} бр.
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AdminOrder;