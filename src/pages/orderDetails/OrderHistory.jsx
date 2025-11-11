import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import axios from 'axios';
import './orderHistory.css';

function OrderHistory() {
  const { isLoggedIn } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn) {
      setLoading(false);
      return;
    }

    axios
      .get('http://localhost:5000/api/orders/history', { withCredentials: true })
      .then(res => {
        if (res.data.success && Array.isArray(res.data.orders)) {
          setOrders(res.data.orders);
        } else {
          console.warn("Няма поръчки или невалиден формат:", res.data);
          setOrders([]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Грешка при зареждане на поръчки:", err);
        setOrders([]);
        setLoading(false);
      });
  }, [isLoggedIn]);

  const handleRemoveOrder = (orderId) => {
    setOrders(prev => prev.filter(o => o._id !== orderId));
  };

  const getShippedTime = (history) => {
    if (!Array.isArray(history)) return null;
    const shipped = history.find(h => h.status === 'Shipped');
    if (!shipped) return null;
    const date = new Date(shipped.timestamp);
    return `${date.toLocaleDateString('bg-BG')} в ${date.toLocaleTimeString('bg-BG', { hour: '2-digit', minute: '2-digit' })}`;
  };

  if (!isLoggedIn) {
    return <p className="auth-msg">Моля, <a href="/login">влезте</a> за да видите поръчките си.</p>;
  }

  if (loading) {
    return <p className="loading">Зареждане на поръчките...</p>;
  }

  return (
    <div className="order-history">
      <h2>Моите поръчки</h2>

      {orders.length === 0 ? (
        <p className="no-orders">
          Още нямате поръчки. <a href="/">Пазарувайте сега!</a>
        </p>
      ) : (
        <div className="orders-list">
          {orders.map(order => {
            const shippedTime = getShippedTime(order.statusHistory);

            return (
              <div key={order._id} className="order-card">
                <button className="remove-btn" onClick={() => handleRemoveOrder(order._id)}>
                  X
                </button>

                <div className="order-header">
                  <p><strong>Поръчка №:</strong> {order._id.slice(-8)}</p>
                  <p><strong>Дата:</strong> {new Date(order.createdAt).toLocaleDateString('bg-BG')}</p>
                  <p><strong>Час:</strong> {new Date(order.createdAt).toLocaleTimeString('bg-BG')}</p>
                  <p><strong>Статус:</strong> <span className={`status ${order.status.toLowerCase()}`}>{order.status}</span></p>
                  <p><strong>Общо:</strong> {order.totalAmount.toFixed(2)} лв.</p>
                </div>

                {shippedTime && (
                  <div className="shipped-info">
                    <strong>Изпратена на:</strong> {shippedTime}
                  </div>
                )}

                <div className="order-items">
                  {Array.isArray(order.cart) && order.cart.length > 0 ? (
                    order.cart.map((item, i) => (
                      <div key={i} className="order-item">
                        <img
                          src={item.image || 'https://placehold.co/80x80?text=Без+снимка'}
                          alt={item.title || "Продукт"}
                          onError={(e) => e.target.src = 'https://placehold.co/80x80?text=Без+снимка'}
                        />
                        <div className="item-info">
                          <p className="title">{item.title || "Неизвестен продукт"}</p>
                          <p><strong>Кол:</strong> {item.quantity || 1} бр.</p>
                          <p><strong>Цена:</strong> {item.total || (item.price * item.quantity).toFixed(2)} лв.</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="no-items">Няма продукти в поръчката.</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default OrderHistory;