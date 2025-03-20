import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./orderDetails.css";

const OrderDetails = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [accessories, setAccessories] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:5000/api/orders/${orderId}`, { credentials: "include" })
            .then((res) => res.json())
            .then((data) => {
                setOrder(data);
                setLoading(false);

                
                if (data.cart) {
                    fetchAccessoryDetails(data.cart);
                }
            })
            .catch((error) => {
                console.error("Грешка при зареждане на поръчката:", error);
                setLoading(false);
            });
    }, [orderId]);

    
    const fetchAccessoryDetails = async (cartItems) => {
        const accessoryDetails = {};
    
        for (const item of cartItems) {
            try {
                const response = await fetch(`http://localhost:5000/accessories/detail/${item.productId}`);
                const accessory = await response.json();
                accessoryDetails[item.productId] = accessory;
            } catch (error) {
                console.error(`Грешка при зареждане на аксесоар ${item.productId}:`, error);
            }
        }
    
        setAccessories(accessoryDetails);
    };

    if (loading) return <p>Зареждане на поръчката...</p>;
    if (!order) return <p>Грешка при зареждане на поръчката или поръчката не съществува!</p>;

    return (
        <div className="order-details-container">
            <h2 className="order-details-title">Детайли за поръчка № {order._id}</h2>
            <p><strong>Клиент:</strong> {order.firstName} {order.lastName}</p>
            <p><strong>Email:</strong> {order.email}</p>
            <p><strong>Телефон:</strong> {order.phone}</p>
            <p><strong>Доставка:</strong> {order.deliveryMethod || "Не е посочено"}</p>
            <p><strong>Град:</strong> {order.city || "Не е посочено"}</p>
            <p><strong>Офис:</strong> {order.office || "Не е посочено"}</p>

            <h3>Продукти в поръчката</h3>
            <ul className="cart-items">
                {order.cart && order.cart.length > 0 ? (
                    order.cart.map((item, index) => {
                        const accessory = accessories[item.productId];
                        return (
                            <li key={index} className="cart-item">
                                {accessory ? (
                                    <>
                                        <img src={accessory.images[0]} alt={accessory.title} className="product-image" />
                                        <p><strong>{accessory.title}</strong></p>
                                    </>
                                ) : (
                                    <p><strong>Продукт ID:</strong> {item.productId} (Информацията не е налична)</p>
                                )}
                                <p><strong>Количество:</strong> {item.quantity}</p>
                            </li>
                        );
                    })
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