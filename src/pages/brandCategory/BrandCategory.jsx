import React from 'react';
import { useParams } from 'react-router-dom';
import './brandCategory.css';
import SelectDropdown from '../../Card/SelectDropdown';
import exhaust from '../../assets/CategoryIMG/exhaust.png'
import battery from '../../assets/CategoryIMG/battery.png'
import chain from '../../assets/CategoryIMG/chain.png'
import filter from '../../assets/CategoryIMG/filter.png'
import plugs from '../../assets/CategoryIMG/plugs.png'
import cover from '../../assets/CategoryIMG/cover.png'
import oil from '../../assets/CategoryIMG/oil.png'
import oilfilter from '../../assets/CategoryIMG/oilfilter.png'
import tyres from '../../assets/CategoryIMG/tyres.png'
import suspension from '../../assets/CategoryIMG/suspension.png'
import radiator from '../../assets/CategoryIMG/radiator.png'
import rogatki from '../../assets/CategoryIMG/rogatki.png'
import pads from '../../assets/CategoryIMG/pads.png'
import disk from '../../assets/CategoryIMG/disk.png'
import markuchi from '../../assets/CategoryIMG/markuchi.png'
import spoileri from '../../assets/CategoryIMG/spoileri.png'
import clutch from '../../assets/CategoryIMG/clutch.png'
import engine from '../../assets/CategoryIMG/engine.png'


const categories = [
     { name: "Акумулатори", img: battery },
     { name: "Вериги", img: chain },
     { name: "Въздушни филтри", img: filter },
     { name: "Запалителни свещи", img: plugs },
     { name: "Капаци за двигател", img: cover },
     { name: "Масла", img: oil },
     { name: "Маслени филтри", img: oilfilter },
     { name: "Мото генерации", img: exhaust },
     { name: "Мото гуми", img: tyres },
     { name: "Мото окачване", img: suspension },
     { name: "Мото радиатори", img: radiator },
     { name: "Мото рогатки", img: rogatki },
     { name: "Накладки за мотор", img: pads },
     { name: "Спирачни дискове", img: disk},
     { name: "Спирачни маркучи", img: markuchi},
     { name: "Спойлери за мотор", img: spoileri },
     { name: "Съединители", img: clutch},
     { name: "Части за двигател", img: engine}
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