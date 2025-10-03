import React, { useState, useEffect, useContext } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import './OilSearchForm.css';
import { OIL_OPTIONS_FLAT as OIL_OPTIONS } from '../AutoAccessoriesPage/oilData';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { CartContext } from '../../Context/CartContext';

import dvgmaslo from '../../assets/dvgmaslo.png';
import transmitionoil from '../../assets/transmitionoil.png';
import wheeloil from '../../assets/wheeloil.png';

function OilSearchForm() {
    const [oilType, setOilType] = useState('Двигателно масло'); // за бекенд
    const [optionsKey, setOptionsKey] = useState('Двигателно масло'); // за OIL_OPTIONS_FLAT
    const [manufacturer, setManufacturer] = useState('Избери Производител');
    const [viscosity, setViscosity] = useState('Избери Вискозитет');
    const [packing, setPacking] = useState('Избери Разфасовка');
    const [oils, setOils] = useState([]);

    const currentOptions = OIL_OPTIONS[optionsKey] || {};

    const CATEGORY_MAP = [
        { label: "Масло за двигатели", value: "Двигателно масло", img: dvgmaslo, optionsKey: "Двигателно масло" },
        { label: "Масло за скорости", value: "Скоростна кутия", img: transmitionoil, optionsKey: "Масло за скорости" },
        { label: "Масло за хидравлика", value: "Хидравлично масло", img: wheeloil, optionsKey: "Масло за хидравлика" },
    ];

    const fetchOils = async (category) => {
        try {
            const url = category 
                ? `http://localhost:5000/api/oils/category/${encodeURIComponent(category)}`
                : "http://localhost:5000/api/oils";

            const response = await axios.get(url);
            console.log('oils from backend:', response.data);
            setOils(response.data);
        } catch (err) {
            console.error('Грешка при зареждане на масла:', err);
        }
    };

    useEffect(() => {
        fetchOils(oilType);
    }, [oilType]);

    const handleSearch = (e) => {
        e.preventDefault();
        console.log({ oilType, manufacturer, viscosity, packing });
    };

    const renderSelect = (stateValue, setStateFunction, label, key) => {
        if (!currentOptions[key]) return null;
        return (
            <div className="select-wrapper">
                <select value={stateValue} onChange={(e) => setStateFunction(e.target.value)} className="select-param">
                    <option value={`Избери ${label}`} disabled>{label.toUpperCase()}</option>
                    {currentOptions[key].map(v => <option key={v} value={v}>{v}</option>)}
                </select>
            </div>
        );
    };

    return (
        <div className="oil-search-container">
            <form onSubmit={handleSearch} className="search-form-new">
                <div className="oil-type-selection">
                    {CATEGORY_MAP.map(cat => (
                        <div
                            key={cat.value}
                            className={`type-card ${oilType === cat.value ? 'active' : ''}`}
                            onClick={() => {
                                setOilType(cat.value);       
                                setOptionsKey(cat.optionsKey); 
                            }}
                        >
                            <img src={cat.img} alt={cat.label} className="type-icon" />
                            <span>{cat.label}</span>
                        </div>
                    ))}
                </div>

                <div className="select-group main-params-new">
                    {renderSelect(manufacturer, setManufacturer, 'Производител', 'Производител')}
                    {renderSelect(viscosity, setViscosity, 'Вискозитет', 'Вискозитет')}
                    {renderSelect(packing, setPacking, 'Разфасовка', 'Разфасовка')}
                </div>

                <button type="submit" className="search-button-new">
                    ТЪРСЕНЕ
                </button>
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

export default OilSearchForm;