import React, { useEffect, useState } from "react";
import ProductCard from "../../Card/ProductCard";
import "./lastproduct.css";

function LastProduct() {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 4;

    useEffect(() => {
        fetch("http://localhost:5000/api/last-products")
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
            })
            .catch((error) =>
                console.error("Грешка при зареждане на продуктите:", error)
            );
    }, []);

    
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const totalPages = Math.ceil(products.length / productsPerPage);

    return (
        <div className="container4">
            <div className="header-section">
                <div className="title-last-product">Последно добавени</div>
            </div>

            <div className="divider-last"></div>

            {currentProducts.length > 0 ? (
                <>
                    <div className="products-grid-container">
                        {currentProducts.map((product, index) => (
                            <ProductCard
                                key={index}
                                img={product.images[0]}
                                title={product.title}
                                id={product._id}
                                price={product.price}
                            />
                        ))}
                    </div>

                    <div className="pagination">
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i}
                                className={`page-btn ${currentPage === i + 1 ? "active" : ""}`}
                                onClick={() => setCurrentPage(i + 1)}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                </>
            ) : (
                <p>Все още няма нови продукти.</p>
            )}
        </div>
    );
}

export default LastProduct;