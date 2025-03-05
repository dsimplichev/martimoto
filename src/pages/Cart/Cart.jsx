import React, { useState } from "react";
import "./cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "BT Moto Intake Flapper Removal Kit",
      sku: "10360831",
      price: 100.0,
      image: "flapper-kit.jpg",
      status: "In Stock",
      quantity: 1,
    },
    {
      id: 2,
      name: "Kriega R20 Backpack",
      sku: "B28431",
      price: 179.99,
      image: "kriega-r20.jpg",
      status: "Out of Stock",
      quantity: 1,
    },
    {
      id: 3,
      name: "Rizoma Cut Edge Mirrors",
      sku: "10315482",
      price: 180.95,
      image: "rizoma-mirror.jpg",
      status: "In Stock",
      quantity: 1,
    },
  ]);

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-container">
      <div className="header-section-cart">
        <h1>MY CART</h1>
      </div>
      <div className="divider-cart"></div>
      <div className="cart-items">
        {cartItems.map((item) => (
          <div className="cart-item" key={item.id}>
            <img src={item.image} alt={item.name} className="item-image" />
            <div className="item-details">
              <h3>{item.name}</h3>
              <button onClick={() => removeItem(item.id)} className="remove-btn">
                Remove
              </button>
            </div>
            <p className="price">${item.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
      <div className="order-summary">
        <p>
          <strong>Estimated Total:</strong> ${totalPrice.toFixed(2)}
        </p>
      </div>
      <button className="checkout-btn">PROCEED TO CHECKOUT</button>
    </div>
  );
};

export default Cart;
