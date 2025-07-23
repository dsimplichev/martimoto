import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import { FaSearch } from "react-icons/fa";
import { MdAddShoppingCart } from "react-icons/md";
import "./product.css";

function ProductCard({ img, title, id, price, itemType }) {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const EUR_EXCHANGE_RATE = 1.95583;
  const priceEUR = (price / EUR_EXCHANGE_RATE).toFixed(2);

  const handleNavigate = () => {
    if (itemType === "part") {
      navigate(`/parts/${id}`);
    } else {
      navigate(`/accessories/detail/${id}`);
    }
  };

  const handleAddToCart = () => {
    const product = {
      _id: id,
      title: title,
      price: price,
      image: img,
      itemType: itemType,
    };
    console.log("Добавям в количката:", product);
    addToCart(product);
    alert("Продуктът беше добавен в количката!");
  };

  return (
    <div className="product2">
      <img src={img} alt={title} />

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
            onClick={handleNavigate}
            title="Разгледай"
          >
            <FaSearch />
          </button>
          <button
            className="add-to-cart-btn1"
            onClick={handleAddToCart}
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
