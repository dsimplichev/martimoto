import React, { useEffect, useState } from "react";
import ProductCard from "../../Card/ProductCard";
import "./lastproduct.css";

function LastProduct() {
    const [products, setProducts] = useState([]);
    const [startIndex, setStartIndex] = useState(0);
    const visibleCount = 4;

    useEffect(() => {
        fetch("http://localhost:5000/api/accessories/last")
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch((error) => console.error("Грешка при зареждане на продуктите:", error));
    }, []);

    const handlePrev = () => {
        setStartIndex((prevIndex) => Math.max(prevIndex - visibleCount, 0));
    };

    const handleNext = () => {
        setStartIndex((prevIndex) => 
            Math.min(prevIndex + visibleCount, products.length - visibleCount)
        );
    };

    const visibleProducts = products.slice(startIndex, startIndex + visibleCount);

    return (
        <div className="container">
            <div className="header-section">
                <h2 className="title-last-product">Last Products</h2>
            </div>

            <div className="divider-last"></div>

            {products.length > 0 ? (
                <>
                   

                    <div className="products-grid">
                        {visibleProducts.map((product, index) => (
                            <ProductCard 
                                key={index} 
                                img={product.images[0]}  
                                title={product.title} 
                                id={product._id}
                                price={product.price}
                            />
                        ))}
                    </div>
                    <div className="slider-controls">
                        <button onClick={handlePrev} disabled={startIndex === 0}>◀</button>
                        <button onClick={handleNext} disabled={startIndex + visibleCount >= products.length}>▶</button>
                    </div>
                </>
            ) : (
                <p>Все още няма нови продукти.</p>
            )}
        </div>
    );
}

export default LastProduct;