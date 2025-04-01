import React from 'react';
import './product.css'


function ProductCard({ img, title }) {
    return (
        <div className="product">
            <img src={img} alt={title} />
            <p>{title}</p>
            <div className="product-buttons">
                <button className="details-btn1">Разгледай</button>
                <button className="add-to-cart-btn1">Добави в количка</button>
            </div>
        </div>
    );
}

export default ProductCard;