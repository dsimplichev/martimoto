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
          credentials: "include",
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
        console.error("Грешка при зареждане:", err);
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
      const itemType = item.itemType;

      let url = "";
      let title = "";
      let price = 0;
      let images = [];

      try {
        switch (itemType) {
          case "tire":
            url = `http://localhost:5000/api/car-tires/${productId}`;
            break;
          case "oil":
            url = `http://localhost:5000/api/oils/${productId}`;
            break;
          case "wiperFluid":
            url = `http://localhost:5000/api/wiper-fluid/${productId}`;
            break;
          case "mat":
            url = `http://localhost:5000/api/mats/${productId}`;
            break;
          case "part":
            url = `http://localhost:5000/api/parts/${productId}`;
            break;
          case "accessory":
            url = `http://localhost:5000/accessories/detail/${productId}`;
            break;
          default:
            details[productId] = null;
            return;
        }

        const res = await fetch(url);
        if (!res.ok) {
          details[productId] = null;
          return;
        }

        const product = await res.json();

        switch (itemType) {
          case "tire":
            title = `${product.brand} ${product.model} ${product.width}/${product.aspectRatio} R${product.diameter} ${product.speedRating}`;
            break;
          case "oil":
            title = `${product.brand} ${product.viscosity} ${product.type} ${product.volume}`;
            break;
          case "wiperFluid":
            title = product.title || "Течност за чистачки";
            break;
          case "mat":
            title = product.title || `${product.carBrand} ${product.carModel}`;
            break;
          case "part":
          case "accessory":
            title = product.title || "Продукт";
            break;
          default:
            title = "Неизвестен продукт";
        }

        price = product.price || 0;
        images = product.images || (product.image ? [product.image] : []);

        details[productId] = { title, price, images };
      } catch (err) {
        console.warn(`Грешка при продукт ${productId}:`, err);
        details[productId] = null;
      }
    });

    await Promise.all(fetchPromises);
    setProductsData(details);
  };

  if (loading) return <p className="ord-det-loading">Зареждане на поръчката...</p>;
  if (error || !order) return <p className="ord-det-error">Грешка: {error || "Поръчката не съществува!"}</p>;

  return (
    <div className="ord-det-container">
      <header className="ord-det-header">
        <h1 className="ord-det-title">Поръчка № {order._id.slice(-8)}</h1>
        <p className="ord-det-subtitle">Детайли и статус</p>
      </header>

      <section className="ord-det-info">
        <div className="ord-det-info-item">
          <strong>Клиент:</strong> {order.firstName} {order.lastName}
        </div>
        <div className="ord-det-info-item">
          <strong>Email:</strong> <a href={`mailto:${order.email}`}>{order.email}</a>
        </div>
        <div className="ord-det-info-item">
          <strong>Телефон:</strong> <a href={`tel:${order.phone}`}>{order.phone}</a>
        </div>
        <div className="ord-det-info-item">
          <strong>Доставка:</strong> {order.deliveryMethod || "—"}
        </div>
        <div className="ord-det-info-item">
          <strong>Град:</strong> {order.city || "—"}
        </div>
        {order.office && (
          <div className="ord-det-info-item">
            <strong>Офис:</strong> {order.office}
          </div>
        )}
        {order.deliveryAddress && (
          <div className="ord-det-info-item">
            <strong>Адрес:</strong> {order.deliveryAddress}
          </div>
        )}
      </section>

      {order.companyName && (
        <section className="ord-det-company">
          <h3 className="ord-det-section-title">Фактура</h3>
          <div className="ord-det-company-grid">
            <div><strong>Фирма:</strong> {order.companyName}</div>
            <div><strong>МОЛ:</strong> {order.companyReg}</div>
            <div><strong>ЕИК:</strong> {order.companyEIK}</div>
            <div><strong>Адрес:</strong> {order.companyAddress}</div>
          </div>
        </section>
      )}

      <section className="ord-det-products">
        <h3 className="ord-det-section-title">Продукти</h3>
        {order.cart.length === 0 ? (
          <p className="ord-det-empty">Няма продукти в поръчката.</p>
        ) : (
          <div className="ord-det-cart">
            {order.cart.map((item) => {
              const liveProduct = productsData[item.productId];

              
              const fallback = {
                title: item.title || "Липсващо име",
                price: item.price || 0,
                images: item.image ? [item.image] : [],
              };

              const display = liveProduct || fallback;
              const subtotal = display.price * (item.quantity || 1);

              return (
                <article key={item.productId || item._id} className="ord-det-item">
                  {display.images.length > 0 ? (
                    <img
                      src={display.images[0]}
                      alt={display.title}
                      className="ord-det-img"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling?.classList.remove("ord-det-img-placeholder");
                      }}
                    />
                  ) : (
                    <div className="ord-det-img ord-det-img-placeholder">Без снимка</div>
                  )}

                  <div className="ord-det-item-info">
                    <h4 className="ord-det-item-title">
                      {display.title}
                      {!liveProduct && (
                        <span className="ord-det-missing-badge">
                          
                        </span>
                      )}
                    </h4>
                    <div className="ord-det-item-details">
                      <span>
                        <strong>Цена:</strong> {display.price.toFixed(2)} лв.
                      </span>
                      <span>
                        <strong>Бр.:</strong> {item.quantity || 1}
                      </span>
                      <span>
                        <strong>Сума:</strong> {subtotal.toFixed(2)} лв.
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      <footer className="ord-det-summary">
        <div className="ord-det-summary-row">
          <strong>Обща сума:</strong>
          <span className="ord-det-total">{order.totalAmount.toFixed(2)} лв.</span>
        </div>
        <div className="ord-det-summary-row">
          <strong>Статус:</strong>
          <span className={`ord-det-status ord-det-status-${order.status.toLowerCase()}`}>
            {order.status}
          </span>
        </div>
        {order.comment && (
          <div className="ord-det-summary-row ord-det-comment">
            <strong>Коментар:</strong> {order.comment}
          </div>
        )}
      </footer>
    </div>
  );
};

export default OrderDetails;