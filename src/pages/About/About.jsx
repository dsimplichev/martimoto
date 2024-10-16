import React from 'react';
import './about.css'; 
import about from "../../assets/about.png"


function About() {
  return (
    <div className="about-container">
      <div className="about-text">
        <h2>About Us</h2>
        <div className="divider"></div>
        <p>
          We are a company dedicated to providing the best second-hand motorcycle parts. 
          Our mission is to offer high-quality products at affordable prices, helping motorcycle enthusiasts to find the right parts for their bikes.
        </p>
        <p>
          Our journey started with a passion for motorcycles, and over the years we have grown to become a trusted source for parts across different brands and models.
        </p>
        <button className="get-in-touch-btn">Get in Touch</button> 
      </div>

      <div className="about-image">
        <img src={about} alt="About" />
      </div>
    </div>
  );
}

export default About;