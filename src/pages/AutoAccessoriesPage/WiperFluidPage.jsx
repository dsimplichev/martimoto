import React, { useState, useEffect, useContext } from 'react';
import SectionHeader from '../../Card/SectionHeader';
import axios from 'axios';
import { FaShoppingCart } from 'react-icons/fa'; // Добавяме икона за количка
import './WiperFluidPage.css';
import { CartContext } from '../../Context/CartContext';
import { useNavigate } from "react-router-dom";

const MANUFACTURERS = ["Shell", "Castrol", "Total", "Liqui Moly"];
const PACKINGS = ["1L", "2L", "5L", "10L"];

function WiperFluidPage() {
    const [allFluids, setAllFluids] = useState([]); // Нов стейт: Съхранява всички заредени течности
    const [fluids, setFluids] = useState([]); // Съществуващ стейт: Съхранява филтрираните (показвани) течности
    const [manufacturer, setManufacturer] = useState('Избери Производител');
    const [packing, setPacking] = useState('Избери Разфасовка');
    const { addToCart } = useContext(CartContext);
    const navigate = useNavigate();

    useEffect(() => {
        fetchFluids();
    }, []);

    const fetchFluids = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/wiper-fluid');
            setAllFluids(res.data); // Записваме всички данни
            setFluids(res.data); // Показваме всички данни в началото
        } catch (err) {
            console.error(err);
        }
    };

    /**
     * Логика за филтриране (ТЪРСЕНЕ)
     */
    const handleSearch = (e) => {
        e.preventDefault();

        const filtered = allFluids.filter(f =>
            // Филтър по Производител
            (manufacturer === 'Избери Производител' || f.title.includes(manufacturer)) &&
            // Филтър по Разфасовка (volume)
            (packing === 'Избери Разфасовка' || f.volume === packing)
        );
        
        // Актуализираме само показвания списък
        setFluids(filtered);
    };

    /**
     * Логика за анулиране (ПОКАЖИ ВСИЧКИ)
     */
    const handleReset = () => {
        // 1. Нулираме стойностите на падащите менюта
        setManufacturer('Избери Производител');
        setPacking('Избери Разфасовка');

        // 2. Показваме отново целия списък с течности
        setFluids(allFluids);
    };

    // Обновена функция за добавяне в количката, за да използваме новата икона
    const handleAddToCart = (fluid) => {
        addToCart({
            ...fluid,
            image: fluid.images && fluid.images.length > 0
                ? fluid.images[0]
                : 'https://placehold.co/150x200/EEEEEE/AAAAAA?text=Fluid',
            itemType: "wiper-fluid",
            quantity: 1
        });
        console.log(`Продукт ${fluid.title} добавен в количката.`);
    };

    return (
        <div className="wiper-fluid-page-container">

            <SectionHeader title="ТЕЧНОСТ ЗА ЧИСТАЧКИ" />

            <form onSubmit={handleSearch} className="search-form-new">
                <div className="select-group main-params-new">
                    {/* Select за Производител */}
                    <div className="select-wrapper">
                        <select
                            value={manufacturer}
                            onChange={(e) => setManufacturer(e.target.value)}
                            className="select-param"
                        >
                            <option value="Избери Производител" disabled>Производител</option>
                            {MANUFACTURERS.map(m => <option key={m} value={m}>{m}</option>)}
                        </select>
                    </div>

                    
                    <div className="select-wrapper">
                        <select
                            value={packing}
                            onChange={(e) => setPacking(e.target.value)}
                            className="select-param"
                        >
                            <option value="Избери Разфасовка" disabled>Разфасовка</option>
                            {PACKINGS.map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                    </div>
                </div>

                <div className="search-buttons-group">
                    <button type="submit" className="search-button-new">ТЪРСИ</button>
                    <button type="button" onClick={handleReset} className="reset-button-new">ПОКАЖИ ВСИЧКИ</button> 
                </div>
            </form>


            <div className="fluid-grid">
                {fluids.length === 0 ? (
                    <p className="no-oils-message">Няма добавени артикули, отговарящи на Вашите критерии.</p>
                ) : (
                    fluids.map(fluid => (
                        <div key={fluid._id} className="fluid-card">

                            <div className="fluid-image-wrapper">
                                <img
                                    src={fluid.images && fluid.images.length > 0 ? fluid.images[0] : 'https://placehold.co/150x200/EEEEEE/AAAAAA?text=Fluid'}
                                    alt={fluid.title}
                                    className="fluid-image"
                                />
                            </div>

                            <div className="fluid-title">{fluid.title}</div>

                            <div className="fluid-details">
                                <div className="fluid-detail-row">
                                    <span className="fluid-detail-label">Литри:</span>
                                    <span className="fluid-detail-value">{fluid.volume}</span>
                                </div>
                            </div>

                            <div className="fluid-price-section">
                                <span className="fluid-price-bgn">
                                    <strong>{Number(fluid.price).toFixed(2)} лв.</strong>
                                </span>
                                <span className="fluid-price-eur">
                                    / {(fluid.price / 1.95583).toFixed(2)} &euro;
                                </span>
                            </div>

                            <div className="fluid-card-actions">
                                <button
                                    className="fluid-view-btn"
                                    onClick={() => navigate(`/wiper-fluid/${fluid._id}`)}
                                >
                                    ВИЖ ПОВЕЧЕ
                                </button>

                                <button
                                    className="fluid-buy-btn"
                                    onClick={() => handleAddToCart(fluid)}
                                >
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

export default WiperFluidPage;
