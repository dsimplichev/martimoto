import React, { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import './favorites.css';
import { Link } from 'react-router-dom';
import { GoTrash } from "react-icons/go";
import { MdAddShoppingCart } from "react-icons/md";
import { CartContext } from '../../Context/CartContext';
import { FavoritesContext } from '../../Context/FavoritesContext';
import SectionHeader from "../../Card/SectionHeader";

function Favorites() {
  const { user } = useContext(AuthContext);
  const { favorites, removeFromFavorites } = useContext(FavoritesContext);
  const { addToCart } = useContext(CartContext);

  // ✅ Унифицирана функция за добавяне в количката
  const handleAddToCart = (item) => {
    addToCart({
      _id: item.id,
      title: item.title,
      image: item.image,
      price: item.price,
      quantity: 1,
      type: item.type || "part",
    });
  };

  if (!user) return <p className="no-favorites">Моля, влезте в профила си.</p>;

  return (
    <div className="favorites-page">
      <SectionHeader title="Любими продукти" />
      
      {favorites.length === 0 ? (
        <p className="no-favorites">Нямате добавени любими продукти.</p>
      ) : (
        <div className="favorites-grid">
          {favorites.map((item) => (
            <div className="favorite-item-card" key={item.id}>
              
              <Link
                to={
                  item.type === "accessory"
                    ? `/accessories/detail/${item.id}`
                    : `/parts/${item.id}`
                }
                className="favorite-item-link"
              >
                <img
                  src={item.image || "/default-image.jpg"}
                  alt={item.title}
                  className="favorite-item-image"
                />
                <div className="favorite-item-info">
                  <h3 className="favorite-item-title">{item.title}</h3>
                  <div className="favorite-price-and-cart">
                    <p className="favorite-item-price">{item.price} лв.</p>
                    <div className="favorite-icon-group">
                      <GoTrash
                        className="heart-icon"
                        onClick={(e) => {
                          e.preventDefault();
                          removeFromFavorites(item.id);
                        }}
                      />
                      <MdAddShoppingCart
                        className="cart-icon"
                        onClick={(e) => {
                          e.preventDefault();
                          handleAddToCart(item);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;