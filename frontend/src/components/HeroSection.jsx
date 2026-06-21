import React, { useState, useEffect } from 'react';
import './HeroSection.css';
import MatrixGreeting from './MatrixGreeting';

const HeroSection = () => {
  const titles = [
    'UX Designer',
    'Wireframe Wizard',
    'Figma Ninja',
    'Interface Matchmaker'
  ];
  
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      
      setTimeout(() => {
        setCurrentTitleIndex((prevIndex) => (prevIndex + 1) % titles.length);
        setIsAnimating(false);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, [titles.length]);

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
                Think of me as a debugger for bad user experiences. Let&apos;s fix some problems and make them pretty!
              </p>
              <button className="cta-button">Let me help you</button>
            </div>
          </div>
        </div>

        <div className="hero-right">
          <div className="profile-card">
            <div className="profile-image-wrapper">
              <img
                src="https://customer-assets.emergentagent.com/job_work-gallery-139/artifacts/5oyuzxaw_DSC_2084.jpg"
                alt="Valeed"
                className="profile-image"
              />
            </div>
          </div>
          <h2 className={`brand-title ${isAnimating ? 'fade-out' : 'fade-in'}`}>
            {titles[currentTitleIndex]}
          </h2>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;