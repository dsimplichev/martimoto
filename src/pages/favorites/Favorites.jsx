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

  const handleAddToCart = (part) => {
    addToCart({
      _id: part.partId,
      title: part.title,
      image: part.image,
      price: part.price,
      quantity: 1,
    });
  };

  if (!user) return <p>Моля, влезте в профила си.</p>;

  return (
    <div className="favorites-page">
      <SectionHeader title="Любими части" />
      {favorites.length === 0 ? (
        <p className="no-favorites">Нямате добавени любими части.</p>
      ) : (
        <div className="favorites-grid">
          {favorites.map((part) => (
            <div className="favorite-item-card" key={part.id}>
              <Link to={`/parts/${part.id}`} className="favorite-item-link">
                <img
                  src={part.image}
                  alt={part.title}
                  className="favorite-item-image"
                />
                <div className="favorite-item-info">
                  <h3 className="favorite-item-title">{part.title}</h3>
                  <div className="favorite-price-and-cart">
                    <p className="favorite-item-price">{part.price} лв.</p>
                    <div className="favorite-icon-group">
                      <GoTrash
                        className="heart-icon"
                        onClick={(e) => {
                          e.preventDefault();
                          removeFromFavorites(part.id);
                        }}
                      />
                      <MdAddShoppingCart
                        className="cart-icon"
                        onClick={(e) => {
                          e.preventDefault();
                          handleAddToCart(part);
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