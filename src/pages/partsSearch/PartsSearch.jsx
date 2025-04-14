import React, { useState } from "react";
import './PartsSearch.css';

function PartsSearch() {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        console.log("Търсене на:", searchQuery);
    };

    return (
        <div className="parts-search-container">
            <div className="header-section2">
                <h2 className="title-parts-search">Потърси</h2>
                
            </div>
            <div className="divider-parts"></div>

            <form className="search-form" onSubmit={handleSearch}>
                <div className="search-input-container">
                    <input
                        type="text"
                        className="search-input2"
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