import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./TireDetailsPage.css";
import { CartContext } from '../../Context/CartContext';

function TireDetailsPage() {
    const { id } = useParams();
    const [tire, setTire] = useState(null);
    const [mainImage, setMainImage] = useState(null);
    const [quantity, setQuantity] = useState(1); 
    const [notification, setNotification] = useState("");
    const { addToCart } = useContext(CartContext);
    
    useEffect(() => {
        const fetchTire = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/car-tires/${id}`);
                setTire(response.data);
                setMainImage(response.data.images[0]); 
            } catch (err) {
                console.error("Грешка при зареждане на гума:", err);
            }
        };
        fetchTire();
    }, [id]);

    
    const incrementQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    
    const decrementQuantity = () => {
        setQuantity(prevQuantity => Math.max(1, prevQuantity - 1));
    };
    
    

    if (!tire) return <p>Зареждане...</p>;

    const priceInEuro = (tire.price / 1.95583).toFixed(2);

    const handleAddToCart = () => {
        const productForCart = {
            _id: tire._id,
            title: `${tire.brand} ${tire.model}`,
            price: tire.price,
            image: tire.images && tire.images.length > 0 ? tire.images[0] : '/placeholder.png',
            itemType: "tire",
            quantity: quantity, 
        };
        addToCart(productForCart);
         setNotification(`Продукт "${tire.brand} ${tire.model}" е добавен в количката.`);
        setTimeout(() => setNotification(""), 3000);
    };

    return (
        <div className="tire-details-container">
             {notification && <div className="cart-notification-center">{notification}</div>}
            <div className="tire-details-left">
                <img
                    src={mainImage}
                    alt={tire.model}
                    className="tire-main-image"
                />

                <div className="tire-thumbnails">
                    {tire.images && tire.images.map((img, i) => (
                        <img
                            key={i}
                            src={img}
                            alt={`thumb-${i}`}
                            className={`tire-thumb ${mainImage === img ? "active" : ""}`}
                            onClick={() => setMainImage(img)}
                        />
                    ))}
                </div>
            </div>

            <div className="tire-details-right">
                <h1>{tire.brand} {tire.model}</h1>

                <ul className="tire-specs">
                    <li><strong>Производител:</strong> <span>{tire.brand}</span></li>
                    <li><strong>Сезон:</strong> <span>{tire.season}</span></li>
                    <li><strong>Широчина:</strong> <span>{tire.width}</span></li>
                    <li><strong>Височина:</strong> <span>{tire.aspectRatio}</span></li>
                    <li><strong>Диаметър:</strong> <span>{tire.diameter}</span></li>
                    <li><strong>Ниво на шум:</strong> <span>{tire.noiseLevel} dB</span></li>
                    <li><strong>Товарен индекс:</strong> <span>{tire.loadIndex}</span></li>
                    <li><strong>Скоростен индекс:</strong> <span>{tire.speedRating}</span></li>
                    <li><strong>Икономичен индекс:</strong> <span>{tire.fuelEconomy}</span></li>
                    <li><strong>Сцепление на мокро:</strong> <span>{tire.wetGrip}</span></li>
                </ul>

                <div className="tire-details-price">
                    <span><strong>{tire.price} лв.</strong> (с ДДС)</span>
                    <br />
                    <span className="price-euro">{priceInEuro} €</span>
                </div>
                
                
                <div className="quantity-control-container">
                    <label htmlFor="quantity-display" className="quantity-label">Количество:</label>
                    <div className="quantity-button-group">
                        <button
                            className="quantity-button minus"
                            onClick={decrementQuantity}
                            disabled={quantity === 1} 
                        >
                            -
                        </button>
                        <span id="quantity-display" className="quantity-display">{quantity}</span>
                        
                        <button
                            className="quantity-button plus"
                            onClick={incrementQuantity}
                        >
                            +
                        </button>
                    </div>
                </div>
                

                <button className="add-to-cart-button" onClick={handleAddToCart}>
                    Добави в кошницата
                </button>
            </div>
        </div>
    );
}

export default TireDetailsPage;