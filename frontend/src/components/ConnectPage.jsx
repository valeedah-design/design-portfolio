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
      {/* Connection lines canvas */}
      <svg className="connection-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
        {socialLinks.map((link, i) => 
          socialLinks.slice(i + 1).map((otherLink, j) => (
            <line
              key={`${link.id}-${otherLink.id}`}
              x1={link.position.x}
              y1={link.position.y}
              x2={otherLink.position.x}
              y2={otherLink.position.y}
              className={`connection-line ${hoveredButton === link.id || hoveredButton === otherLink.id ? 'active' : ''}`}
            />
          ))
        )}
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
