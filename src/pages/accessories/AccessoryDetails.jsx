import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./accessoryDetails.css";

function AccessoryDetails() {
    const { accessoryName } = useParams();
    const [accessories, setAccessories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/accessories/${encodeURIComponent(accessoryName.toLowerCase())}`)
            .then(response => {
                setAccessories(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Грешка при заявката:", error);
                setError("Неуспешно зареждане на аксесоарите.");
                setLoading(false);
            });
    }, [accessoryName]);

    if (loading) return <p>Зареждане...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="accessories-page">
            <div className="header-section-acc">
                <h1>{accessoryName}</h1>
            </div>
            <div className="divider-acc"></div>
            <div className="accessory-list">
                {accessories.length > 0 ? (
                    accessories.map((acc) => (
                        <div key={acc._id} className="accessory-card">
                            <img src={acc.imageUrl} alt={acc.name} />
                            <h3>{acc.name}</h3>
                            <p>{acc.description}</p>
                            <p>Цена: {acc.price} лв.</p>
                        </div>
                    ))
                ) : (
                    <p>Няма налични аксесоари в тази категория.</p>
                )}
            </div>
        </div>
    );
}

export default AccessoryDetails;