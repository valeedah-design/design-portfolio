import React from 'react';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <section id="home" className="hero-section">
      <div className="hero-content">
        <div className="hero-left">
          <h1 className="welcome-text">\Welcome</h1>
          
          <div className="intro-section">
            <h2 className="greeting">Ciao, I'm Valeed</h2>
            
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
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop"
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