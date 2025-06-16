import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import { FaSearch } from "react-icons/fa";
import { MdAddShoppingCart } from "react-icons/md";
import "./product.css";

function ProductCard({ img, title, id, price, type }) {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const handleNavigate = () => {
    if (type === "part") {
      navigate(`/parts/detail/${id}`);
    } else {
      navigate(`/accessories/detail/${id}`);
    }
  };

  const handleAddToCart = () => {
    const product = {
      id: id,
      title: title,
      price: price,
      image: img,
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
          <p className="product-price2">{price} лв.</p>
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
