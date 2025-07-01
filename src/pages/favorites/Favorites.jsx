import React, { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import './favorites.css';
import { Link } from 'react-router-dom';
import { GoTrash } from "react-icons/go";
import { MdAddShoppingCart } from "react-icons/md";
import { CartContext } from '../../Context/CartContext';
import { FavoritesContext } from '../../Context/FavoritesContext';

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
      <h1 className="favorites-title">Любими части</h1>
      {favorites.length === 0 ? (
        <p className="no-favorites">Нямате добавени любими части.</p>
      ) : (
        <div className="favorites-grid">
          {favorites.map((part) => (
            <div className="part-card" key={part.id}>
              <Link to={`/parts/${part.id}`} className="part-card-link">
                <img
                  src={part.image}
                  alt={part.title}
                  className="part-image"
                />
                <div className="part-info">
                  <h3 className="part-title">{part.title}</h3>
                  <div className="price-and-cart">
                    <p className="part-price">{part.price} лв.</p>
                    <div className="icon-group">
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