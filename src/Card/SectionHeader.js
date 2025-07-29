import React from 'react';
import './section-header.css';

function SectionHeader({ title, titleClassName = "general-header-title", dividerClassName = "section-header-divider", containerClassName = "general-header-container" }) {
    return (
        <div className={containerClassName}>
            <h1 className={titleClassName}>{title}</h1>
            <div className={dividerClassName}></div>
        </div>
    );
}

export default SectionHeader;
