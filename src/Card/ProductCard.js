import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../Context/CartContext';
import './product.css'



function ProductCard({ img, title, id, price, type }) {
    const navigate = useNavigate();
    const { addToCart } = useContext(CartContext);
    
    const handleNavigate = () => {
        if (type === 'part') {
            navigate(`/parts/detail/${id}`);
        } else {
            navigate(`/accessories/detail/${id}`);
        }
    };

    const handleAddToCart = () => {
        const product = {
            id: id,
            title: title,
            price: price,  
            image: img,         
        };

        addToCart(product); 
        alert('Продуктът беше добавен в количката!');
    };

    return (
        <div className="product">
            <img src={img} alt={title} />
            <p className='card-titel-product' >{title}</p>
            <div className="product-buttons">
                <button className="details-btn1" onClick={handleNavigate} >Разгледай</button>
                <button className="add-to-cart-btn1" onClick={handleAddToCart} >Добави в количка</button>
            </div>
        </div>
    );
}

export default ProductCard;