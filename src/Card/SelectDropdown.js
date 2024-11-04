import React from 'react';

function SelectDropdown({ label, options, onChange, className }) {
    return (
        <div className={className} >
            <select onChange={onChange}>
                <option value="">{label}</option>
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default SelectDropdown;