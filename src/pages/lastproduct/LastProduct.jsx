import React, { useEffect, useState } from "react";
import ProductCard from "../../Card/ProductCard";
import "./lastproduct.css";

function LastProduct() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        console.log("Изпраща се заявка за последни продукти...");

        fetch("http://localhost:5000/api/accessories/last")
            .then((res) => res.json())
            .then((data) => {
                console.log("Получени последни продукти:", data);
                setProducts(data);
            })
            .catch((error) => {
                console.error("Грешка при зареждане на продуктите:", error);
            });
    }, []);

    return (
        <div className="container">
            <div className="header-section">
                <h2 className="title-last-product">Last Products</h2>
            </div>

            <div className="divider-last"></div>

            <div className="products-grid">
                {products.length > 0 ? (
                    products.map((product, index) => (
                        <ProductCard 
                            key={index} 
                            img={product.images[0]}  
                            title={product.title} 
                            id={product._id}
                            price={product.price}
                        />
                    ))
                ) : (
                    <p>Все още няма нови продукти.</p>
                )}
            </div>
        </div>
    );
}

export default LastProduct;