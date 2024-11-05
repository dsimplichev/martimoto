import React from 'react';
import { useParams } from 'react-router-dom';
import './brandCategory.css';
import SelectDropdown from '../../Card/SelectDropdown';

const categories = [
    "Акумулатори", "Вериги", "Въздушни филтри", "Запалителни свещи", 
    "Капаци за двигател", "Масла", "Маслени филтри", "Мото генерации", 
    "Мото гуми", "Мото окачване", "Мото радиатори", "Мото рогатки", 
    "Накладки за мотор", "Спирачни дискове", "Спирачни маркучи", 
    "Спойлери за мотор", "Съединители", "Части за двигател"
];

function BrandCategory() {
    const { brandName } = useParams();

    return (
        <div>
            <h1>All Categories for {brandName}</h1>

            <div className="search-now">
                <div className="search-title-container">
                    <h2 className="search-title">SEARCH NOW</h2>
                </div>
                <form className="search-form">
                    <SelectDropdown label="Year" options={[{ value: '2024', label: '2024' }, { value: '2023', label: '2023' }]} />
                    <SelectDropdown label="Make" options={[{ value: brandName, label: brandName }]} />
                    <SelectDropdown label="Model" options={[]} />
                    <button type="submit" className="search-button">Search</button>
                </form>
            </div>

            <div className="category-grid">
                {categories.map((category, index) => (
                    <div key={index} className="category-item">
                        <p>{category}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BrandCategory;