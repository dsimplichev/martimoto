import React, { useState } from 'react';
import './OilSearchForm.css'; 
import SectionHeader from '../../Card/SectionHeader'; 
import { OIL_OPTIONS } from '../AutoAccessoriesPage/oilData'; 

import dvgmaslo from '../../assets/dvgmaslo.png'; 
import transmitionoil from '../../assets/transmitionoil.png';
import wheeloil from '../../assets/wheeloil.png';


function OilSearchForm() {
    
    
    const [oilType, setOilType] = useState('Двигателно масло'); 
    const [manufacturer, setManufacturer] = useState('Избери Производител');
    const [viscosity, setViscosity] = useState('Избери Вискозитет');
    const [oilCategory, setOilCategory] = useState('Избери Тип масло'); 
    const [packing, setPacking] = useState('Избери Разфасовка');

    
    const handleOilTypeChange = (newOilType) => {
        setOilType(newOilType);
        setManufacturer('Избери Производител');
        setViscosity('Избери Вискозитет');
        setOilCategory('Избери Тип масло');
        setPacking('Избери Разфасовка');
    }

    
    const handleSearch = (e) => {
        e.preventDefault();
        console.log({
            oilType, manufacturer, viscosity, oilCategory, packing 
        });
        
        console.error(`Търсене на: ${oilType} | Филтри: ${manufacturer}, ${viscosity}, ${oilCategory}, ${packing}`);
    };

    
    
    const renderSelect = (stateValue, setStateFunction, label, key) => {
        
        const currentOptions = OIL_OPTIONS[oilType]?.[key] || [];

        return (
            <div className="select-wrapper">
                <select value={stateValue} onChange={(e) => setStateFunction(e.target.value)} className="select-param">
                    <option value={`Избери ${label}`} disabled>{label.toUpperCase()}</option>
                    
                    
                    
                    {currentOptions.map(v => <option key={v} value={v}>{v}</option>)}
                </select>
            </div>
        );
    };


    return (
        <div className="oil-search-container">
            <SectionHeader title="МАСЛА ЗА АВТОМОБИЛИ" /> 

            <form onSubmit={handleSearch} className="search-form-new">

                
                <div className="oil-type-selection">
                    <div
                        className={`type-card ${oilType === 'Двигателно масло' ? 'active' : ''}`}
                        onClick={() => handleOilTypeChange('Двигателно масло')} 
                    >
                        <img src={dvgmaslo} alt="Икона за Двигателно масло" className="type-icon" />
                        <span>Двигателно масло</span>
                    </div>
                    <div
                        className={`type-card ${oilType === 'Масло за скорости' ? 'active' : ''}`}
                        onClick={() => handleOilTypeChange('Масло за скорости')} 
                    >
                        <img src={transmitionoil} alt="Икона за Масло за скорости" className="type-icon" /> 
                        <span>Масло за скорости</span>
                    </div>
                    <div
                        className={`type-card ${oilType === 'Масло за хидравлика' ? 'active' : ''}`}
                        onClick={() => handleOilTypeChange('Масло за хидравлика')} 
                    >
                        <img src={wheeloil} alt="Икона за Масло за хидравлика" className="type-icon" /> 
                        <span>Масло за хидравлика</span>
                    </div>
                </div>

                
                <div className="select-group main-params-new">
                    
                    {renderSelect(manufacturer, setManufacturer, 'Производител', 'Производител')}
                    {renderSelect(viscosity, setViscosity, 'Вискозитет', 'Вискозитет')}
                    {renderSelect(oilCategory, setOilCategory, 'Тип масло', 'Тип масло')}
                    {renderSelect(packing, setPacking, 'Разфасовка', 'Разфасовка')}
                </div>


                
                <button type="submit" className="search-button-new">
                    ТЪРСЕНЕ
                </button>
            </form>
        </div>
    );
}

export default OilSearchForm;