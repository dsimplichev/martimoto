import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import axios from "axios";
import { CartContext } from "../../Context/CartContext";
import "./MatDetailsPage.css";

function MatDetailsPage() {
    const { id } = useParams();
    const [mat, setMat] = useState(null);
    const [mainImage, setMainImage] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [notification, setNotification] = useState("");

    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        const fetchMat = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/mats/${id}`);
                setMat(res.data);
                setMainImage(res.data.images?.[0] || "");
            } catch (err) {
                console.error("Грешка при зареждане на детайлите на стелката:", err);
                setMainImage("https://placehold.co/800x600/e6e6e6/000?text=ГРЕШКА");
            }
        };
        fetchMat();
    }, [id]);

    if (!mat) {
        return (
            <div className="mat-loading-container">
                <div className="mat-spinner"></div>
                <p>Зареждане на детайли...</p>
            </div>
        );
    }

    const handleDecrement = () => setQuantity(prev => Math.max(1, prev - 1));
    const handleIncrement = () => setQuantity(prev => prev + 1);

    const handleAddToCart = () => {
        addToCart({
            _id: mat._id,
            title: mat.title,
            price: mat.price,
            quantity,
            image: mainImage,
            itemType: "mat"
        });

        setNotification(`Продукт "${mat.title}" (${quantity} бр.) е добавен в количката!`);
        setTimeout(() => setNotification(""), 3000);
    };

    return (
        <div className="mat-detail-page">
            {notification && <div className="cart-notification-center">{notification}</div>}

            <div className="mat-detail-container">
                <div className="mat-images-section">
                    <div className="mat-main-image-wrapper">
                        <img
                            src={mainImage}
                            alt={mat.title}
                            className="mat-main-image"
                            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/800x600/e6e6e6/000?text=Снимка+недостъпна"; }}
                        />
                    </div>
                    {mat.images?.length > 0 && (
                        <div className="mat-thumbnails">
                            {mat.images.map((img, idx) => (
                                <img
                                    key={idx}
                                    src={img}
                                    alt={`Снимка ${idx + 1}`}
                                    className={`mat-thumbnail ${mainImage === img ? "active" : ""}`}
                                    onMouseEnter={() => setMainImage(img)}
                                    onClick={() => setMainImage(img)}
                                    onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/70x70/e6e6e6/000?text=X"; }}
                                />
                            ))}
                        </div>
                    )}
                </div>

                <div className="mat-info-section">
                    <h1 className="mat-title">{mat.title}</h1>

                    <div className="mat-spec-container">
                        <p className="mat-spec"><strong>Марка:</strong> {mat.carBrand}</p>
                        <p className="mat-spec"><strong>Модел:</strong> {mat.carModel}</p>
                        <p className="mat-spec"><strong>Материал:</strong> {mat.material}</p>
                    </div>
                    <div className="mat-price">
                        <strong>{Number(mat.price).toFixed(2)} лв.</strong>
                        <span>/ {(Number(mat.price) / 1.95583).toFixed(2)} €</span>
                    </div>

                    <p className="mat-description"><strong>Описание:</strong> {mat.description}</p>

                    <div className="quantity-control-container">
                        <label className="quantity-label">Количество:</label>
                        <div className="quantity-button-group">
                            <button className="quantity-button minus" onClick={handleDecrement} disabled={quantity === 1}>-</button>
                            <div className="quantity-display">{quantity}</div>
                            <button className="quantity-button plus" onClick={handleIncrement}>+</button>
                        </div>
                    </div>

                    <button className="mat-add-to-cart-btn" onClick={handleAddToCart}>
                        <FaShoppingCart className="mat-buy-icon" /> Добави в количката
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MatDetailsPage;