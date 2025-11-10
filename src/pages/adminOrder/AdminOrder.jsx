import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaEye, FaTruck } from "react-icons/fa";
import "./adminOrder.css";

const AdminOrder = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/orders", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log("Поръчки:", data);
        setOrders(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Грешка:", err);
        setOrders([]);
      });
  }, []);

  const handleStatusUpdate = async (orderId, status) => {
    try {
      const res = await fetch(`http://localhost:5000/api/orders/update/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        const updated = await res.json();
        setOrders((prev) => prev.map((o) => (o._id === updated._id ? updated : o)));
      }
    } catch (err) {
      console.error("Грешка при статус:", err);
    }
  };

  const handleDelete = async (orderId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/orders/delete/${orderId}`, {
        method: "PATCH",
        credentials: "include",
      });
      if (res.ok) {
        setOrders((prev) => prev.map((o) => (o._id === orderId ? { ...o, status: "Deleted" } : o)));
      }
    } catch (err) {
      console.error("Грешка при изтриване:", err);
    }
  };

  const activeOrders = orders.filter((o) => o.status !== "Deleted");

  return (
    <div className="admin-ord-page">
      <header className="admin-ord-header">
        <h1 className="admin-ord-title">Поръчки за обработка</h1>
       
      </header>

      {activeOrders.length === 0 ? (
        <div className="admin-ord-empty">
          <FaTruck className="admin-ord-empty-icon" />
          <p className="admin-ord-empty-text">Няма активни поръчки в момента.</p>
        </div>
      ) : (
        <div className="admin-ord-grid">
          {activeOrders.map((order) => (
            <div key={order._id} className="admin-ord-card">
              <div className="admin-ord-card-header">
                <span className="admin-ord-id">№ {order._id.slice(-6)}</span>
                <span className={`admin-ord-status admin-ord-status-${order.status.toLowerCase()}`}>
                  {order.status}
                </span>
              </div>

              <div className="admin-ord-card-body">
                <p className="admin-ord-customer">
                  <strong>{order.firstName} {order.lastName}</strong>
                </p>
                <p className="admin-ord-phone">{order.phone}</p>
                <p className="admin-ord-date">
                  {new Date(order.createdAt).toLocaleDateString("bg-BG")} в{" "}
                  {new Date(order.createdAt).toLocaleTimeString("bg-BG", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                {order.updatedAt && order.createdAt !== order.updatedAt && (
                  <p className="admin-ord-updated">
                    Променена: {new Date(order.updatedAt).toLocaleString("bg-BG")}
                  </p>
                )}
              </div>

              <div className="admin-ord-card-footer">
                <button
                  className="admin-ord-btn admin-ord-btn-shipped"
                  onClick={() => handleStatusUpdate(order._id, "Shipped")}
                  disabled={order.status === "Shipped" || order.status === "Completed"}
                >
                  <FaTruck /> Изпратена
                </button>
                <button
                  className="admin-ord-btn admin-ord-btn-view"
                  onClick={() => navigate(`/order/${order._id}`)}
                >
                  <FaEye /> Преглед
                </button>
                <button
                  className="admin-ord-btn admin-ord-btn-delete"
                  onClick={() => handleDelete(order._id)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrder;