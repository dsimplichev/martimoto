import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import './favorites.css';
import { Link } from 'react-router-dom';

function Favorites() {
  const { user } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);

  console.log("AuthContext user:", user);
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

  if (!user) return <p>Моля, влезте в профила си.</p>;

  return (
    <div className="favorites-page">
      <h1 className="favorites-title">Любими части</h1>
      {favorites.length === 0 ? (
        <p className="no-favorites">Нямате добавени любими части.</p>
      ) : (
        <div className="favorites-grid">
          {favorites.map(part => (
            <Link to={`/parts/${part.partId}`} key={part._id} className="favorite-card-link">
              <div className="favorite-card">
                <img src={part.image} alt={part.title} />
                <h3>{part.title}</h3>
                <p>{part.price} лв.</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;