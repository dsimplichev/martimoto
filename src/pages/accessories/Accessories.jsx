import './accessories.css';
import balansior from "../../assets/balansior.png"
import krashtapi from "../../assets/krashtapi.png"
import garaj from "../../assets/garaj.png"
import lepenki from "../../assets/lepenki.png"
import rukohvatki from "../../assets/rukohvatki.png"

function Accessories() {
    return (
        <div className="accessories-page">
            <div className="header-section-acc">
            <h1>Аксесоари</h1>
            </div>
            <div className="divider-acc"></div>
            <div className="accessory-categories">
                <div className="category">
                    <img src={balansior} alt="Балансьори" className="category-image"/>
                    <p>Балансьори</p>
                    </div>
                <div className="category">
                    <img src={krashtapi}  alt="Краш тапи" className="category-image"/>
                    <p>Краш тапи</p>
                    </div>
                <div className="category">
                    <img src={garaj} alt="Гараж" className="category-image"/>
                    <p>Гараж</p>
                    </div>
                <div className="category">
                    <img src={lepenki} alt="Лепенки" className="category-image"/>
                    <p>Лепенки</p>
                    </div>
                <div className="category">
                    <img src={rukohvatki} alt="Ръкохватки" className="category-image" />
                    <p>Ръкохватки</p>
                    </div>
            </div>
        </div>
    );
}

export default Accessories;