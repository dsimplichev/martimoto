
import React, { useState } from "react";
import './PartsSearch.css';
import SelectDropdown from "../../Card/SelectDropdown";

function PartsSearch() {

    const makes = [
        { value: 'BMW', label: 'BMW' },
        { value: 'Yamaha', label: 'Yamaha' }
    ];

    const allModels = {
        'BMW': [{ value: 's1000rr', label: 'S1000RR' }, { value: 'f800gs', label: 'F800GS' }],
        'Yamaha': [{ value: 'r1', label: 'R1' }, { value: 'mt09', label: 'MT-09' }]
    };

    const years = [
        { value: '2024', label: '2024' },
        { value: '2023', label: '2023' }
    ];

    const [selectedMake, setSelectedMake] = useState("");
    const [filteredModels, setFilteredModels] = useState([]);

    const handleMakeChange = (make) => {
        setSelectedMake(make);
        setFilteredModels(allModels[make] || []);
    };

    return (
        <div className="parts-search-container">


            <div className="filter-buttons">
                <button className="filter-button">NEW</button>
                <button className="filter-button">USED</button>
                <button className="filter-button">SHOP ALL</button>
            </div>

            <div className="search-now">
                <div className="search-title-container">
                    <h2 className="search-title">SEARCH NOW</h2>
                </div>
                <form className="search-form">

                    <SelectDropdown
                        label="Year"
                        options={years}
                    />
                    <SelectDropdown
                        label="Make"
                        options={makes}
                        onChange={(e) => handleMakeChange(e.target.value)}
                    />
                    <SelectDropdown
                        label="Model"
                        options={filteredModels}
                    />
                    <button type="submit" className="search-button">Search</button>
                </form>
            </div>
        </div>
    );

}

export default PartsSearch;