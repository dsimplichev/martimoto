import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { MdAddShoppingCart } from "react-icons/md";
import { CartContext } from "../../Context/CartContext"; 
import "./accessoryDetails.css";

function AccessoryDetails() {
    const { accessoryName } = useParams();
    const [accessories, setAccessories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    const { addToCart } = useContext(CartContext); 
    const handleAddToCart = (e, accessory) => {
        e.stopPropagation();
        e.preventDefault();

        const productToAdd = {
            id: accessory._id,
            title: accessory.title,
            price: accessory.price,
            image: accessory.images[0],
            quantity: 1,
            type: "accessory" 
        };

        addToCart(productToAdd);

        alert(`Продуктът "${accessory.title}" беше добавен във вашата количка.`); 
    };

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

    const handlePageChange = (_, page) => {
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
                        <div key={acc._id} className="part-card">
                            <img
                                src={acc.images[0]}
                                alt={acc.title}
                                className="part-image2"
                            />
                            <div className="part-info">
                                <h3 className="part-title">{acc.title}</h3>
                                <div className="price-and-cart">
                                    <p className="part-price">{acc.price} лв.</p>
                                    <MdAddShoppingCart
                                        className="cart-icon"
                                        onClick={(e) => handleAddToCart(e, acc)}
                                    />
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="no-accessories">Няма налични аксесоари в тази категория.</p>
                )}
            </div>

            <Stack spacing={2} alignItems="center" marginTop={2} className="pagination-container">
                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    variant="outlined"
                    shape="rounded"
                    className="pagination"
                />
            </Stack>
        </div>
    );
}

export default AccessoryDetails;