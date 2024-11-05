import React from 'react';
import { useParams } from 'react-router-dom';
import './brandCategory.css';
import SelectDropdown from '../../Card/SelectDropdown';
import exhaust from '../../assets/CategoryIMG/exhaust.png'


const categories = [
    // { name: "Акумулатори", img: "path/to/акумулатори.jpg" },
    // { name: "Вериги", img: "path/to/вериги.jpg" },
    // { name: "Въздушни филтри", img: "path/to/въздушни_филтри.jpg" },
    // { name: "Запалителни свещи", img: "path/to/запалителни_свещи.jpg" },
    // { name: "Капаци за двигател", img: "path/to/капаци_за_двигател.jpg" },
    // { name: "Масла", img: "path/to/масла.jpg" },
    // { name: "Маслени филтри", img: "path/to/маслени_филтри.jpg" },
    { name: "Мото генерации", img: exhaust },
    // { name: "Мото гуми", img: "path/to/мото_гуми.jpg" },
    // { name: "Мото окачване", img: "path/to/мото_окачване.jpg" },
    // { name: "Мото радиатори", img: "path/to/мото_радиатори.jpg" },
    // { name: "Мото рогатки", img: "path/to/мото_рогатки.jpg" },
    // { name: "Накладки за мотор", img: "path/to/накладки_за_мотор.jpg" },
    // { name: "Спирачни дискове", img: "path/to/спирачни_дискове.jpg" },
    // { name: "Спирачни маркучи", img: "path/to/спирачни_маркучи.jpg" },
    // { name: "Спойлери за мотор", img: "path/to/спойлери_за_мотор.jpg" },
    // { name: "Съединители", img: "path/to/съединители.jpg" },
    // { name: "Части за двигател", img: "path/to/части_за_двигател.jpg" }
];

function BrandCategory() {
    const { brandName } = useParams();

    return (
        <div>
            
            <div className="search-now-brand">
                <div className="search-title-container-brand">
                    <h2 className="search-title-brand">SEARCH NOW</h2>
                </div>
                <form className="search-form-brand">
                    <SelectDropdown label="Year" options={[{ value: '2024', label: '2024' }, { value: '2023', label: '2023' }]} />
                    <SelectDropdown label="Make" options={[{ value: brandName, label: brandName }]} />
                    <SelectDropdown label="Model" options={[]} />
                    <button type="submit" className="search-button-brand">Search</button>
                </form>
            </div>

            <div className="category-grid-brand">
                {categories.map((category, index) => (
                    <div key={index} className="category-item-brand">
                    <img src={category.img} alt={category.name} className="category-image" />
                        <p>{category.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BrandCategory;