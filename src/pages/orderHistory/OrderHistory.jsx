import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext"; 
import "./orderHistory.css"; 


const OrderHistory = () => {
  const { user } = useContext(AuthContext); 
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  const fetchOrders = async () => {
    try {
      const res = await fetch(`http://localhost:5000/orders/user/${user._id}`, {
        credentials: "include",
      });
      const data = await res.json();
      setOrders(data);
      setLoading(false);
    } catch (err) {
      console.error("Грешка при зареждане на поръчките:", err);
    }
  };

  if (user?._id) {
    fetchOrders();
  }
}, [user]);

  if (loading) return <p>Зареждане на поръчките...</p>;

  return (
    <div className="order-history">
      <h2>История на поръчките</h2>
      {orders.length === 0 ? (
        <p>Все още нямате направени поръчки.</p>
      ) : (
        <ul className="order-list">
          {orders.map((order) => (
            <li key={order._id} className="order-card">
              <p><strong>Дата:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
              <p><strong>Статус:</strong> {order.status}</p>
              <p><strong>Общо:</strong> {order.totalAmount.toFixed(2)} лв</p>
              <p><strong>Продукти:</strong></p>
              <ul>
                {order.cart.map((item, i) => (
                  <li key={i}>ID: {item.productId} – Брой: {item.quantity}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderHistory;