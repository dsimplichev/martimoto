import './accessories.css';

function Accessories() {
    return (
        <div className="accessories-page">
            <div className="header-section-acc">
            <h1>Аксесоари</h1>
            </div>
            <div className="divider-acc"></div>
            <div className="accessory-categories">
                <div className="category">
                    <img src="" alt="Балансьори" className="category-image"/>
                    <p>Балансьори</p>
                    </div>
                <div className="category">
                    <img src=""  alt="Краш тапи" className="category-image"/>
                    <p>Краш тапи</p>
                    </div>
                <div className="category">
                    <img src="" alt="Гараж" className="category-image"/>
                    <p>Гараж</p>
                    </div>
                <div className="category">
                    <img src="" alt="Лепенки" className="category-image"/>
                    <p>Лепенки</p>
                    </div>
                <div className="category">
                    <img src="" alt="Ръкохватки" className="category-image" />
                    <p>Ръкохватки</p>
                    </div>
            </div>
        </div>
    );
}

export default Accessories;