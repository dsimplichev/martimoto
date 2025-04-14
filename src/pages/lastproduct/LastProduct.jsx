import React, { useEffect, useRef, useState } from "react";
import ProductCard from "../../Card/ProductCard";
import "./lastproduct.css";

function LastProduct() {
    const [products, setProducts] = useState([]);
    const scrollRef = useRef(null);

    useEffect(() => {
        fetch("http://localhost:5000/api/accessories/last")
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch((error) => console.error("Грешка при зареждане на продуктите:", error));
    }, []);

    
    let isDown = false;
    let startX;
    let scrollLeft;

    const handleMouseDown = (e) => {
        isDown = true;
        scrollRef.current.classList.add('active');
        startX = e.pageX - scrollRef.current.offsetLeft;
        scrollLeft = scrollRef.current.scrollLeft;
    };

    const handleMouseLeave = () => {
        isDown = false;
        scrollRef.current.classList.remove('active');
    };

    const handleMouseUp = () => {
        isDown = false;
        scrollRef.current.classList.remove('active');
    };

    const handleMouseMove = (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX) * 2;
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    return (
        <div className="container">
            <div className="header-section">
                <h2 className="title-last-product">Последно добавени</h2>
            </div>

            <div className="divider-last"></div>

            {products.length > 0 ? (
                <div
                    ref={scrollRef}
                    className="products-scroll-container"
                    onMouseDown={handleMouseDown}
                    onMouseLeave={handleMouseLeave}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                >
                    {products.slice(0, 12).map((product, index) => (
                        <ProductCard 
                            key={index} 
                            img={product.images[0]}  
                            title={product.title} 
                            id={product._id}
                            price={product.price}
                        />
                    ))}
                </div>
            ) : (
                <p>Все още няма нови продукти.</p>
            )}
        </div>
    );
}

export default LastProduct;