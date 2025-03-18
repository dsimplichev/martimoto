import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./orderDetails.css";

const OrderDetails = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        console.log("Изпращане на заявка за поръчка:", orderId);
        
        fetch(`http://localhost:5000/api/orders/${orderId}`, { credentials: "include" })
            .then((res) => {
                console.log("Статус на отговора:", res.status);
                return res.json();
            })
            .then((data) => {
                console.log("Получени данни:", data);
                setOrder(data);
                setLoading(false); 
            })
            .catch((error) => {
                console.error("Грешка при зареждане на поръчката:", error);
                setLoading(false); 
            });
    }, [orderId]);

    
    if (loading) return <p>Зареждане на поръчката...</p>;
    if (!order) return <p>Грешка при зареждане на поръчката или поръчката не съществува!</p>;

    return (
        <div className="order-details-container">

            {order._id && <h2 className="order-details-title">Детайли за поръчка № {order._id}</h2>}
            <p><strong>Клиент:</strong> {order.firstName} {order.lastName}</p>
            <p><strong>Email:</strong> {order.email}</p>
            <p><strong>Телефон:</strong> {order.phone}</p>
            <p><strong>Доставка:</strong> {order.deliveryMethod || "Не е посочено"}</p>
            <p><strong>Град:</strong> {order.city || "Не е посочено"}</p>
            <p><strong>Офис:</strong> {order.office || "Не е посочено"}</p>

            {order.companyName && (
                <>
                    <h3>Фирмени данни</h3>
                    <p><strong>Име на фирма:</strong> {order.companyName}</p>
                    <p><strong>Регистрация:</strong> {order.companyReg}</p>
                    <p><strong>ЕИК:</strong> {order.companyEIK}</p>
                    <p><strong>Адрес:</strong> {order.companyAddress}</p>
                </>
            )}

            <h3>Продукти в поръчката</h3>
            <ul className="cart-items">
                {order.cart && order.cart.length > 0 ? (
                    order.cart.map((item, index) => (
                        <li key={index}>
                            <p><strong>Продукт ID:</strong> {item.productId}</p>
                            <p><strong>Количество:</strong> {item.quantity}</p>
                        </li>
                    ))
                ) : (
                    <li>Няма продукти в поръчката.</li>
                )}
            </ul>

            <p><strong>Обща сума:</strong> {order.totalAmount} лв.</p>
            <p><strong>Статус:</strong> {order.status}</p>
            <p><strong>Коментар:</strong> {order.comment || "Няма коментар"}</p>
        </div>
    );
};

export default OrderDetails;