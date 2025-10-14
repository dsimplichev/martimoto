import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../../Context/CartContext";
import "./TruckOilDetailsPage.css"; 

function TruckOilDetailsPage() {
    const { id } = useParams();
    const [oil, setOil] = useState(null);
    const [mainImage, setMainImage] = useState("");
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useContext(CartContext);
    const [notification, setNotification] = useState("");


    useEffect(() => {
        const fetchOil = async () => {
            try {
                
                const res = await axios.get(`http://localhost:5000/api/oils/${id}`); 
                setOil(res.data);
                setMainImage(res.data.images?.[0] || "");
            } catch (err) {
                console.error("Грешка при зареждане на масло за камиони:", err);
            }
        };
        fetchOil();
    }, [id]);

    if (!oil) {
        return <p>Зареждане...</p>;
    }
    
   
    const handleDecrement = () => {
        setQuantity(prev => Math.max(1, prev - 1));
    };

    const handleIncrement = () => {
        setQuantity(prev => prev + 1);
    };
    

    const handleAddToCart = () => {
        addToCart({
            ...oil,
            quantity,
            image: mainImage || oil.images?.[0],
            itemType: "truckOil" 
        });

        setNotification(`Продукт "${oil.brand}" е добавен в количката.`);
        setTimeout(() => setNotification(""), 3000);
    };

    return (
        <div className="oil-details-container">
            {notification && <div className="cart-notification-center">{notification}</div>}
            <div className="oil-images-section">
                <div className="oil-main-image-wrapper">
                    <img src={mainImage} alt={oil.brand} className="oil-main-image" />
                </div>
                
                
                {oil.images?.length > 1 && (
                    <div className="oil-thumbnails">
                        {oil.images.slice(0, 3).map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={`oil-${index}`}
                                className={`oil-thumbnail ${mainImage === img ? "active" : ""}`}
                                onMouseEnter={() => setMainImage(img)}
                                onClick={() => setMainImage(img)}
                            />
                        ))}
                    </div>
                )}
            </div>

            <div className="oil-info-section">
                <h2 className="oil-title">{oil.brand}</h2>

                <p className="oil-viscosity">Вискозитет: {oil.viscosity}</p>
                <p className="oil-volume">Разфасовка: {oil.volume}</p>

                <div className="oil-price">
                    <strong>{Number(oil.price).toFixed(2)} лв.</strong> /
                    <span> {(Number(oil.price) / 1.95583).toFixed(2)} €</span>
                </div>

                
                 <div className="quantity-control-container">
                    <label className="quantity-label">Количество:</label>
                    <div className="quantity-button-group">
                        <button
                            className="quantity-button minus"
                            onClick={handleDecrement}
                            disabled={quantity === 1}
                        >
                            -
                        </button>
                        
                        <div className="quantity-display">
                            {quantity}
                        </div>
                        
                        <button
                            className="quantity-button plus"
                            onClick={handleIncrement}
                        >
                            +
                        </button>
                    </div>
                </div>

                <button className="oil-add-to-cart-btn" onClick={handleAddToCart}>
                    <i className="fas fa-shopping-cart"></i> Добави в количката
                </button>
            </div>
        </div>
    );
}

export default TruckOilDetailsPage;