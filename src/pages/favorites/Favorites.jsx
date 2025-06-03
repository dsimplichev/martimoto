import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import './favorites.css';
import { Link } from 'react-router-dom';
import { GoTrash } from "react-icons/go";
import { MdAddShoppingCart } from "react-icons/md";

function Favorites() {
  const { user } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/favorites/${user.email}`);
        const data = await response.json();
        setFavorites(data);
      } catch (error) {
        console.error("Грешка при зареждане на любими части:", error);
      }
    };

    if (user && user.email) {
      fetchFavorites();
    }
  }, [user]);

  const removeFromFavorites = async (partId) => {
    try {
      await fetch(`http://localhost:5000/api/favorites/${user.email}/${partId}`, {
        method: 'DELETE',
      });
      setFavorites(prev => prev.filter(part => part.partId !== partId));
    } catch (error) {
      console.error("Грешка при изтриване от любими:", error);
    }
  };

  const handleAddToCart = (part) => {
    console.log('Добавена в количката:', part.title);

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
            <div className="part-card" key={part.partId}>
              <Link to={`/parts/${part.partId}`} className="part-card-link">
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
                          removeFromFavorites(part.partId);
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