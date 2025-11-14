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

const OIL_COMPOSITIONS = ["Синтетично", "Минерално", "Полусинтетично"];

function OilSearchForm() {
    const [oilType, setOilType] = useState('Двигателно масло');
    const [optionsKey, setOptionsKey] = useState('Двигателно масло');
    const [manufacturer, setManufacturer] = useState('Избери Производител');
    const [viscosity, setViscosity] = useState('Избери Вискозитет');
    const [packing, setPacking] = useState('Избери Разфасовка');
    const [oilComposition, setOilComposition] = useState('Избери Тип масло');
    const [allOils, setAllOils] = useState([]);
    const [displayedOils, setDisplayedOils] = useState([]);
    const [notification, setNotification] = useState('');
    const [itemsToShow, setItemsToShow] = useState(9);
    const [isMobile, setIsMobile] = useState(false);

    const { addToCart } = useContext(CartContext);
    const navigate = useNavigate();

    const CATEGORY_MAP = [
        { label: "Масло за двигатели", value: "Двигателно масло", img: dvgmaslo, optionsKey: "Двигателно масло" },
        { label: "Масло за скорости", value: "Скоростна кутия", img: transmitionoil, optionsKey: "Масло за скорости" },
        { label: "Масло за хидравлика", value: "Хидравлично масло", img: wheeloil, optionsKey: "Масло за хидравлика" },
    ];

    const currentOptions = OIL_OPTIONS[optionsKey] || {};

    
    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth <= 768;
            setIsMobile(mobile);
            setItemsToShow(mobile ? 6 : 9);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    
    const fetchOils = async (category) => {
        try {
            const url = category
                ? `http://localhost:5000/api/oils/category/${encodeURIComponent(category)}`
                : "http://localhost:5000/api/oils";

            const response = await axios.get(url);
            setAllOils(response.data);
            setDisplayedOils(response.data);
            setItemsToShow(isMobile ? 6 : 9);
        } catch (err) {
            setAllOils([]);
            setDisplayedOils([]);
        }
    };

    useEffect(() => {
        setManufacturer('Избери Производител');
        setViscosity('Избери Вискозитет');
        setPacking('Избери Разфасовка');
        setOilComposition('Избери Тип масло');
        fetchOils(oilType);
    }, [oilType]);

    
    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
                setItemsToShow(prev => Math.min(prev + (isMobile ? 6 : 9), displayedOils.length));
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [displayedOils, isMobile]);

    
    const handleAddToCart = (oil) => {
        const productForCart = {
            _id: oil._id,
            title: `${oil.brand} ${oil.viscosity} ${oil.volume}`,
            price: oil.price,
            image: oil.images?.length ? oil.images[0] : '/placeholder.png',
            itemType: "oil",
            quantity: 1
        };
        addToCart(productForCart);
        setNotification(`Продукт "${oil.brand}" е добавен в количката.`);
        setTimeout(() => setNotification(''), 3000);
    };

    const normalizeValue = (v) => v?.toString().replace(/\s/g, '').trim().toLowerCase() || '';

    
    const handleSearch = (e) => {
        if (e) e.preventDefault();

        const searchManufacturer = normalizeValue(manufacturer);
        const searchViscosity = normalizeValue(viscosity);
        const searchPacking = normalizeValue(packing);
        const searchComposition = normalizeValue(oilComposition);

        const defaultMan = normalizeValue('Избери Производител');
        const defaultVisc = normalizeValue('Избери Вискозитет');
        const defaultPack = normalizeValue('Избери Разфасовка');
        const defaultComp = normalizeValue('Избери Тип масло');

        const filteredOils = allOils.filter(oil => {
            const manufacturerMatch =
                searchManufacturer === defaultMan || normalizeValue(oil.brand) === searchManufacturer;
            const viscosityMatch =
                searchViscosity === defaultVisc || normalizeValue(oil.viscosity) === searchViscosity;
            const packingMatch =
                searchPacking === defaultPack || normalizeValue(oil.volume) === searchPacking;
            const compositionMatch =
                searchComposition === defaultComp || normalizeValue(oil.type) === searchComposition;
            return manufacturerMatch && viscosityMatch && packingMatch && compositionMatch;
        });

        setDisplayedOils(filteredOils);
        setItemsToShow(isMobile ? 6 : 9);
    };

    
    const resetSearch = () => {
        setManufacturer('Избери Производител');
        setViscosity('Избери Вискозитет');
        setPacking('Избери Разфасовка');
        setOilComposition('Избери Тип масло');
        setDisplayedOils(allOils);
        setItemsToShow(isMobile ? 6 : 9);
    };

    
    const renderSelect = (val, setVal, label, key) => {
        if (['Производител', 'Вискозитет', 'Разфасовка'].includes(key) && !currentOptions[key]) return null;
        const optionsList = key === 'Тип масло' ? OIL_COMPOSITIONS : (currentOptions[key] || []);
        return (
            <div className="select-wrapper">
                <select
                    value={val}
                    onChange={(e) => setVal(e.target.value)}
                    className="select-param"
                >
                    <option value={`Избери ${label}`} disabled>{label.toUpperCase()}</option>
                    {optionsList.map(v => <option key={v} value={v}>{v}</option>)}
                </select>
            </div>
        );
    };

    return (
        <div className="oil-search-container">
            {notification && <div className="cart-notification-center">{notification}</div>}

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
                    {renderSelect(oilComposition, setOilComposition, 'Тип масло', 'Тип масло')}
                </div>

                <div className="search-buttons-group">
                    <button type="submit" className="search-button-new">ТЪРСЕНЕ</button>
                    <button type="button" className="reset-button-new" onClick={resetSearch}>ПОКАЖИ ВСИЧКИ</button>
                </div>
            </form>

            <div className="oil-grid">
                {displayedOils.slice(0, itemsToShow).map(oil => (
                    <div key={oil._id} className="oil-card fade-in-up">
                        <div className="oil-image-wrapper">
                            <img
                                src={oil.images?.length ? oil.images[0] : 'https://placehold.co/150x150/EEEEEE/AAAAAA?text=OIL'}
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
                            <div className="oil-detail-row">
                                <span className="oil-detail-label">Тип:</span>
                                <span className="oil-detail-value">{oil.type}</span>
                            </div>
                            <div className="oil-price-row">
                                <span className="oil-price-bgn"><strong>{Number(oil.price).toFixed(2)} лв.</strong></span>
                                <span className="oil-price-eur">/ {(Number(oil.price) / 1.95583).toFixed(2)} €</span>
                            </div>
                        </div>
                        <div className="oil-card-actions">
                            <button className="oil-button view-details-button" onClick={() => navigate(`/oil/${oil._id}`)}>ВИЖ ПОВЕЧЕ</button>
                            <button className="oil-button buy-button" onClick={() => handleAddToCart(oil)}>
                                <FaShoppingCart className="buy-icon" /> КУПИ
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default OilSearchForm;