import React from 'react';

function FilterButton({ label, onClick }) {
    return (
        <button className="filter-button" onClick={onClick}>
            {label}
        </button>
    );
}

export default FilterButton;