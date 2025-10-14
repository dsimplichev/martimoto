import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./orderDetails.css";

const OrderDetails = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [productsData, setProductsData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/orders/${orderId}`, { credentials: "include" });
                const data = await res.json();
                setOrder(data);

                if (data.cart && data.cart.length > 0) {
                    await fetchProductsDetails(data.cart);
                }

                setLoading(false);
            } catch (err) {
                console.error("Грешка при зареждане на поръчката:", err);
                setLoading(false);
            }
        };

        fetchOrder();
    }, [orderId]);

    const fetchProductsDetails = async (cartItems) => {
        const details = {};

        for (const item of cartItems) {
            try {
                let url = "";

                switch (item.itemType) {
                    case "accessory":
                        url = `http://localhost:5000/accessories/detail/${item.productId}`;
                        break;
                    case "part":
                        url = `http://localhost:5000/api/parts/${item.productId}`;
                        break;
                    case "tire":
                        url = `http://localhost:5000/api/car-tires/${item.productId}`;
                        break;
                    case "oil":
                        url = `http://localhost:5000/api/oils/${item.productId}`;
                        break;
                    case "wiperFluid":
                        url = `http://localhost:5000/api/wiper-fluids/${item.productId}`;
                        break;
                    default:
                        url = "";
                }

                if (url) {
                    const res = await fetch(url);
                    if (!res.ok) throw new Error(`Продукт ${item.productId} не е намерен`);
                    const productData = await res.json();
                    details[item.productId] = productData;
                }
            } catch (err) {
                console.error(`Не може да се зареди продукт ${item.productId}:`, err);
            }
        }

        setProductsData(details);
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
            <p><strong>Адрес за доставка:</strong> {order.deliveryAddress || "Не е посочен адрес"}</p>

            {order.companyName && (
                <div className="company-details">
                    <h3>Данни за фирма</h3>
                    <p><strong>Име на фирмата:</strong> {order.companyName}</p>
                    <p><strong>Регистрационен номер:</strong> {order.companyReg}</p>
                    <p><strong>ЕИК:</strong> {order.companyEIK}</p>
                    <p><strong>Адрес на фирмата:</strong> {order.companyAddress}</p>
                </div>
            )}

            <h3>Продукти в поръчката</h3>
            <ul className="cart-items">
                {order.cart.map((item) => {
                    const product = productsData[item.productId];
                    return (
                        <li key={item._id} className="cart-item">
                            {product ? (
                                <>
                                    {product.images && product.images.length > 0 && (
                                        <img src={product.images[0]} alt={product.title} className="product-image" />
                                    )}
                                    <p><strong>{product.title}</strong></p>
                                    <p><strong>Цена за брой:</strong> {product.price} лв.</p>
                                </>
                            ) : (
                                <p><strong>Продукт ID:</strong> {item.productId}</p>
                            )}
                            <p><strong>Количество:</strong> {item.quantity}</p>
                            <p><strong>Сума:</strong> {product ? (product.price * item.quantity) : 0} лв.</p>
                        </li>
                    );
                })}
            </ul>

            <p><strong>Обща сума:</strong> {order.totalAmount} лв.</p>
            <p><strong>Статус:</strong> {order.status}</p>
            <p><strong>Коментар:</strong> {order.comment || "Няма коментар"}</p>
        </div>
    );
};

export default OrderDetails;