import React from "react";
import { Link } from "react-router-dom";
import "./product.css";

function ProductCard({ img, title, id }) {
  return (
    <div className="product">
      <img src={img} alt={title} />
      <p>{title}</p>
      <div className="product-buttons">
        <Link to={`/accessories/detail/${id}`}>
          <button className="details-btn1">Разгледай</button>
        </Link>
        <button className="add-to-cart-btn1">Добави в количка</button>
      </div>
    </div>
  );
}

export default ProductCard;