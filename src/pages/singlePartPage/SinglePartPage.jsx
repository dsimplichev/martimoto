
import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { FaTruckFast, FaPhoneVolume } from 'react-icons/fa6';
import { BiSolidBadgeDollar } from 'react-icons/bi';
import { CartContext } from '../../Context/CartContext';

function SinglePartPage() {
    const { id } = useParams();
    const [part, setPart] = useState(null);
    const [mainImage, setMainImage] = useState('');
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useContext(CartContext);
    const [type, setType] = useState('part'); // За да знаем дали е част или аксесоар

    useEffect(() => {
        const fetchData = async () => {
            try {
                
                let response = await fetch(`http://localhost:5000/api/parts/${id}`);
                let data = await response.json();

                if (response.ok && data._id) {
                    setPart(data);
                    setMainImage(data.images?.[0] || "/default-image.jpg");
                    setType('part');
                } else {
                    
                    response = await fetch(`http://localhost:5000/api/accessories/${id}`);
                    data = await response.json();

                    if (response.ok && data._id) {
                        setPart(data);
                        setMainImage(data.images?.[0] || "/default-image.jpg");
                        setType('accessory');
                    } else {
                        // Ако няма и аксесоар - няма продукт
                        setPart(null);
                    }
                }
            } catch (error) {
                console.error('Грешка при зареждане:', error);
                setPart(null);
            }
        };

        fetchData();
    }, [id]);

    const handleAddToCart = () => {
        if (!part) return;

        const cartItem = {
            id: part._id,
            title: part.title,
            image: mainImage,
            price: part.price,
            quantity: Number(quantity),
            type: type,
        };

        addToCart(cartItem);
        alert("Продуктът беше добавен в количката!");
    };

    if (part === null) return <p>Продуктът не е намерен.</p>;
    if (!part) return <p>Зареждане...</p>;

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
                    <img src={mainImage} alt={part.title} className="main-image" />
                    <div className="thumbnail-images">
                        {Array.isArray(part.images) && part.images.slice(1, 5).map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={`thumb-${index}`}
                                className="thumbnail-image"
                                onClick={() => setMainImage(img)}
                            />
                        ))}
                    </div>
                </div>

                <div className="product-info">
                    <div className="product-details">
                        <h2 className="product-title">{part.title}</h2>
                        <p className="product-description">{part.description}</p>
                        <p className="product-price">{part.price} лв.</p>
                        <span className="stock-status">В наличност! Доставя се в рамките на 48 часа</span>
                    </div>

                    <div className="add-to-cart">
                        <select
                            className="quantity-selector"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                        >
                            {[...Array(9)].map((_, i) => (
                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                            ))}
                        </select>
                        <button className="add-to-cart-btn" onClick={handleAddToCart}>
                            Добави в количката
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SinglePartPage;