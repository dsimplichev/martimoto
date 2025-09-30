import React, { useState, useMemo } from 'react';
import SectionHeader from '../../Card/SectionHeader'; 
import './MatsPage.css'; 
import { MATS_SEARCH_OPTIONS } from '../AutoAccessoriesPage/matsData'; 

function MatsPage() {
    
    const [brand, setBrand] = useState('Избери Марка');
    const [model, setModel] = useState('Избери Модел');
    const [material, setMaterial] = useState('Избери Материал');
    
    
    const brandOptions = Object.keys(MATS_SEARCH_OPTIONS.Марки);
    const materialOptions = MATS_SEARCH_OPTIONS.Материал || [];
    
    
    const modelOptions = useMemo(() => {
        return MATS_SEARCH_OPTIONS.Марки[brand] || [];
    }, [brand]);


    const handleBrandChange = (newBrand) => {
        setBrand(newBrand);
        setModel('Избери Модел'); 
    };

    const handleSearch = (e) => {
        e.preventDefault();
        
        if (brand === 'Избери Марка' || model === 'Избери Модел') {
            alert("Моля, изберете Марка и Модел на автомобила.");
            return;
        }

        console.log("Търсене на стелки по критерии:", {
            brand, 
            model, 
            material: material === 'Избери Материал' ? 'Всички' : material
        });

        
    };

    
    
    const renderSelect = (stateValue, setStateFunction, label, options) => {
        const key = label; 
        
        return (
            <div className="select-wrapper">
                <select 
                    value={stateValue} 
                    onChange={(e) => setStateFunction(e.target.value)} 
                    className="select-param"
                    
                    disabled={key === 'Модел' && brand === 'Избери Марка'}
                >
                    <option value={`Избери ${label}`} disabled>{label.toUpperCase()}</option>
                    
                    {options.map(v => <option key={v} value={v}>{v}</option>)}
                </select>
            </div>
        );
    };


    return (
        <div className="mats-page-container">
            
            <SectionHeader title="СТЕЛКИ" /> 
            
            <form onSubmit={handleSearch} className="search-form-new mats-search-form">
                
                
                {renderSelect(brand, handleBrandChange, 'Марка', brandOptions)}

                
                {renderSelect(model, setModel, 'Модел', modelOptions)}
                
                
                {renderSelect(material, setMaterial, 'Материал', materialOptions)}
                
                <button type="submit" className="search-mats-button-new">
                    ТЪРСЕНЕ
                </button>
            </form>

            <div className="mats-content">
                <p className="no-items-message">Няма добавени артикули в тази категория.</p>
            </div>
        </div>
    );
}

export default MatsPage;