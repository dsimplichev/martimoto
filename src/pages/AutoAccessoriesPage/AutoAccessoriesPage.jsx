import React from 'react';
import AccessoryCategoryCard from '../../Card/AccessoryCategoryCard'; 
import SectionHeader from '../../Card/SectionHeader'; 
import './AutoAccessoriesPage.css';

// Импортирайте изображенията (заместете с реалните пътища към вашите файлове)
import tiresImage from '../../assets/gumikola.png'; 
import oilsImage from '../../assets/масла.png';
import fluidImage from '../../assets/течност.png';
import matsImage from '../../assets/mats.png';

const CATEGORIES = [
    {
        name: 'Гуми',
        image: tiresImage,
        linkTo: '/autosviat/gumi'
    },
    {
        name: 'Масла',
        image: oilsImage,
        linkTo: '/autosviat/masla'
    },
    {
        name: 'Течност за чистачки',
        image: fluidImage,
        linkTo: '/autosviat/techosti-chistachki'
    },
    {
        name: 'Стелки',
        image: matsImage,
        linkTo: '/autosviat/stelki'
    },
];

function AutoAccessoriesPage() {
    return (
        <div className="auto-accessories-page-container">
            
           
            <SectionHeader title="АВТО АКСЕСОАРИ" />

            <div className="categories-grid">
                {CATEGORIES.map((category) => (
                    <AccessoryCategoryCard
                        key={category.name}
                        image={category.image}
                        name={category.name}
                        linkTo={category.linkTo}
                    />
                ))}
            </div>
        </div>
    );
}

export default AutoAccessoriesPage;