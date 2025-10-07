import React, { useState, useEffect, useContext } from 'react';
import SectionHeader from '../../Card/SectionHeader';
import axios from 'axios';
import './WiperFluidPage.css';
import { CartContext } from '../../Context/CartContext';

const MANUFACTURERS = ["Shell", "Castrol", "Total", "Liqui Moly"];
const PACKINGS = ["1L", "5L", "10L"];

function WiperFluidPage() {
    const [fluids, setFluids] = useState([]);
    const [manufacturer, setManufacturer] = useState('Избери Производител');
    const [packing, setPacking] = useState('Избери Разфасовка');
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        fetchFluids();
    }, []);

    const fetchFluids = async () => {
        try {

            const res = await axios.get('http://localhost:5000/api/wiper-fluid');
            setFluids(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        const filtered = fluids.filter(f =>

            (manufacturer === 'Избери Производител' || f.title.includes(manufacturer)) &&
            (packing === 'Избери Разфасовка' || f.volume === packing)
        );
        setFluids(filtered);
    };



    return (
        <div className="wiper-fluid-page-container">


            <SectionHeader title="ТЕЧНОСТ ЗА ЧИСТАЧКИ" />


            <form onSubmit={handleSearch} className="search-form-new">
                <div className="select-group main-params-new">
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

                <button type="submit" className="search-button-new">ТЪРСИ</button>
            </form>


            <div className="fluid-grid">
                {fluids.length === 0 ? (
                    <p>Няма добавени артикули...</p>
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
                                    / {(fluid.price / 1.95583).toFixed(2)} €
                                </span>
                            </div>


                            <div className="fluid-card-actions">
                                <button className="fluid-view-btn">ВИЖ ПОВЕЧЕ</button>

                                <button
                                    className="fluid-buy-btn"
                                    onClick={() => addToCart({
                                        ...fluid,
                                        image: fluid.images && fluid.images.length > 0
                                            ? fluid.images[0]
                                            : 'https://placehold.co/150x200/EEEEEE/AAAAAA?text=Fluid'
                                    })}
                                >
                                    <i className="fas fa-shopping-cart"></i> КУПИ
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