import React, { useState } from 'react';
import './ServicesPage.css';

const ServicesPage = () => {
  const [hoveredService, setHoveredService] = useState(null);

  const services = [
    {
      id: 1,
      title: 'Mobile App Product Design',
      subtitle: 'iOS & Android',
      icon: 'mobile',
      description: 'Native experiences that users love',
      color: '#00FF00'
    },
    {
      id: 2,
      title: 'High-Conversion Landing Pages',
      subtitle: 'Responsive Web',
      icon: 'web',
      description: 'Websites that convert visitors to customers',
      color: '#39FF14'
    },
    {
      id: 3,
      title: 'Social Media Branding',
      subtitle: 'Strategic Asset Kits',
      icon: 'branding',
      description: 'Consistent brand presence across platforms',
      color: '#00FF00'
    },
    {
      id: 4,
      title: 'SaaS Dashboards',
      subtitle: 'Complex Data Platforms',
      icon: 'dashboard',
      description: 'Data visualization that drives decisions',
      color: '#39FF14'
    },
    {
      id: 5,
      title: 'Interactive Prototypes',
      subtitle: 'Investor-Ready Pitch Decks',
      icon: 'rocket',
      description: 'Prototypes that secure funding',
      color: '#00FF00'
    },
    {
      id: 6,
      title: 'Custom UI Systems',
      subtitle: 'Digital Handoff (Figma to HTML/CSS)',
      icon: 'code',
      description: 'Seamless designer-to-developer workflow',
      color: '#39FF14'
    }
  ];

  const renderIcon = (iconType) => {
    const iconProps = {
      width: "64",
      height: "64",
      viewBox: "0 0 64 64",
      fill: "none",
      stroke: "#00FF00",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    };

    switch(iconType) {
      case 'mobile':
        return (
          <svg {...iconProps} className="service-icon-svg icon-mobile">
            <rect x="18" y="8" width="28" height="48" rx="4" />
            <line x1="32" y1="50" x2="32" y2="50" strokeWidth="3" />
            <rect x="22" y="12" width="20" height="30" className="screen-pulse" />
          </svg>
        );
      
      case 'web':
        return (
          <svg {...iconProps} className="service-icon-svg icon-web">
            <circle cx="32" cy="32" r="20" className="globe-rotate" />
            <ellipse cx="32" cy="32" rx="8" ry="20" className="globe-rotate" />
            <line x1="12" y1="32" x2="52" y2="32" />
            <path d="M 32 12 Q 38 32 32 52" className="globe-path" />
            <path d="M 32 12 Q 26 32 32 52" className="globe-path" />
          </svg>
        );
      
      case 'branding':
        return (
          <svg {...iconProps} className="service-icon-svg icon-branding">
            <circle cx="32" cy="20" r="8" className="palette-circle" />
            <circle cx="20" cy="36" r="6" className="palette-circle" />
            <circle cx="44" cy="36" r="6" className="palette-circle" />
            <path d="M 32 28 L 26 32 L 32 48" className="brush-stroke" />
            <rect x="30" y="46" width="4" height="10" className="brush-handle" />
          </svg>
        );
      
      case 'dashboard':
        return (
          <svg {...iconProps} className="service-icon-svg icon-dashboard">
            <rect x="12" y="40" width="8" height="16" className="bar bar-1" />
            <rect x="24" y="28" width="8" height="28" className="bar bar-2" />
            <rect x="36" y="20" width="8" height="36" className="bar bar-3" />
            <rect x="48" y="32" width="8" height="24" className="bar bar-4" />
            <polyline points="16,24 28,16 40,20 52,12" className="trend-line" />
          </svg>
        );
      
      case 'rocket':
        return (
          <svg {...iconProps} className="service-icon-svg icon-rocket">
            <path d="M 32 10 L 38 30 L 48 40 L 40 42 L 32 52 L 24 42 L 16 40 L 26 30 Z" className="rocket-body" />
            <circle cx="32" cy="28" r="4" />
            <path d="M 24 42 L 20 52" className="flame flame-1" />
            <path d="M 32 52 L 32 58" className="flame flame-2" />
            <path d="M 40 42 L 44 52" className="flame flame-3" />
          </svg>
        );
      
      case 'code':
        return (
          <svg {...iconProps} className="service-icon-svg icon-code">
            <polyline points="20,20 12,32 20,44" className="code-bracket" />
            <polyline points="44,20 52,32 44,44" className="code-bracket" />
            <line x1="36" y1="20" x2="28" y2="44" className="code-slash" />
            <circle cx="24" cy="32" r="2" className="code-dot code-dot-1" />
            <circle cx="32" cy="32" r="2" className="code-dot code-dot-2" />
            <circle cx="40" cy="32" r="2" className="code-dot code-dot-3" />
          </svg>
        );
      
      default:
        return null;
    }
  };

  return (
    <section id="services" className="services-section">
      <div className="services-container">
        {/* Animated Background Grid */}
        <div className="services-grid-bg">
          {[...Array(20)].map((_, i) => (
            <div key={`grid-line-${i}`} className="grid-line" style={{ animationDelay: `${i * 0.1}s` }}></div>
          ))}
        </div>

        {/* Section Header */}
        <div className="services-header">
          <h1 className="services-title">
            <span className="glitch-text" data-text="\services">\services</span>
          </h1>
          <p className="services-subtitle">Crafting digital experiences that matter</p>
        </div>

        {/* Services Grid */}
        <div className="services-grid">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`service-card ${hoveredService === service.id ? 'hovered' : ''}`}
              onMouseEnter={() => setHoveredService(service.id)}
              onMouseLeave={() => setHoveredService(null)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Card Background Effects */}
              <div className="card-glow" style={{ '--glow-color': service.color }}></div>
              <div className="card-scanline"></div>
              
              {/* Corner Brackets */}
              <div className="corner corner-tl"></div>
              <div className="corner corner-tr"></div>
              <div className="corner corner-bl"></div>
              <div className="corner corner-br"></div>

              {/* Service Number */}
              <div className="service-number">
                <span className="number-prefix">//</span>
                {String(service.id).padStart(2, '0')}
              </div>

              {/* Icon */}
              <div className="service-icon">{renderIcon(service.icon)}</div>

              {/* Content */}
              <div className="service-content">
                <h3 className="service-title">{service.title}</h3>
                <p className="service-subtitle">{service.subtitle}</p>
                <div className="service-divider"></div>
                <p className="service-description">{service.description}</p>
              </div>

              {/* Hover Arrow */}
              <div className="service-arrow">→</div>

              {/* Animated Border */}
              <svg className="card-border" viewBox="0 0 100 100" preserveAspectRatio="none">
                <rect x="0" y="0" width="100" height="100" fill="none" stroke={service.color} strokeWidth="0.5" />
              </svg>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="services-cta">
          <div className="cta-line"></div>
          <p className="cta-text">
            Ready to bring your vision to life?
            <span className="cta-blink"> _</span>
          </p>
          <div className="cta-line"></div>
        </div>
      </div>
    </section>
  );
};

export default ServicesPage;
