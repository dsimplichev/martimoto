import React from 'react';
import ProductCard from '../../Card/ProductCard';
import './lastproduct.css'; 
import yamahalights from '../../assets/yamahalights.png'; // Добави импортирането на снимките
import dunlop from '../../assets/dunlop.png';
import brakes from '../../assets/brakes.png';
import Akrapovic from '../../assets/Akrapovic.png';


 const products = [
    { img: yamahalights, title: "Yamaha Lights" },
    { img: dunlop, title: "Dunlop Tyres" },
    { img: brakes, title: "Brake Disc EBC" },
    { img: Akrapovic, title: "Exaust Akrapovic" },
  
];


function LastProduct() {
    return (
        <div className="container">
            <div className="header-section">
                <h2 className="title">Last Products</h2>
            </div>

            <div className="divider"></div>

            <div className="products-grid">
                {products.map((product, index) => (
                    <ProductCard key={index} img={product.img} title={product.title} />
                ))}
            </div>
        </div>
    );
}

export default LastProduct;