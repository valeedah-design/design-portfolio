import React, { useState, useEffect } from 'react';
import { Home, TrendingUp, Copy, Pen, Wifi } from 'lucide-react';
import './Portfolio.css';
import HeroSection from './HeroSection';
import TimelineSection from './TimelineSection';
import WorksPage from './WorksPage';
import AppIcons from './AppIcons';
import MouseSpotlight from './MouseSpotlight';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'timeline', 'works', 'app-icons'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="portfolio-container">
      {/* Mouse Spotlight Effect */}
      <MouseSpotlight />
      
      {/* Fixed Sidebar Navigation */}
      <nav className="sidebar-nav">
        <button
          className={`nav-icon ${activeSection === 'home' ? 'active' : ''}`}
          onClick={() => scrollToSection('home')}
          aria-label="Home"
        >
          <Home size={24} />
        </button>
        <button
          className={`nav-icon ${activeSection === 'timeline' ? 'active' : ''}`}
          onClick={() => scrollToSection('timeline')}
          aria-label="Timeline"
        >
          <TrendingUp size={24} />
        </button>
        <button 
          className={`nav-icon ${activeSection === 'works' ? 'active' : ''}`}
          onClick={() => scrollToSection('works')}
          aria-label="Works"
        >
          <Copy size={24} />
        </button>
        <button 
          className={`nav-icon ${activeSection === 'app-icons' ? 'active' : ''}`}
          onClick={() => scrollToSection('app-icons')}
          aria-label="App Icons"
        >
          <Pen size={24} />
        </button>
        <button className="nav-icon" aria-label="Contact">
          <Wifi size={24} />
        </button>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        <HeroSection />
        <TimelineSection />
        <WorksPage />
        <AppIcons />
      </main>
    </div>
  );
};

export default Portfolio;