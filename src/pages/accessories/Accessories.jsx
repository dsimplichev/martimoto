import { Link } from "react-router-dom";
import "./accessories.css";
import SectionHeader from "../../Card/SectionHeader";

import balansior from "../../assets/balansior.png";
import krashtapi from "../../assets/krashtapi.png";
import garaj from "../../assets/garaj.png";
import lepenki from "../../assets/lepenki.png";
import rukohvatki from "../../assets/rukohvatki.png";

function Accessories() {
    return (
        <div className="accessories-page">
            <SectionHeader title="Аксесоари" /> 
                
            <div className="accessory-categories">
                <Link to="/accessories/Балансьори" className="category">
                    <img src={balansior} alt="Балансьори" className="category-image"/>
                    <p className="category-name">Балансьори</p>
                </Link>
                <Link to="/accessories/Краш-тапи" className="category">
                    <img src={krashtapi} alt="Краш тапи" className="category-image"/>
                    <p className="category-name">Краш тапи</p>
                </Link>
                <Link to="/accessories/Гараж" className="category">
                    <img src={garaj} alt="Гараж" className="category-image"/>
                    <p className="category-name">Гараж</p>
                </Link>
                <Link to="/accessories/Лепенки" className="category">
                    <img src={lepenki} alt="Лепенки" className="category-image"/>
                    <p className="category-name">Лепенки</p>
                </Link>
                <Link to="/accessories/Ръкохватки" className="category">
                    <img src={rukohvatki} alt="Ръкохватки" className="category-image"/>
                    <p className="category-name">Ръкохватки</p>
                </Link>
            </div>
        </div>
    );
}

export default Accessories;