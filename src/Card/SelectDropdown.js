import React from 'react';

function SelectDropdown({ label, options, onChange }) {
    return (
        <div className="form-group">
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