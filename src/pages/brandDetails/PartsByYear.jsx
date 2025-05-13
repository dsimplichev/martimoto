import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './partsByYear.css';
import Divider from '../../Card/Divider';
import { MdAddShoppingCart } from "react-icons/md";


function PartsByYear() {
  const { brandName, modelName, year } = useParams();
  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
 
  

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
    const user = localStorage.getItem("user");
    

    fetchParts();
  }, [brandName, modelName, year]);

  const handleAddToCart = (e, part) => {
    e.stopPropagation();    
    e.preventDefault();     

    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = existingCart.find((item) => item.id === part._id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      existingCart.push({
        id: part._id,
        title: part.title,
        price: part.price,
        image: part.images[0],
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));

    setPopupMessage(`Продуктът "${part.title}" беше добавен във вашата количка.`);
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
                      <MdAddShoppingCart
                        className="cart-icon"
                        onClick={(e) => 
                          
                        handleAddToCart(e, part)}
                      />
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