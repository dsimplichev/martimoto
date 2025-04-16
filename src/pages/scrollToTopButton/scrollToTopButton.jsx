import React, { useState, useEffect } from 'react';
import './ScrollToTopButton.css'; 
import { FaArrowUp } from "react-icons/fa";

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

        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        isVisible && (
            <button className="scroll-to-top" onClick={scrollToTop} aria-label="Scroll to top">
               <FaArrowUp />
            </button>
        )
    );
}

export default ScrollToTopButton;