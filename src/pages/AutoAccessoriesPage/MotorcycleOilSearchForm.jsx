import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { FaShoppingCart } from 'react-icons/fa';
import './OilSearchForm.css';
import { DYNAMIC_OIL_OPTIONS } from '../AutoAccessoriesPage/oilData'; 
import SectionHeader from '../../Card/SectionHeader';
import dvgmotor from '../../assets/dvgmotor.png';
import trnmotor from '../../assets/trnmotor.png';
import vilka from '../../assets/vilka.png';
import { useNavigate } from "react-router-dom";
import { CartContext } from '../../Context/CartContext'; 

const OIL_OPTIONS = DYNAMIC_OIL_OPTIONS['Масла за мотори'];

function MotorcycleOilSearchForm() {

    const [oilType, setOilType] = useState('Двигателно масло');
    const [manufacturer, setManufacturer] = useState('Избери Производител');
    const [purpose, setPurpose] = useState('Избери Предназначение');
    const [viscosity, setViscosity] = useState('Избери Вискозитет');
    const [oilComposition, setOilComposition] = useState('Избери Тип масло'); 
    const [packing, setPacking] = useState('Избери Разфасовка');

    const [allOils, setAllOils] = useState([]); 
    const [displayedOils, setDisplayedOils] = useState([]); 

    // ⭐ Infinite scroll
    const [itemsToShow, setItemsToShow] = useState(9);
    const [isMobile, setIsMobile] = useState(false);

    const { addToCart } = useContext(CartContext);
    const navigate = useNavigate();

    const CATEGORY_MAP = {
        "Двигателно масло": "Двигателно масло",
        "Масло за скорости": "Масло за скорости",
        "Масло за вилка": "Масло за вилка"
    };

    const handleOilTypeChange = (newOilType) => {
        setOilType(newOilType);
        setManufacturer('Избери Производител');
        setPurpose('Избери Предназначение');
        setViscosity('Избери Вискозитет');
        setOilComposition('Избери Тип масло');
        setPacking('Избери Разфасовка');
    }

    const fetchOils = async (selectedType) => {
        try {
            const response = await axios.get("http://localhost:5000/api/oils");
            
            const motorcycleOils = response.data.filter(oil =>
                oil.vehicleType?.trim().toLowerCase() === "мотори" &&
                oil.oilCategory?.trim().toLowerCase() === CATEGORY_MAP[selectedType]?.trim().toLowerCase()
            );
            
            setAllOils(motorcycleOils);
            setDisplayedOils(motorcycleOils); 
            setItemsToShow(isMobile ? 6 : 9);
        } catch (err) {
            console.error('Грешка при зареждане на масла за мотори:', err);
            setAllOils([]);
            setDisplayedOils([]);
        }
    };

    useEffect(() => {
        fetchOils(oilType);
    }, [oilType, isMobile]);

    // ⭐ Device detection
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

    // ⭐ Infinite scroll
    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
                setItemsToShow(prev => Math.min(prev + (isMobile ? 6 : 9), displayedOils.length));
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [displayedOils, isMobile]);

    const normalizeValue = (value) => value?.toString().replace(/\s/g, '').trim().toLowerCase() || '';

    const handleSearch = (e) => {
        if (e) e.preventDefault();
        const searchManufacturer = normalizeValue(manufacturer);
        const searchPurpose = normalizeValue(purpose);
        const searchViscosity = normalizeValue(viscosity);
        const searchComposition = normalizeValue(oilComposition);
        const searchPacking = normalizeValue(packing);
        const defaultManufacturer = normalizeValue('Избери Производител');
        const defaultPurpose = normalizeValue('Избери Предназначение');
        const defaultViscosity = normalizeValue('Избери Вискозитет');
        const defaultComposition = normalizeValue('Избери Тип масло');
        const defaultPacking = normalizeValue('Избери Разфасовка');

        const filteredOils = allOils.filter(oil => {
            const manufacturerMatch = searchManufacturer === defaultManufacturer || normalizeValue(oil.brand) === searchManufacturer;
            const purposeMatch = searchPurpose === defaultPurpose || normalizeValue(oil.purpose) === searchPurpose;
            const viscosityMatch = searchViscosity === defaultViscosity || normalizeValue(oil.viscosity) === searchViscosity;
            const compositionMatch = searchComposition === defaultComposition || normalizeValue(oil.type) === searchComposition;
            const packingMatch = searchPacking === defaultPacking || normalizeValue(oil.volume) === searchPacking;
            return manufacturerMatch && purposeMatch && viscosityMatch && compositionMatch && packingMatch;
        });

        setDisplayedOils(filteredOils);
        setItemsToShow(isMobile ? 6 : 9);
    };

    const resetSearch = () => {
        setManufacturer('Избери Производител');
        setPurpose('Избери Предназначение');
        setViscosity('Избери Вискозитет');
        setOilComposition('Избери Тип масло'); 
        setPacking('Избери Разфасовка');
        setDisplayedOils(allOils);
        setItemsToShow(isMobile ? 6 : 9);
    }

    const handleAddToCart = (oil) => {
        const productForCart = {
            _id: oil._id,
            title: `${oil.brand} ${oil.viscosity} ${oil.volume}`,
            price: oil.price,
            image: oil.images?.[0] || '/placeholder.png',
            itemType: "oil",
            quantity: 1
        };
        addToCart(productForCart);
        console.log(`Продукт ${oil.brand} добавен в количката.`); 
    };

    const renderSelect = (stateValue, setStateFunction, label, key) => {
        const currentOptions = OIL_OPTIONS[oilType]?.[key] || [];
        return (
            <div className="select-wrapper">
                <select 
                    value={stateValue} 
                    onChange={(e) => setStateFunction(e.target.value)} 
                    className="select-param"
                >
                    <option value={`Избери ${label}`} disabled>{label.toUpperCase()}</option>
                    {currentOptions.map(v => <option key={v} value={v}>{v}</option>)}
                </select>
            </div>
        );
    };

    return (
        <div className="oil-search-container">
            <SectionHeader title="МАСЛА ЗА МОТОРИ" />

            <form onSubmit={handleSearch} className="search-form-new">
                <div className="oil-type-selection">
                    <div className={`type-card ${oilType === 'Двигателно масло' ? 'active' : ''}`} onClick={() => handleOilTypeChange('Двигателно масло')}>
                        <img src={dvgmotor} alt="Икона за Двигателно масло" className="type-icon" />
                        <span>Двигателно масло</span>
                    </div>
                    <div className={`type-card ${oilType === 'Масло за скорости' ? 'active' : ''}`} onClick={() => handleOilTypeChange('Масло за скорости')}>
                        <img src={trnmotor} alt="Икона за Масло за скорости" className="type-icon" />
                        <span>Масло за скорости</span>
                    </div>
                    <div className={`type-card ${oilType === 'Масло за вилка' ? 'active' : ''}`} onClick={() => handleOilTypeChange('Масло за вилка')}>
                        <img src={vilka} alt="Икона за Масло за вилка" className="type-icon" />
                        <span>Масло за вилка</span>
                    </div>
                </div>

                <div className="select-group main-params-new">
                    {renderSelect(manufacturer, setManufacturer, 'Производител', 'Производител')}
                    {renderSelect(purpose, setPurpose, 'Предназначение', 'Предназначение')}
                    {renderSelect(viscosity, setViscosity, 'Вискозитет', 'Вискозитет')}
                    {renderSelect(oilComposition, setOilComposition, 'Тип масло', 'Тип масло')}
                    {renderSelect(packing, setPacking, 'Разфасовка', 'Разфасовка')}
                </div>

                <div className="search-buttons-group">
                    <button type="submit" className="search-button-new">ТЪРСЕНЕ</button>
                    <button type="button" className="reset-button-new" onClick={resetSearch}>ПОКАЖИ ВСИЧКИ</button>
                </div>
            </form>

            <div className="oil-grid">
                {displayedOils.length === 0 ? (
                    <p className="no-oils-message">Няма налични масла, отговарящи на Вашите критерии.</p>
                ) : (
                    displayedOils.slice(0, itemsToShow).map(oil => (
                        <div key={oil._id} className="oil-card">
                            <div className="oil-image-wrapper">
                                <img
                                    src={oil.images?.[0] || 'https://placehold.co/150x150/EEEEEE/AAAAAA?text=OIL'}
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
                                    <span className="oil-detail-value">{oil.type || 'N/A'}</span>
                                </div>
                                <div className="oil-price-row">
                                    <span className="oil-price-bgn"><strong>{Number(oil.price).toFixed(2)} лв.</strong></span>
                                    <span className="oil-price-eur">/ {(Number(oil.price) / 1.95583).toFixed(2)} &euro;</span>
                                </div>
                            </div>
                            <div className="oil-card-actions">
                                <button className="oil-button view-details-button" onClick={() => navigate(`/motorcycle-oil/${oil._id}`)}>ВИЖ ПОВЕЧЕ</button>
                                <button className="oil-button buy-button" onClick={() => handleAddToCart(oil)}>
                                    <FaShoppingCart className="buy-icon" /> КУПИ
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default MotorcycleOilSearchForm;