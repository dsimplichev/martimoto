import React, { useState, useEffect, useMemo, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SectionHeader from '../../Card/SectionHeader';
import './MatsPage.css';
import { MATS_SEARCH_OPTIONS } from '../AutoAccessoriesPage/matsData';
import { FaShoppingCart } from 'react-icons/fa';
import { CartContext } from '../../Context/CartContext';

function MatsPage() {
    const [brand, setBrand] = useState('Избери Марка');
    const [model, setModel] = useState('Избери Модел');
    const [year, setYear] = useState('Избери Година');
    const [material, setMaterial] = useState('Избери Материал');
    const [mats, setMats] = useState([]);
    const [filteredMats, setFilteredMats] = useState([]);
    const [notification, setNotification] = useState("");

    const [itemsToShow, setItemsToShow] = useState(9);
    const [isMobile, setIsMobile] = useState(false);

    const navigate = useNavigate();
    const { addToCart } = useContext(CartContext);

    const brandOptions = Object.keys(MATS_SEARCH_OPTIONS.Марки);
    const materialOptions = MATS_SEARCH_OPTIONS.Материал || [];

    const modelOptions = useMemo(() => {
        const models = MATS_SEARCH_OPTIONS.Марки[brand] || [];
        return models.map(m => m.name || m);
    }, [brand]);

    const yearOptions = useMemo(() => {
        if (brand === 'Избери Марка' || model === 'Избери Модел') return [];
        const years = [];
        for (let y = 2025; y >= 1996; y--) {
            years.push(y.toString());
        }
        return years;
    }, [brand, model]);

    
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

    
    useEffect(() => {
        const fetchMats = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/mats');
                setMats(response.data);
                setFilteredMats(response.data);
                setItemsToShow(isMobile ? 6 : 9);
            } catch (err) {
                console.error('Грешка при зареждане на стелки:', err);
            }
        };
        fetchMats();
    }, [isMobile]);

    
    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
                setItemsToShow(prev => Math.min(prev + (isMobile ? 6 : 9), filteredMats.length));
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [filteredMats, isMobile]);

    const handleBuyClick = (mat) => {
        const item = {
            _id: mat._id,
            title: mat.title,
            price: Number(mat.price),
            quantity: 1,
            image: mat.images?.[0] || 'https://placehold.co/400x300?text=No+Image',
            itemType: "mat",
        };
        addToCart(item);
        setNotification(`Продукт "${mat.title}" беше добавен в количката.`);
        setTimeout(() => setNotification(""), 3000);
    };

    const handleDetailsClick = (matId) => {
        navigate(`/mats/${matId}`);
    };

    const handleSearch = (e) => {
        if (e) e.preventDefault();

        if (model !== 'Избери Модел' && brand === 'Избери Марка') {
            alert('Моля, изберете Марка, за да изберете Модел.');
            return;
        }

        if (year !== 'Избери Година' && (brand === 'Избери Марка' || model === 'Избери Модел')) {
            alert('Моля, изберете Марка и Модел, за да изберете Година.');
            return;
        }

        const results = mats.filter((mat) => {
            const brandMatch = brand === 'Избери Марка' || mat.carBrand === brand;
            const modelMatch = model === 'Избери Модел' || mat.carModel === model;
            const yearMatch = year === 'Избери Година' || mat.carYear === year;
            const materialMatch = material === 'Избери Материал' || mat.material === material;
            return brandMatch && modelMatch && yearMatch && materialMatch;
        });

        setFilteredMats(results);
        setItemsToShow(isMobile ? 6 : 9);

        if (results.length === 0) {
            setNotification("Няма намерени артикули според зададените критерии.");
        } else {
            setNotification("");
        }
    };

    const resetSearch = () => {
        setBrand('Избери Марка');
        setModel('Избери Модел');
        setYear('Избери Година');
        setMaterial('Избери Материал');
        setFilteredMats(mats);
        setItemsToShow(isMobile ? 6 : 9);
        setNotification("");
    };

    const renderSelect = (stateValue, setStateFunction, label, options) => {
        let isDisabled = false;
        if (label === 'Модел' && brand === 'Избери Марка') isDisabled = true;
        if (label === 'Година' && (brand === 'Избери Марка' || model === 'Избери Модел')) isDisabled = true;

        return (
            <div className="select-wrapper">
                <select
                    value={stateValue}
                    onChange={(e) => setStateFunction(e.target.value)}
                    className="select-param"
                    disabled={isDisabled}
                >
                    <option value={`Избери ${label}`} disabled>
                        {label.toUpperCase()}
                    </option>
                    {options.map((v) => <option key={v} value={v}>{v}</option>)}
                </select>
            </div>
        );
    };

    return (
        <div className="mats-page-container">
            <SectionHeader title="СТЕЛКИ" />
            {notification && <div className="cart-notification-center">{notification}</div>}

            <form onSubmit={handleSearch} className="search-form-new mats-search-form">
                {renderSelect(brand, setBrand, 'Марка', brandOptions)}
                {renderSelect(model, setModel, 'Модел', modelOptions)}
                {renderSelect(year, setYear, 'Година', yearOptions)}
                {renderSelect(material, setMaterial, 'Материал', materialOptions)}

                <div className="search-buttons-group">
                    <button type="submit" className="search-mats-button-new">ТЪРСЕНЕ</button>
                    <button type="button" className="reset-mats-button" onClick={resetSearch}>ПОКАЖИ ВСИЧКИ</button>
                </div>
            </form>

            <div className="mats-content">
                {filteredMats.length === 0 ? (
                    <p className="no-items-message">Няма намерени артикули според зададените критерии.</p>
                ) : (
                    <div className="mats-grid">
                        {filteredMats.slice(0, itemsToShow).map((mat) => (
                            <div key={mat._id} className="mat-card">
                                <img
                                    src={mat.images?.[0] || 'https://placehold.co/400x300?text=No+Image'}
                                    alt={mat.title}
                                    className="mat-image"
                                />
                                <h3 title={mat.title}>{mat.title}</h3>
                                <p><strong>Марка:</strong> {mat.carBrand}</p>
                                <p><strong>Модел:</strong> {mat.carModel}</p>
                                <p><strong>Година:</strong> {mat.carYear || 'N/A'}</p>
                                <p><strong>Материал:</strong> {mat.material}</p>
                                <div className="mats-price-row">
                                    <span className="mats-price-bgn"><strong>{Number(mat.price).toFixed(2)} лв.</strong></span>
                                    <span className="mats-price-eur">/ {(Number(mat.price) / 1.95583).toFixed(2)} €</span>
                                </div>
                                <div className="mat-buttons-container">
                                    <button className="mat-button-details" onClick={() => handleDetailsClick(mat._id)}>Виж Повече</button>
                                    <button className="mat-button-buy" onClick={() => handleBuyClick(mat)}>
                                        <FaShoppingCart className="mats-buy-icon" /> Купи
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default MatsPage;