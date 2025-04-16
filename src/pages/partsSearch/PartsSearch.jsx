import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './PartsSearch.css';

function PartsSearch() {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/search-results?query=${searchQuery}`);
    };

    return (
        <div className="parts-search-container">
            <div className="header-section2">
                <h2 className="title-parts-search">Потърси</h2>
                
            </div>
            <div className="divider-parts"></div>

            <form className="search-form" onSubmit={handleSearch}>
                <div className="search-input-container">
                    <input className="search-input2"
                        type="text"
                       
                        placeholder="Намери лесно"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit" className="search-button">Търси</button>
                </div>
            </form>
        </div>
    );
}

export default PartsSearch;