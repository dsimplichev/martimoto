import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../../Card/ProductCard';
import './productresults.css';

function ProductResults() {
    const [accessories, setAccessories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query');

    useEffect(() => {
        fetch(`http://localhost:5000/api/search?query=${query}`)
            .then((res) => res.json())
            .then((data) => {
                setAccessories(data);
                setCurrentPage(1); 
            })
            .catch((error) => console.error("Грешка при търсенето на аксесоари:", error));
    }, [query]);

    
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = accessories.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(accessories.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' }); 
    };

    return (
        <div className="product-results-container">
            <div className="header-section2">
                <h2 className="title-parts-search">Резултат от търсенето: {query}</h2>
            </div>

            <div className="divider-parts3"></div>

            <div className="product-results">
                {currentItems.length > 0 ? (
                    currentItems.map((accessory, index) => (
                        <ProductCard
                            key={index}
                            id={accessory._id} 
                            img={accessory.images[0]}
                            title={accessory.title}
                            price={accessory.price}                
                            type={accessory.type}
                        />
                    ))
                ) : (
                    <div className='product-results2'>Няма намерени аксесоари.</div>
                )}
            </div>

            {totalPages > 1 && (
                <div className="pagination2">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => handlePageChange(index + 1)}
                            className={currentPage === index + 1 ? 'active-page' : ''}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ProductResults;