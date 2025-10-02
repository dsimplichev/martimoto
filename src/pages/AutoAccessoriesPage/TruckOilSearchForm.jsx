import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './OilSearchForm.css';
import SectionHeader from '../../Card/SectionHeader'; 
import { OIL_OPTIONS_FLAT as OIL_OPTIONS } from '../AutoAccessoriesPage/oilData';
import dvgmaslo from '../../assets/dvgmaslo.png'; 
import transmitionoil from '../../assets/transmitionoil.png';
import wheeloil from '../../assets/wheeloil.png';

function TruckOilSearchForm() {
    const [oilType, setOilType] = useState('Двигателно масло'); 
    const [manufacturer, setManufacturer] = useState('Избери Производител');
    const [purpose, setPurpose] = useState('Избери Предназначение'); 
    const [viscosity, setViscosity] = useState('Избери Вискозитет');
    const [oilCategory, setOilCategory] = useState('Избери Тип масло'); 
    const [packing, setPacking] = useState('Избери Разфасовка');
    const [oils, setOils] = useState([]);

    const handleOilTypeChange = (newOilType) => {
        setOilType(newOilType);
        setManufacturer('Избери Производител');
        setPurpose('Избери Предназначение'); 
        setViscosity('Избери Вискозитет');
        setOilCategory('Избери Тип масло');
        setPacking('Избери Разфасовка');
    }

    const CATEGORY_MAP = {
        "Двигателно масло": "Двигателно масло",
        "Масло за скорости": "Скоростна кутия",
        "Масло за хидравлика": "Хидравлично масло"
    };

    const fetchOils = async (selectedType) => {
        try {
            const response = await axios.get("http://localhost:5000/api/oils");
            const truckOils = response.data.filter(oil => 
                oil.vehicleType === "Камиони" &&
                oil.oilCategory?.trim().toLowerCase() === CATEGORY_MAP[selectedType]?.trim().toLowerCase()
            );
            setOils(truckOils);
        } catch (err) {
            console.error('Грешка при зареждане на масла за камиони:', err);
        }
    };

    useEffect(() => {
        fetchOils(oilType);
    }, [oilType]);

    const handleSearch = (e) => {
        e.preventDefault();
        console.log({ oilType, manufacturer, purpose, viscosity, oilCategory, packing });
    };

    const renderSelect = (stateValue, setStateFunction, label, key) => {
        const currentOptions = OIL_OPTIONS['Масла за камиони']?.[oilType]?.[key] || [];
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
            <SectionHeader title="МАСЛА ЗА КАМИОНИ" /> 
            <form onSubmit={handleSearch} className="search-form-new">
                <div className="oil-type-selection">
                    <div className={`type-card ${oilType === 'Двигателно масло' ? 'active' : ''}`} onClick={() => handleOilTypeChange('Двигателно масло')}>
                        <img src={dvgmaslo} alt="Икона за Двигателно масло" className="type-icon" />
                        <span>Двигателно масло</span>
                    </div>
                    <div className={`type-card ${oilType === 'Масло за скорости' ? 'active' : ''}`} onClick={() => handleOilTypeChange('Масло за скорости')}>
                        <img src={transmitionoil} alt="Икона за Масло за скорости" className="type-icon" /> 
                        <span>Масло за скорости</span>
                    </div>
                    <div className={`type-card ${oilType === 'Масло за хидравлика' ? 'active' : ''}`} onClick={() => handleOilTypeChange('Масло за хидравлика')}>
                        <img src={wheeloil} alt="Икона за Масло за хидравлика" className="type-icon" /> 
                        <span>Масло за хидравлика</span>
                    </div>
                </div>

                <div className="select-group main-params-new">
                    {renderSelect(manufacturer, setManufacturer, 'Производител', 'Производител')}
                    {renderSelect(purpose, setPurpose, 'Предназначение', 'Предназначение')}
                    {renderSelect(viscosity, setViscosity, 'Вискозитет', 'Вискозитет')}
                    {renderSelect(oilCategory, setOilCategory, 'Тип масло', 'Тип масло')}
                    {renderSelect(packing, setPacking, 'Разфасовка', 'Разфасовка')}
                </div>

                <button type="submit" className="search-button-new">ТЪРСЕНЕ</button>
            </form>

            <div className="oil-grid">
                {oils.length === 0 ? (
                    <p>Няма налични масла.</p>
                ) : (
                    oils.map(oil => (
                        <div key={oil._id} className="oil-card">
                            <div className="oil-image-wrapper">
                                <img
                                    src={oil.images && oil.images.length > 0 ? oil.images[0] : 'https://placehold.co/150x150/EEEEEE/AAAAAA?text=OIL'}
                                    alt={oil.brand}
                                    className="oil-image"
                                />
                            </div>
                            <div className="oil-title">{oil.brand}</div>
                            <div className="oil-details">
                                <div className="oil-detail-row">
                                    <span className="oil-detail-label">Вискозитет:</span>
                                    <span className="oil-detail-value">{oil.viscosity}</span>
                                </div>
                                <div className="oil-detail-row">
                                    <span className="oil-detail-label">Разфасовка:</span>
                                    <span className="oil-detail-value">{oil.volume}</span>
                                </div>
                                <div className="oil-price-row">
                                    <span className="oil-price-bgn">
                                        <strong>{Number(oil.price).toFixed(2)} лв.</strong>
                                    </span>
                                    <span className="oil-price-eur">/ {(Number(oil.price) / 1.95583).toFixed(2)} €</span>
                                </div>
                            </div>

                            <div className="oil-card-actions">
                                <button className="oil-button view-details-button">ВИЖ ПОВЕЧЕ</button>
                                <button className="oil-button buy-button">
                                    <i className="fas fa-shopping-cart buy-icon"></i> КУПИ
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default TruckOilSearchForm;