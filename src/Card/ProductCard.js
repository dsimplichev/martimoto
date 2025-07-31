import React from "react"; 
import { IoHeartOutline } from "react-icons/io5";
import { MdAddShoppingCart } from "react-icons/md";
import "./product.css";

function ProductCard({ img, title, id, price, itemType, onNavigate, onAddToCart, onAddToFavorites }) { // Приема функции като props
  const EUR_EXCHANGE_RATE = 1.95583;
  const priceEUR = (price / EUR_EXCHANGE_RATE).toFixed(2);

  return (
    <div className="product2">
      <img src={img} alt={title} onClick={() => onNavigate(id, itemType)} />

      <div className="product-bottom-row">
        <div className="product-info-left">
          <p className="product-title">{title}</p>
          <p className="product-price2">
            {price} лв. / {priceEUR} €
          </p>
        </div>

        <div className="product-buttons">
          <button
            className="details-btn1"
            onClick={(e) => { e.stopPropagation(); onAddToFavorites(e, id); }}
            title="Добави в любими"
          >
            <IoHeartOutline />
          </button>
          <button
            className="add-to-cart-btn1"
            onClick={(e) => { e.stopPropagation(); onAddToCart(e, id); }}
            title="Добави в количката"
          >
            <MdAddShoppingCart />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;