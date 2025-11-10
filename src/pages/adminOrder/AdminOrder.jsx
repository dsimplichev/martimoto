import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./adminOrder.css";
import { FaTrash } from "react-icons/fa";

const AdminOrder = () => {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:5000/api/orders", {
            method: "GET",
            credentials: "include",
        })
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                return res.json();
            })
            .then((data) => {
                console.log("Поръчки от сървъра:", data); 
                setOrders(Array.isArray(data) ? data : []);
            })
            .catch((error) => {
                console.error("Грешка при зареждане:", error);
                setOrders([]);
            });
    }, []);

    const handleStatusUpdate = async (orderId, newStatus) => {
        try {
            const response = await fetch(`http://localhost:5000/api/orders/update/${orderId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ status: newStatus }),
            });

            if (response.ok) {
                const updatedOrder = await response.json();
                setOrders((prev) =>
                    prev.map((o) => (o._id === updatedOrder._id ? updatedOrder : o))
                );
            }
        } catch (error) {
            console.error("Грешка при статус:", error);
        }
    };

    const handleDeleteOrder = async (orderId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/orders/delete/${orderId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            });

            if (response.ok) {
                setOrders((prev) =>
                    prev.map((o) => (o._id === orderId ? { ...o, status: "Deleted" } : o))
                );
            }
        } catch (error) {
            console.error("Грешка при изтриване:", error);
        }
    };

    const filteredOrders = orders.filter((o) => o.status !== "Deleted");

    return (
        <div className="admin-orders-container">
            <h2 className="admin-orders-title">Поръчки за изпращане</h2>

            {filteredOrders.length === 0 ? (
                <p className="no-orders">Няма поръчки за изпращане.</p>
            ) : (
                <ul className="admin-orders-list">
                    {filteredOrders.map((order) => (
                        <li key={order._id} className="order-item2">
                            <p className="order-id">
                                <strong>Поръчка №:</strong> {order._id}
                            </p>
                            <p className="customer-name">
                                <strong>Клиент:</strong> {order.firstName} {order.lastName}
                            </p>
                            <p className="customer-phone">
                                <strong>Телефон:</strong> {order.phone}
                            </p>
                            <p className="order-status">
                                <strong>Статус:</strong>
                                <span data-status={order.status}>{order.status}</span>
                            </p>
                            <p className="order-date">
                                <strong>Създадена:</strong>
                                <span>{new Date(order.createdAt).toLocaleString("bg-BG")}</span>
                            </p>
                            {order.updatedAt && order.createdAt !== order.updatedAt && (
                                <p className="order-updated">
                                    <strong>Променена:</strong>
                                    <span>{new Date(order.updatedAt).toLocaleString("bg-BG")}</span>
                                </p>
                            )}

                            <div className="order-buttons">
                                <button
                                    className="status-button"
                                    onClick={() => handleStatusUpdate(order._id, "Shipped")}
                                >
                                    Изпратена
                                </button>
                                <button
                                    className="view-button"
                                    onClick={() => navigate(`/order/${order._id}`)}
                                >
                                    Преглед
                                </button>
                                <button
                                    className="delete-button2"
                                    onClick={() => handleDeleteOrder(order._id)}
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AdminOrder;