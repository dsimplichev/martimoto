import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import "./cart.css";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const removeItem = (id) => {
    removeFromCart(id);
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );

  const handleCheckout = () => {
    navigate("/order");
  };

  return (
    <div className="cart-container">
      <div className="header-section-cart">
        <h1 className="cart-title">Моята количка</h1>
      </div>
      <div className="divider-cart"></div>
      <div className="cart-items">
        {cart.length === 0 ? (
          <p>Количката е празна</p>
        ) : (
          cart.map((item) => (
            <div className="cart-item" key={item._id}>
              <img
                src={item.image || item.img}
                alt={item.title}
                className="item-image"
              />
              <div className="item-details">
                <h3>{item.title}</h3>
                <button
                  onClick={() => removeItem(item._id)}
                  className="remove-btn2"
                >
                  Премахни
                </button>
              </div>
              <div className="item-meta">
                <p className="quantity">Количество: {item.quantity || 1}</p>
                <p className="price2">
                  {item.quantity > 1
                    ? `${(item.price * item.quantity).toFixed(2)} лв.`
                    : `${item.price.toFixed(2)} лв.`}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="order-summary">
        <p>
          <strong>Общо:</strong> {totalPrice.toFixed(2)} лв.
        </p>
      </div>
      <button onClick={handleCheckout} className="checkout-btn">
        Поръчай
      </button>
    </div>
  );
};

export default Cart;