import { useEffect, useState } from 'react';
import axios from 'axios';
import './orderHistory.css';

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/orders/history', { withCredentials: true })
      .then(res => {
        setOrders(res.data.orders);
        setLoading(false);
      })
      .catch(err => {
        console.error("Грешка при зареждане на историята:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Зареждане...</p>;

  return (
    <div className="order-history">
      <h2>История на поръчките</h2>
   
      {orders.length === 0 ? (
        <p>Нямате направени поръчки.</p>
      ) : (
        orders.map((order, index) => (
          <div key={index} className="order-block">
            <p><strong>Дата на поръчка:</strong> {new Date(order.createdAt).toLocaleString()}</p>
            <div className="order-items">
              {order.items.map((item, i) => (
                <div key={i} className="order-item">
                  <img src={item.image} alt={item.name} />
                  <div>
                    <p><strong>Име:</strong> {item.name}</p>
                    {item.description && <p><strong>Описание:</strong> {item.description}</p>}
                    <p><strong>Цена:</strong> {item.price.toFixed(2)} лв.</p>
                    <p><strong>Количество:</strong> {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default OrderHistory;