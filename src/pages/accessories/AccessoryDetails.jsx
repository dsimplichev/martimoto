import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./accessoryDetails.css";

function AccessoryDetails() {
    const { accessoryName } = useParams();
    const [accessories, setAccessories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

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

    const totalPages = Math.ceil(accessories.length / itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const paginatedAccessories = accessories.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    if (loading) return <p>Зареждане...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="accessories-page">
            <div className="header-section-acc">
                <h1>{accessoryName}</h1>
            </div>
            <div className="divider-acc"></div>
            <div className="accessory-list">
                {paginatedAccessories.length > 0 ? (
                    paginatedAccessories.map((acc) => (
                        <div key={acc._id} className="accessory-card">
                            <img src={acc.images[0]} alt={acc.name} />
                            <h3>{acc.title}</h3>
                            <h3>{acc.name}</h3>
                            {/* <p>{acc.description}</p> */}
                            <p className="price">{acc.price} лв.</p>
                        </div>
                    ))
                ) : (
                    <p className="no-accessories">Няма налични аксесоари в тази категория.</p>
                )}
            </div>

            
            <div className="pagination">
                <button 
                    disabled={currentPage === 1} 
                    onClick={() => handlePageChange(currentPage - 1)}>
                    Предишна
                </button>
                <span>{currentPage} от {totalPages}</span>
                <button 
                    disabled={currentPage === totalPages} 
                    onClick={() => handlePageChange(currentPage + 1)}>
                    Следваща
                </button>
            </div>
        </div>
    );
}

export default AccessoryDetails;