import { Link } from "react-router-dom";
import "./accessories.css";
import SectionHeader from "../../Card/SectionHeader";
import AccessoryCategoryCard from "../../Card/AccessoryCategoryCard";

import balansior from "../../assets/balansior.png";
import krashtapi from "../../assets/krashtapi.png";
import garaj from "../../assets/garaj.png";
import lepenki from "../../assets/lepenki.png";
import rukohvatki from "../../assets/rukohvatki.png";

const accessoryCategories = [
    { img: balansior, name: "Балансьори", link: "/accessories/Балансьори" },
    { img: krashtapi, name: "Краш тапи", link: "/accessories/Краш-тапи" },
    { img: garaj, name: "Гараж", link: "/accessories/Гараж" },
    { img: lepenki, name: "Лепенки", link: "/accessories/Лепенки" },
    { img: rukohvatki, name: "Ръкохватки", link: "/accessories/Ръкохватки" },
];

function Accessories() {
    return (
        <div className="accessories-page">
            <SectionHeader title="Аксесоари" /> 
                
            <div className="accessory-categories-grid"> 
                {accessoryCategories.map((category, index) => (
                    <AccessoryCategoryCard
                        key={index}
                        image={category.img}
                        name={category.name}
                        linkTo={category.link}
                    />
                ))}
            </div>
        </div>
    );
}

export default Accessories;