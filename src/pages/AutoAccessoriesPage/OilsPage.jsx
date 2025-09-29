import React from 'react';
import AccessoryCategoryCard from '../../Card/AccessoryCategoryCard'; 
import SectionHeader from '../../Card/SectionHeader'; 
import './AutoAccessoriesPage.css'; 


import kolamasla from '../../assets/kolamasla.png'; 
import kamionmasla from '../../assets/kamionmasla.png'; 
import motorimasla from '../../assets/motorimasla.png';


const OIL_CATEGORIES = [ 
    {
        name: 'Масла за автомобили',
        image: kolamasla,
        linkTo: '/autosviat/masla/avtomobili'
    },
    {
        name: 'Масла за камиони',
        image: kamionmasla,
        linkTo: '/autosviat/masla/kamioni'
    },
    {
        name: 'Масла за мотори',
        image: motorimasla,
        linkTo: '/autosviat/masla/motori'
    },
];

function OilsPage() {
    return (
        <div className="auto-accessories-page-container">
            
            
            <SectionHeader title="МАСЛА" /> 

            <div className="categories-grid">
                
                {OIL_CATEGORIES.map((category) => (
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

export default OilsPage;