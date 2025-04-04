import React from "react";
import { Link } from "react-router-dom";
import "./product.css";

function ProductCard({ img, title, id, price }) {
  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = cart.find((item) => item.id === id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({
        id,
        title,
        price,
        image: img,
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Продуктът е добавен в количката!");
  };

  return (
    <div className="product">
      <img src={img} alt={title} />
      <p>{title}</p>
      <div className="product-buttons">
        <Link to={`/accessories/detail/${id}`}>
          <button className="details-btn1">Разгледай</button>
        </Link>
        <button className="add-to-cart-btn1" onClick={addToCart}>
          Добави в количка
        </button>
      </div>
    </div>
  );
}

export default ProductCard;