import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../../Card/ProductCard';
import './productresults.css';

function ProductResults() {
    const [accessories, setAccessories] = useState([]);
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query');

    useEffect(() => {
        console.log(`Извършвам търсене за: ${query}`);
        fetch(`http://localhost:5000/api/search?query=${query}`)
            .then((res) => res.json())
            .then((data) => {
                console.log("Резултати от търсенето: ", data);
                setAccessories(data);
            })
            .catch((error) => console.error("Грешка при търсенето на аксесоари:", error));
    }, [query]);

    return (
        <div className="product-results-container">

            <div className="header-section2">
                <h2 className="title-parts-search">Резултат от търсенето: {query}</h2>
            </div>


            <div className="divider-parts3"></div>


            <div className="product-results">
                {accessories.length > 0 ? (
                    accessories.map((accessory, index) => (
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
        </div>
    );
}

export default ProductResults;