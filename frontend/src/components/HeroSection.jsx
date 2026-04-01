import React from 'react';
import './HeroSection.css';
import MatrixGreeting from './MatrixGreeting';

const HeroSection = () => {
  return (
    <section id="home" className="hero-section">
      <div className="hero-content">
        <div className="hero-left">
          <h1 className="welcome-text">\Welcome</h1>
          
          <div className="intro-section">
            <MatrixGreeting />
            
            <div className="about-box">
              <h3 className="about-title">Who am I?</h3>
              <p className="about-description">
                Think of me as a debugger for bad user experiences. Let's fix some problems and make them pretty!
              </p>
              <button className="cta-button">Let me help you</button>
            </div>
          </div>
        </div>

        <div className="hero-right">
          <div className="profile-card">
            <div className="profile-image-wrapper">
              <img
                src="https://customer-assets.emergentagent.com/job_work-gallery-139/artifacts/0f16w011_photo_2023-06-26%2022.58.07.jpeg"
                alt="Valeed"
                className="profile-image"
              />
            </div>
          </div>
          <h2 className="brand-title">Wireframe Wizard</h2>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;