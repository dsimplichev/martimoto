import './lastproduct.css'



function LastProduct() {
    return (
        <div className="container">
            <div className="header-section">
                <h2 className="title">Last Products</h2>
                {/* <a href="#" className="btn-all-categories">All Brands</a> */}
            </div>

            <div className="divider"></div>

            <div className="products-grid">
                <div className="product">
                    <img src="path_to_image" alt="Product 1" />
                    <div className="product-buttons">
                        <button className="details-btn">Details</button>
                        <button className="add-to-cart-btn">Add to cart</button>
                    </div>
                </div>

                <div className="product">
                    <img src="path_to_image" alt="Product 2" />
                    <div className="product-buttons">
                        <button className="details-btn">Details</button>
                        <button className="add-to-cart-btn">Add to cart</button>
                    </div>
                </div>

                <div className="product">
                    <img src="path_to_image" alt="Product 3" />
                    <div className="product-buttons">
                        <button className="details-btn">Details</button>
                        <button className="add-to-cart-btn">Add to cart</button>
                    </div>
                </div>

                <div className="product">
                    <img src="path_to_image" alt="Product 4" />
                    <div className="product-buttons">
                        <button className="details-btn">Details</button>
                        <button className="add-to-cart-btn">Add to cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LastProduct;