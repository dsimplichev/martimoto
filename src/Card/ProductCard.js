import React from 'react';
import './product.css'


function ProductCard({ img, title }) {
    return (
        <div className="product">
            <img src={img} alt={title} />
            <p>{title}</p>
            <div className="product-buttons">
                <button className="details-btn">Details</button>
                <button className="add-to-cart-btn">Add to cart</button>
            </div>
        </div>
    );
}

export default ProductCard;