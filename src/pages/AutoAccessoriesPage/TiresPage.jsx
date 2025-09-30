import React from 'react';
import SectionHeader from '../../Card/SectionHeader'; 
import TireSearchForm from '../AutoAccessoriesPage/TireSearchForm'; 
import './TiresPage.css'; 

function TiresPage() {
    return (
        <div className="tires-page-wrapper">
            
            <SectionHeader title="ГУМИ" />
            
           
            <TireSearchForm />

            
            <div className="tire-results">
               
            </div>
        </div>
    );
}

export default TiresPage;