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
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
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
      
      {/* Mouse Interactive Glow */}
      <div 
        className="mouse-glow" 
        style={{
          left: `${mousePosition.x}%`,
          top: `${mousePosition.y}%`
        }}
      ></div>

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

        {/* Social Links Grid with DNA Helix */}
        <div className="social-section-wrapper">
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

          {/* DNA Helix Animation */}
          <div className="dna-helix-container">
            <svg className="dna-helix" viewBox="0 0 200 400" preserveAspectRatio="xMidYMid meet">
              {/* Left strand */}
              <path
                className="dna-strand left-strand"
                d="M60,0 Q40,50 60,100 T60,200 T60,300 T60,400"
                fill="none"
                stroke="#00FF00"
                strokeWidth="3"
              />
              
              {/* Right strand */}
              <path
                className="dna-strand right-strand"
                d="M140,0 Q160,50 140,100 T140,200 T140,300 T140,400"
                fill="none"
                stroke="#00FF00"
                strokeWidth="3"
              />

              {/* Base pairs (rungs) */}
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((i) => {
                const y = i * 25 + 12.5;
                const offset = Math.sin((i * Math.PI) / 4) * 40;
                return (
                  <g key={i} className="base-pair" style={{ animationDelay: `${i * 0.1}s` }}>
                    <line
                      x1={100 - offset}
                      y1={y}
                      x2={100 + offset}
                      y2={y}
                      stroke="#00FF00"
                      strokeWidth="2"
                      opacity="0.6"
                    />
                    <circle
                      cx={100 - offset}
                      cy={y}
                      r="4"
                      fill="#00FF00"
                      className="dna-node"
                    />
                    <circle
                      cx={100 + offset}
                      cy={y}
                      r="4"
                      fill="#00FF00"
                      className="dna-node"
                    />
                  </g>
                );
              })}
            </svg>
          </div>
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
