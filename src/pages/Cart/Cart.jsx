import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    if (savedCart) {
      setCartItems(savedCart);
    }
  }, []);

  const removeItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
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
        {cartItems.map((item) => (
          <div className="cart-item" key={item.id}>
            <img src={item.image} alt={item.name} className="item-image" />
            <div className="item-details">
              <h3>{item.title}</h3>
              <button onClick={() => removeItem(item.id)} className="remove-btn2">
                Премахни
              </button>
            </div>
            <div className="item-meta">
              <p className="quantity">Количество: {item.quantity}</p>
              <p className="price2">{item.price.toFixed(2)} лв.</p>
            </div>
          </div>
        ))}
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