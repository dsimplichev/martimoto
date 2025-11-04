import { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../../Context/CartContext'; 
import './accessoryDetailPage.css';
import { FaTruckFast } from 'react-icons/fa6';
import { BiSolidBadgeDollar } from 'react-icons/bi';
import { FaPhoneVolume } from 'react-icons/fa6';
import { FaShoppingCart } from 'react-icons/fa';

function AccessoryDetailPage() {
    const { id } = useParams();
    const { addToCart } = useContext(CartContext);
    const [accessory, setAccessory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [mainImage, setMainImage] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [notification, setNotification] = useState("");

    const getImageUrl = (image) => {
        if (!image) return "/default-image.jpg";
        if (image.startsWith("http")) return image;
        return `http://localhost:5000/uploads/${image}`;
    };

    useEffect(() => {
        axios.get(`http://localhost:5000/accessories/detail/${id}`)
            .then(response => {
                setAccessory(response.data);

                if (response.data.images && response.data.images.length > 0) {
                    setMainImage(response.data.images[0]);
                } else {
                    setMainImage('/default-image.jpg');
                }
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

    const showNotification = (message) => {
        setNotification(message);
        setTimeout(() => setNotification(""), 3000);
    };

    const handleAddToCart = () => {
        const product = {
            _id: accessory._id,
            title: accessory.title,
            price: accessory.price,
            quantity: Number(quantity),
            image: getImageUrl(accessory.images?.[0]),
            itemType: "accessory"
        };


        addToCart(product);
        showNotification(`Продуктът "${accessory.title}" беше добавен във вашата количка.`);
    };

    return (
       <div className="accessory-detail-page">
    {/* === ОБЩ КОНТЕЙНЕР === */}
    <div className="page-wrapper">

        {/* === ТОП ФИЙЧЪРИ === */}
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

        {/* === ГЛАВНА ИНФОРМАЦИЯ === */}
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
                    <p className="product-price">
                        {accessory.price.toFixed(2)} лв. / {(accessory.price / 1.95583).toFixed(2)} €
                    </p>
                    <span className="stock-status">В наличност! Доставя се в рамките на 48 часа</span>
                </div>

                <button className="add-to-cart-btn" onClick={handleAddToCart}>
                    <FaShoppingCart className="cart-icon" /> Добави в количката
                </button>
            </div>
        </div>

    </div> {/* КРАЙ НА page-wrapper */}

    
    {notification && (
        <div className="cart-notification-center">{notification}</div>
    )}
</div>
    );
}

export default AccessoryDetailPage;