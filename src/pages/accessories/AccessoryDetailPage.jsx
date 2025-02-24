import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./accessoryDetailPage.css"; 

function AccessoryDetailPage() {
    const { id } = useParams(); 
    const [accessory, setAccessory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        
        axios.get(`http://localhost:5000/accessories/detail/${id}`)
            .then(response => {
                setAccessory(response.data);
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
            <h1>{accessory.title}</h1>
            <div className="accessory-detail-container">
                <div className="main-image">
                    <img src={accessory.images[0]} alt={accessory.title} />
                </div>
                <div className="thumbnail-images">
                    {accessory.images.slice(1, 5).map((image, index) => (
                        <img key={index} src={image} alt={`thumbnail-${index}`} />
                    ))}
                </div>
                <div className="accessory-info">
                    <p>{accessory.description}</p>
                    <p className="price">{accessory.price} лв.</p>
                    <button className="add-to-cart-btn">Добави в количката</button>
                </div>
            </div>
        </div>
    );
}

export default AccessoryDetailPage;