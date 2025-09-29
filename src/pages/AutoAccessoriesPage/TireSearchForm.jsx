import React, { useState, useEffect } from 'react';
import { FaCar, FaTruck, FaDotCircle } from 'react-icons/fa';
import { RiSunFill, RiSnowyFill } from 'react-icons/ri';
import { FiCloudSnow } from 'react-icons/fi'; 
import './TireSearchForm.css';

import { TIRE_OPTIONS } from '../AutoAccessoriesPage/tireData'; 


function TireSearchForm() {
    
    
    const [tireType, setTireType] = useState('Автомобилни гуми');
    const [width, setWidth] = useState('Избери Широчина'); 
    const [ratio, setRatio] = useState('Избери Височина');  
    const [diameter, setDiameter] = useState('Избери Диаметър'); 
    const [brand, setBrand] = useState('Избери Марка'); 
    const [season, setSeason] = useState('Летни'); 
    const [hasDifferentRearSize, setHasDifferentRearSize] = useState(false);

    
    const currentOptions = TIRE_OPTIONS[tireType];

    
    useEffect(() => {
        setWidth('Избери Широчина');
        setRatio('Избери Височина');
        setDiameter('Избери Диаметър');
        setBrand('Избери Марка');
    }, [tireType]);
    
    
    const handleSearch = (e) => {
        e.preventDefault();
        console.log({
            tireType, width, ratio, diameter, brand, season, hasDifferentRearSize
        });
        alert(`Търсене на: ${tireType} | Размери: ${width}/${ratio}/${diameter} | Марка: ${brand} | Сезон: ${season}`);
    };

    
    const renderSelect = (stateValue, setStateFunction, label, key) => (
        <div className="select-wrapper">
            <select value={stateValue} onChange={(e) => setStateFunction(e.target.value)} className="select-param">
                <option value={`Избери ${label}`} disabled>{label.toUpperCase()}</option>
                
                {currentOptions[key].map(v => <option key={v} value={v}>{v}</option>)}
            </select>
        </div>
    );


    return (
        <div className="tire-search-container">
            <form onSubmit={handleSearch} className="search-form-new">

            
                <div className="tire-type-selection">
                    <div
                        className={`type-card ${tireType === '4X4' ? 'active' : ''}`}
                        onClick={() => setTireType('4X4')}
                    >
                        <FaDotCircle className="type-icon" />
                        <span>4X4</span>
                    </div>
                    <div
                        className={`type-card ${tireType === 'Автомобилни гуми' ? 'active' : ''}`}
                        onClick={() => setTireType('Автомобилни гуми')}
                    >
                        <FaCar className="type-icon" />
                        <span>Автомобилни гуми</span>
                    </div>
                    <div
                        className={`type-card ${tireType === 'Тежкотоварни гуми' ? 'active' : ''}`}
                        onClick={() => setTireType('Тежкотоварни гуми')}
                    >
                        <FaTruck className="type-icon" />
                        <span>Тежкотоварни гуми</span>
                    </div>
                </div>

                
                <div className="select-group main-params-new">
                    {renderSelect(width, setWidth, 'Широчина', 'width')}
                    {renderSelect(ratio, setRatio, 'Височина', 'ratio')}
                    {renderSelect(diameter, setDiameter, 'Диаметър', 'diameter')}
                </div>


                <div className="select-wrapper brand-select-wrapper">
                    <select value={brand} onChange={(e) => setBrand(e.target.value)} className="select-param brand-select-full">
                        <option value="Избери Марка" disabled>МАРКА</option>
                        
                        {currentOptions.brand.map(v => <option key={v} value={v}>{v}</option>)}
                    </select>
                </div>

                
                <div className="season-selection">
                    <button
                        type="button"
                        className={`season-button ${season === 'Всесезонни' ? 'active-season' : ''}`}
                        onClick={() => setSeason('Всесезонни')}
                    >
                        <FiCloudSnow className="season-icon all-season-icon" /> Всесезонни
                    </button>
                    <button
                        type="button"
                        className={`season-button ${season === 'Зимни' ? 'active-season' : ''}`}
                        onClick={() => setSeason('Зимни')}
                    >
                        <RiSnowyFill className="season-icon winter-icon" /> Зимни
                    </button>
                    <button
                        type="button"
                        className={`season-button ${season === 'Летни' ? 'active-season' : ''}`}
                        onClick={() => setSeason('Летни')}
                    >
                        <RiSunFill className="season-icon summer-icon" /> Летни
                    </button>
                </div>

                
                <button type="submit" className="search-button-new">
                    ТЪРСЕНЕ
                </button>
            </form>
        </div>
    );
}

export default TireSearchForm;