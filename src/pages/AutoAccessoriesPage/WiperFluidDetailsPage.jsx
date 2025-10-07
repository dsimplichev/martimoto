import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../../Context/CartContext";
import "./WiperFluidDetailsPage.css";

function WiperFluidDetailsPage() {
    const { id } = useParams();
    const [fluid, setFluid] = useState(null);
    const [mainImage, setMainImage] = useState("");
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        const fetchFluid = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/wiper-fluid/${id}`);
                setFluid(res.data);

                setMainImage(res.data.images?.[0] || "");
            } catch (err) {
                console.error(err);
            }
        };
        fetchFluid();
    }, [id]);

    if (!fluid) {
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
            ...fluid,
            quantity,
            image: mainImage || fluid.images?.[0],
            itemType: "wiperFluid"
        });
    };

    return (
        <div className="wiper-fluid-details-container">
            <div className="fluid-images-section">
                <div className="fluid-main-image-wrapper">
                    <img src={mainImage} alt={fluid.title} className="fluid-main-image" />
                </div>


                {fluid.images?.length > 1 && (
                    <div className="fluid-thumbnails">
                        {fluid.images.slice(0, 3).map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={`fluid-${index}`}
                                className={`fluid-thumbnail ${mainImage === img ? "active" : ""}`}

                                onMouseEnter={() => setMainImage(img)}
                                onClick={() => setMainImage(img)}
                            />
                        ))}
                    </div>
                )}
            </div>

            <div className="fluid-info-section">

                <h2 className="fluid-title">{fluid.title}</h2>
                <p className="fluid-volume">Разфасовка: {fluid.volume}</p>

                <div className="fluid-price">
                    <strong>{Number(fluid.price).toFixed(2)} лв.</strong> /
                    <span> {(fluid.price / 1.95583).toFixed(2)} €</span>
                </div>

                <div className="fluid-quantity-control">
                    <label>Количество:</label>
                    <div className="quantity-buttons-wrapper">
                        <input
                            type="number"
                            min="1"
                            value={quantity}
                            readOnly
                            onChange={(e) => setQuantity(Number(e.target.value))}
                        />
                        <div className="vertical-controls"> 
                            <button className="qty-btn plus" onClick={handleIncrement}>
                                &#9650; 
                            </button>
                            <button className="qty-btn minus" onClick={handleDecrement} disabled={quantity === 1}>
                                &#9660; 
                            </button>
                        </div>
                    </div>
                </div>

                <button className="fluid-add-to-cart-btn" onClick={handleAddToCart}>
                    <i className="fas fa-shopping-cart"></i> Добави в количката
                </button>
            </div>
        </div>
    );
}

export default WiperFluidDetailsPage;