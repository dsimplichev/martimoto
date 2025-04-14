import React from 'react';
import { useNavigate } from 'react-router-dom';
import './product.css'



function ProductCard({ img, title, id }) {
    const navigate = useNavigate();
    
    const handleNavigate = () => {
        navigate(`/accessories/detail/${id}`); 
    };

    return (
        <div className="product">
            <img src={img} alt={title} />
            <p>{title}</p>
            <div className="product-buttons">
                <button className="details-btn1" onClick={handleNavigate} >Разгледай</button>
                <button className="add-to-cart-btn1">Добави в количка</button>
            </div>
        </div>
    );
}

export default ProductCard;