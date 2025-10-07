import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./TireDetailsPage.css";
import { CartContext } from '../../Context/CartContext';

function TireDetailsPage() {
    const { id } = useParams();
    const [tire, setTire] = useState(null);
    const [mainImage, setMainImage] = useState(null);

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

    if (!tire) return <p>Зареждане...</p>;

    const priceInEuro = (tire.price / 1.95583).toFixed(2);

      const handleAddToCart = () => {
        const productForCart = {
            _id: tire._id,
            title: `${tire.brand} ${tire.model}`,
            price: tire.price,
            image: tire.images && tire.images.length > 0 ? tire.images[0] : '/placeholder.png',
            itemType: "tire",
            quantity: 1, 
        };
        addToCart(productForCart);
        alert("Гумата беше добавена в количката!");
    };

    return (
        <div className="tire-details-container">
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
                    <li><strong>Производител:</strong> {tire.brand}</li>
                    <li><strong>Сезон:</strong> {tire.season}</li>
                    <li><strong>Широчина:</strong> {tire.width}</li>
                    <li><strong>Височина:</strong> {tire.aspectRatio}</li>
                    <li><strong>Диаметър:</strong> {tire.diameter}</li>
                    <li><strong>Ниво на шум:</strong> {tire.noiseLevel} dB</li>
                    <li><strong>Товарен индекс:</strong> {tire.loadIndex}</li>
                    <li><strong>Скоростен индекс:</strong> {tire.speedRating}</li>
                    <li><strong>Икономичен индекс:</strong> {tire.fuelEconomy}</li>
                    <li><strong>Сцепление на мокро:</strong> {tire.wetGrip}</li>
                </ul>

                <div className="tire-details-price">
                    <span><strong>{tire.price} лв.</strong> (с ДДС)</span>
                    <br />
                    <span className="price-euro">{priceInEuro} €</span>
                </div>

                <button className="add-to-cart-button" onClick={handleAddToCart}>
                    Добави в кошницата
                </button>
            </div>
        </div>
    );
}

export default TireDetailsPage;