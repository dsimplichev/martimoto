
import React from "react";
import './PartsSearch.css';

function PartsSearch() {
    return (
        <div className="parts-search-container">
        <h2 className="search-title">SEARCH NOW</h2>

        <div className="filter-buttons">
            <button className="filter-button">NEW</button>
            <button className="filter-button">USED</button>
            <button className="filter-button">SHOP ALL</button>
        </div>

        <form className="search-form">
            <div className="form-group">
                
                <select id="make" name="make">
                    <option value="">Make</option>
                    <option value="make1">Make 1</option>
                    <option value="make2">Make 2</option>
                   
                </select>
            </div>

            <div className="form-group">
                
                <select id="model" name="model">
                    <option value="">Model</option>
                    <option value="model1">Model 1</option>
                    <option value="model2">Model 2</option>
                   
                </select>
            </div>

            <div className="form-group">
                
                <select id="year" name="year">
                    <option value="">Year</option>
                    <option value="2020">2020</option>
                    <option value="2021">2021</option>
                    
                </select>
            </div>

            <button type="submit" className="search-button">Search</button>
        </form>
    </div>
);
  
}

export default PartsSearch;