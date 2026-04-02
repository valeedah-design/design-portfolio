import React, { useState, useEffect } from 'react';
import { Download, CheckCircle } from 'lucide-react';
import './ConnectPage.css';

const socialLinks = [
  {
    id: 'behance',
    name: 'Behance',
    icon: 'Be',
    url: 'https://www.behance.net/valeedah',
    color: '#1769FF',
    position: { x: 25, y: 30 }
  },
  {
    id: 'medium',
    name: 'Medium',
    icon: 'M',
    url: 'https://medium.com/@valeedah',
    color: '#00AB6C',
    position: { x: 75, y: 30 }
  },
  {
    id: 'linkedin',
    name: 'Linkedin',
    icon: 'in',
    url: 'https://www.linkedin.com/in/valeedah/',
    color: '#0A66C2',
    position: { x: 25, y: 70 }
  },
  {
    id: 'mail',
    name: 'Mail',
    icon: '✉',
    url: 'mailto:valeedah@gmail.com',
    color: '#EA4335',
    position: { x: 75, y: 70 }
  }
];

const ConnectPage = () => {
  const [hoveredButton, setHoveredButton] = useState(null);
  const [clickedButton, setClickedButton] = useState(null);
  const [typedText, setTypedText] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState([]);
  const fullText = 'Send a digital handshake! Connect on socials or download my CV to see the full player stats.';

  // Typing animation
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 30);

    return () => clearInterval(timer);
  }, []);

  // Mouse tracking for interactive glow
  useEffect(() => {
    const handleMouseMove = (e) => {
      const section = document.getElementById('connect');
      if (section) {
        const rect = section.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        setMousePosition({ x, y });
        
        // Add position to trail with timestamp
        const now = Date.now();
        setTrail(prevTrail => [
          ...prevTrail,
          { x, y, timestamp: now }
        ]);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Clean up old trail positions after 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setTrail(prevTrail => 
        prevTrail.filter(point => now - point.timestamp < 4000)
      );
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const handleClick = (id, url) => {
    setClickedButton(id);
    setTimeout(() => {
      window.open(url, '_blank');
      setClickedButton(null);
    }, 600);
  };

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = 'https://customer-assets.emergentagent.com/job_work-gallery-139/artifacts/irmcer3q_resume%20valeed.pdf';
    link.download = 'Valeed_Resume.pdf';
    link.target = '_blank';
    link.click();
  };

  return (
    <section id="connect" className="connect-section">
      {/* Breathing Glow Effect */}
      <div className="breathing-glow"></div>
      
      {/* Mouse Trail Drawing */}
      <svg className="mouse-trail" viewBox="0 0 100 100" preserveAspectRatio="none">
        {trail.length > 1 && trail.map((point, index) => {
          if (index === 0) return null;
          const prevPoint = trail[index - 1];
          const now = Date.now();
          const age = now - point.timestamp;
          const opacity = Math.max(0, 1 - (age / 4000)); // Fade over 4 seconds
          
          return (
            <line
              key={`${point.timestamp}-${index}`}
              x1={prevPoint.x}
              y1={prevPoint.y}
              x2={point.x}
              y2={point.y}
              stroke="#00FF00"
              strokeWidth="0.3"
              opacity={opacity}
              strokeLinecap="round"
            />
          );
        })}
        
        {/* Tail dot at cursor position */}
        {trail.length > 0 && (
          <circle
            cx={mousePosition.x}
            cy={mousePosition.y}
            r="0.5"
            fill="#00FF00"
            opacity="0.8"
            filter="url(#glow)"
          />
        )}
        
        {/* Glow filter definition */}
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="0.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
      </svg>

      <div className="connect-content">
        <h1 className="connect-title">\Connect_me</h1>

        {/* Availability Status */}
        <div className="availability-status">
          <div className="status-dot"></div>
          <span className="status-text">Available for opportunities</span>
        </div>

        <p className="connect-description">
          {typedText}
          <span className="cursor-blink">|</span>
        </p>

        {/* CV Download Button */}
        <button className="cv-download-btn" onClick={handleDownloadCV}>
          <Download size={20} />
          <span>Download CV</span>
          <div className="download-progress"></div>
        </button>

        {/* Social Links Grid */}
        <div className="social-grid">
          {socialLinks.map((social) => (
            <div
              key={social.id}
              className={`social-button ${hoveredButton === social.id ? 'hovered' : ''} ${clickedButton === social.id ? 'clicked' : ''}`}
              onMouseEnter={() => setHoveredButton(social.id)}
              onMouseLeave={() => setHoveredButton(null)}
              onClick={() => handleClick(social.id, social.url)}
            >
              <div className="social-icon-wrapper">
                <div className="social-icon" style={{ background: social.color }}>
                  {social.icon}
                </div>
                <div className="ripple"></div>
              </div>
              <h3 className="social-name">{social.name}</h3>
              
              {clickedButton === social.id && (
                <div className="connection-feedback">
                  <CheckCircle size={24} />
                  <span>Connected!</span>
                </div>
              )}

              {/* Hover pulse rings */}
              {hoveredButton === social.id && (
                <>
                  <div className="pulse-ring ring-1"></div>
                  <div className="pulse-ring ring-2"></div>
                  <div className="pulse-ring ring-3"></div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Quick Contact Info */}
        <div className="quick-contact">
          <p className="contact-info">
            <span className="label">Email:</span>
            <a href="mailto:valeed@example.com" className="contact-link">valeed@example.com</a>
          </p>
          <p className="contact-info">
            <span className="label">Location:</span>
            <span className="value">Budapest, Hungary 🇭🇺</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ConnectPage;
