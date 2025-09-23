import React, { useState } from 'react';
import './about.css';
import about from "../../assets/about.png"; 
import ContactForm from '../contact/ContactForm';

function About() {
  
  const [showContactForm, setShowContactForm] = useState(false);

  return (
    <div id="about-section" className="about-container">
      <div className="about-content">
        <h2 className="about-title">За нас</h2>
        <div className="divider-about"></div>
        <p className="about-text-p">
          Ние сме компания, посветена на предоставянето на най-добрите части втора употреба за мотоциклети. Нашата мисия е да предлагаме висококачествени продукти на достъпни цени, помагайки на мотоциклетните ентусиасти да намерят правилните части за техните машини.
        </p>
        <p className="about-text-p">
          Нашето пътешествие започна с голяма страст към мотоциклетите и през годините изградихме доверен източник за части от различни марки и модели.
        </p>
        
        <button className="get-in-touch-btn" onClick={() => setShowContactForm(true)}>Свържете се с нас</button>
      </div>

      
      {showContactForm && <ContactForm onClose={() => setShowContactForm(false)} />}
    </div>
  );
}

export default About;