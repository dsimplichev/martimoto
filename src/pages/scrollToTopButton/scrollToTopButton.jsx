import React, { useState, useEffect } from 'react';
import './ScrollToTopButton.css';
import { FaArrowUp, FaCookieBite } from "react-icons/fa";

function ScrollToTopButton() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <>
            <div
                className={`cookie-icon ${isVisible ? 'visible' : ''}`}
                title="Бисквитки"
            >
                <FaCookieBite />
            </div>

            <button
                className={`scroll-to-top ${isVisible ? 'visible' : ''}`}
                onClick={scrollToTop}
                aria-label="Scroll to top"
            >
                <FaArrowUp />
            </button>
        </>
    );
}

export default ScrollToTopButton;