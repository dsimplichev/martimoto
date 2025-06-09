import React, { useEffect, useState, useContext } from 'react';
import { CartContext } from '../../Context/CartContext';
import { FavoritesContext } from '../../Context/FavoritesContext';
import { AuthContext } from '../../Context/AuthContext';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './partsByYear.css';
import Divider from '../../Card/Divider';
import { MdAddShoppingCart } from "react-icons/md";
import { IoHeartOutline } from "react-icons/io5";

function PartsByYear() {
  const { brandName, modelName, year } = useParams();
  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const { addToCart } = useContext(CartContext);
  const { addToFavorites } = useContext(FavoritesContext);
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchParts = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/parts?brand=${brandName}&model=${modelName}&year=${year}`
        );
        const data = await response.json();
        setParts(data);
      } catch (error) {
        console.error('Грешка при зареждане на части:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchParts();
  }, [brandName, modelName, year]);

  const handleAddToCart = (e, part) => {
    e.stopPropagation();
    e.preventDefault();

    const productToAdd = {
      _id: part._id,
      title: part.title,
      price: part.price,
      image: part.images[0],
    };

    addToCart(productToAdd);

    setPopupMessage(`Продуктът "${part.title}" беше добавен във вашата количка.`);
    setShowPopup(true);
  };

  const handleAddToFavorites = (e, part) => {
    e.stopPropagation();
    e.preventDefault();

    if (!isLoggedIn) {
      alert('Моля, влезте в профила си, за да добавяте в любими.');
      navigate('/login');
      return;
    }

    addToFavorites(part);
    setPopupMessage(`Продуктът "${part.title}" беше добавен в любими.`);
    setShowPopup(true);
  };

  return (
    <>
      <div className="parts-by-year">
        <h1 className="brand-title5">Части за {brandName} {modelName} ({year})</h1>
        <Divider />

        {loading ? (
          <p>Зареждане...</p>
        ) : parts.length === 0 ? (
          <p className='noparts'>Няма намерени части за този модел и година.</p>
        ) : (
          <div className="parts-grid">
            {parts.map((part) => (
              <Link
                to={`/parts/${part._id}`}
                key={part._id}
                className="part-card-link"
              >
                <div className="part-card">
                  <img
                    src={part.images[0]}
                    alt={part.title}
                    className="part-image"
                  />
                  <div className="part-info">
                    <h3 className="part-title">{part.title}</h3>
                    <div className="price-and-cart">
                      <p className="part-price">{part.price} лв.</p>
                      <div className="icon-group">
                        <IoHeartOutline
                          className="heart-icon"
                          onClick={(e) => handleAddToFavorites(e, part)}
                        />
                        <MdAddShoppingCart
                          className="cart-icon"
                          onClick={(e) => handleAddToCart(e, part)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <p>{popupMessage}</p>
            <button className="popup-button" onClick={() => setShowPopup(false)}>
              ОК
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default PartsByYear;