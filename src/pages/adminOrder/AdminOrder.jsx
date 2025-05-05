import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./adminOrder.css";
import { FaTrash } from "react-icons/fa";

const AdminOrder = () => {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:5000/api/orders")
          .then((res) => res.json())
          .then((data) => setOrders(data))
          .catch((error) => console.error("Грешка при зареждане на поръчките:", error));
      }, []);

    const handleStatusUpdate = async (orderId, newStatus) => {
        try {
            const response = await fetch(`http://localhost:5000/api/orders/update/${orderId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
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

    const handleDeleteOrder = async (orderId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/orders/delete/${orderId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" }
            });

            if (response.ok) {
                setOrders((prevOrders) =>
                    prevOrders.map(order =>
                        order._id === orderId ? { ...order, status: "Deleted" } : order
                    )
                );
            } else {
                console.error("Неуспешно изтриване на поръчка");
            }
        } catch (error) {
            console.error("Грешка при заявката:", error);
        }
    }

    return (
        <div className="admin-orders-container">
            <h2 className="admin-orders-title">Поръчки за изпращане</h2>
            {orders
                .filter(order => order.status !== "Deleted") 
                .map((order) => (
                    <li key={order._id} className="order-item">
                        <p className="order-id"><strong>Поръчка №:</strong> {order._id}</p>
                        <p className="customer-name"><strong>Клиент:</strong> {order.firstName} {order.lastName}</p>
                        <p className="customer-phone"><strong>Телефон:</strong> {order.phone}</p>
                        <p className="order-status"><strong>Статус:</strong> {order.status}</p>

                        <div className="order-buttons">
                            <button className="status-button" onClick={() => handleStatusUpdate(order._id, "Shipped")}>
                                Промени на Изпратена
                            </button>
                            <button className="view-button" onClick={() => navigate(`/order/${order._id}`)}>
                                Преглед на поръчката
                            </button>
                            <button className="delete-button2" onClick={() => handleDeleteOrder(order._id)}>
                                <FaTrash />
                            </button>
                        </div>
                    </li>
                ))
            }
        </div>
    );
};

export default AdminOrder;