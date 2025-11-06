import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./orderDetails.css";

const OrderDetails = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [productsData, setProductsData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
                    credentials: "include"
                });
                if (!res.ok) throw new Error("Поръчката не е намерена");
                const data = await res.json();
                setOrder(data);

                if (data.cart && data.cart.length > 0) {
                    await fetchProductsDetails(data.cart);
                } else {
                    setProductsData({});
                }

                setLoading(false);
            } catch (err) {
                console.error("Грешка при зареждане на поръчката:", err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchOrder();
    }, [orderId]);

    const fetchProductsDetails = async (cartItems) => {
        const details = {};
        const fetchPromises = cartItems.map(async (item) => {
            const productId = item.productId;

            const endpoints = [
                { type: "accessory",   url: `http://localhost:5000/accessories/detail/${productId}` },
                { type: "part",        url: `http://localhost:5000/api/parts/${productId}` },
                { type: "tire",        url: `http://localhost:5000/api/car-tires/${productId}` },
                { type: "oil",         url: `http://localhost:5000/api/oils/${productId}` },
                { type: "wiperFluid",  url: `http://localhost:5000/api/wiper-fluids/${productId}` },
                { type: "mat",         url: `http://localhost:5000/api/mats/${productId}` }, // Нов ендпойнт
            ];

            for (const endpoint of endpoints) {
                try {
                    const res = await fetch(endpoint.url);
                    if (res.ok) {
                        const productData = await res.json();
                        details[productId] = {
                            title: productData.title || productData.name || "Неизвестен продукт",
                            price: productData.price || 0,
                            images: productData.images || (productData.image ? [productData.image] : []),
                        };
                        return;
                    }
                } catch (err) {
                    
                }
            }

            console.warn(`Продукт с ID ${productId} не е намерен в нито един ендпойнт`);
            details[productId] = null;
        });

        await Promise.all(fetchPromises);
        setProductsData(details);
    };

    if (loading) return <p className="loading-message">Зареждане на поръчката...</p>;
    if (error || !order) return <p className="loading-message error">Грешка: {error || "Поръчката не съществува!"}</p>;

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
            {order.cart.length === 0 ? (
                <p>Няма продукти в поръчката.</p>
            ) : (
                <ul className="cart-items">
                    {order.cart.map((item) => {
                        const product = productsData[item.productId];
                        const subtotal = product ? product.price * item.quantity : 0;

                        return (
                            <li key={item._id} className="cart-item">
                                {product ? (
                                    <>
                                        {product.images && product.images.length > 0 ? (
                                            <img
                                                src={product.images[0]}
                                                alt={product.title}
                                                className="product-image"
                                                onError={(e) => {
                                                    e.target.style.display = "none";
                                                }}
                                            />
                                        ) : (
                                            <div className="product-image placeholder">Без снимка</div>
                                        )}
                                        <div className="product-info">
                                            <p className="product-title"><strong>{product.title}</strong></p>
                                            <p><strong>Цена:</strong> {product.price.toFixed(2)} лв.</p>
                                            <p><strong>Количество:</strong> {item.quantity}</p>
                                            <p><strong>Сума:</strong> {subtotal.toFixed(2)} лв.</p>
                                        </div>
                                    </>
                                ) : (
                                    <p className="missing-product">
                                        <strong>Липсващ продукт (ID: {item.productId})</strong>
                                        <br />
                                        <small>Може да е изтрит или недостъпен.</small>
                                    </p>
                                )}
                            </li>
                        );
                    })}
                </ul>
            )}

            <div className="order-summary">
                <p className="total-amount"><strong>Обща сума:</strong> {order.totalAmount.toFixed(2)} лв.</p>
                <p><strong>Статус:</strong> <span className={`status ${order.status.toLowerCase()}`}>{order.status}</span></p>
                <p><strong>Коментар:</strong> {order.comment || "Няма коментар"}</p>
            </div>
        </div>
    );
};

export default OrderDetails;