import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./accessoryDetailPage.css";
import { FaTruckFast } from "react-icons/fa6";
import { BiSolidBadgeDollar } from "react-icons/bi";
import { FaPhoneVolume } from "react-icons/fa6";


function AccessoryDetailPage() {
    const { id } = useParams();
    const [accessory, setAccessory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [mainImage, setMainImage] = useState(null);

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


            <div className="product-images">
                <img src={accessory.images[0]} alt={accessory.title} className="main-image" />
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
                    <select className="quantity-selector">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                    </select>
                    <button className="add-to-cart-btn">Добави в количката</button>
                </div>
            </div>
        </div>
    );
}

export default AccessoryDetailPage;