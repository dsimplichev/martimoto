import { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../../Context/CartContext'; // Импортиране на CartContext
import './accessoryDetailPage.css';
import { FaTruckFast } from 'react-icons/fa6';
import { BiSolidBadgeDollar } from 'react-icons/bi';
import { FaPhoneVolume } from 'react-icons/fa6';

function AccessoryDetailPage() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext); // Извикване на addToCart от контекста
  const [accessory, setAccessory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axios.get(`http://localhost:5000/accessories/detail/${id}`)
      .then(response => {
        setAccessory(response.data);
        setMainImage(response.data.images[0]);
        setLoading(false);
      })
      .catch(error => {
        console.error("Грешка при заявката:", error);
        setError("Неуспешно зареждане на аксесоара.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Зареждане...</p>;
  if (error) return <p>{error}</p>;

  const handleAddToCart = async () => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const product = {
      id: accessory._id,
      title: accessory.title,
      price: accessory.price,
      quantity: Number(quantity),
      image: accessory.images[0], 
    };

    if (userId && token) {
      
      addToCart(product); 
      alert('Продуктът беше успешно добавен в количката!');
    } else {
      
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const existingItem = cart.find(item => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += Number(quantity);
      } else {
        cart.push(product);
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      alert('Продуктът беше добавен в количката! (Гост)');
    }
  };

  return (
    <div className="accessory-detail-page">
      <div className="top-features">
        <div className="feature-item">
          <span className="feature-icon"><FaTruckFast /></span>
          <span className="feature-text">Доставяме до цялата страна!</span>
        </div>
        <div className="feature-item">
          <span className="feature-icon"><BiSolidBadgeDollar /></span>
          <span className="feature-text">Най-добри цени!</span>
        </div>
        <div className="feature-item">
          <span className="feature-icon"><FaPhoneVolume /></span>
          <span className="feature-text">На ваше разположение 24/7!</span>
        </div>
      </div>

      <div className="main-info">
        <div className="product-images">
          <img src={mainImage} alt={accessory.title} className="main-image" />
          <div className="thumbnail-images">
            {accessory.images.slice(1, 5).map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`thumbnail-${index}`}
                onClick={() => setMainImage(image)}
                className="thumbnail-image"
              />
            ))}
          </div>
        </div>

        <div className="product-info">
          <div className="product-details">
            <h2 className="product-title">{accessory.title}</h2>
            <p className="product-description">{accessory.description}</p>
            <p className="product-price">{accessory.price} лв.</p>
            <span className="stock-status">В наличност! Доставя се в рамките на 48 часа</span>
          </div>

          <div className="add-to-cart">
            <select
              className="quantity-selector"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
            <button
              className="add-to-cart-btn"
              onClick={handleAddToCart}
            >
              Добави в количката
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccessoryDetailPage;