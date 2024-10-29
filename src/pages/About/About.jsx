import React, { useState } from 'react';
import './about.css'; 
import about from "../../assets/about.png"
import ContactForm from '../contact/ContactForm';


function About() {
  
  const [showContactForm, setShowContactForm] = useState(false);

    const handleOpenContactForm = () => setShowContactForm(true);
    const handleCloseContactForm = () => setShowContactForm(false);
  
  
  return (
    <div className="about-container">
      <div className="about-text">
        <h2>About Us</h2>
        <div className="divider-about"></div>
        <p>
          We are a company dedicated to providing the best second-hand motorcycle parts. 
          Our mission is to offer high-quality products at affordable prices, helping motorcycle enthusiasts to find the right parts for their bikes.
        </p>
        <p>
          Our journey started with a passion for motorcycles, and over the years we have grown to become a trusted source for parts across different brands and models.
        </p>
        <button className="get-in-touch-btn" onClick={handleOpenContactForm}>Get in Touch</button> 
        {showContactForm && <ContactForm onClose={handleCloseContactForm} />}
      </div>

      <div className="about-image">
        <img src={about} alt="About" />
      </div>
    </div>
  );
}

export default About;