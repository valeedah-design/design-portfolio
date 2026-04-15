import React, { useState } from 'react';
import './ServicesPage.css';

const ServicesPage = () => {
  const [hoveredService, setHoveredService] = useState(null);

  const services = [
    {
      id: 1,
      title: 'Mobile App Product Design',
      subtitle: 'iOS & Android',
      icon: '📱',
      description: 'Native experiences that users love',
      color: '#00FF00'
    },
    {
      id: 2,
      title: 'High-Conversion Landing Pages',
      subtitle: 'Responsive Web',
      icon: '🌐',
      description: 'Websites that convert visitors to customers',
      color: '#39FF14'
    },
    {
      id: 3,
      title: 'Social Media Branding',
      subtitle: 'Strategic Asset Kits',
      icon: '🎨',
      description: 'Consistent brand presence across platforms',
      color: '#00FF00'
    },
    {
      id: 4,
      title: 'SaaS Dashboards',
      subtitle: 'Complex Data Platforms',
      icon: '📊',
      description: 'Data visualization that drives decisions',
      color: '#39FF14'
    },
    {
      id: 5,
      title: 'Interactive Prototypes',
      subtitle: 'Investor-Ready Pitch Decks',
      icon: '🚀',
      description: 'Prototypes that secure funding',
      color: '#00FF00'
    },
    {
      id: 6,
      title: 'Custom UI Systems',
      subtitle: 'Digital Handoff (Figma to HTML/CSS)',
      icon: '⚡',
      description: 'Seamless designer-to-developer workflow',
      color: '#39FF14'
    }
  ];

  return (
    <section id="services" className="services-section">
      <div className="services-container">
        {/* Animated Background Grid */}
        <div className="services-grid-bg">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="grid-line" style={{ animationDelay: `${i * 0.1}s` }}></div>
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
              <div className="service-icon">{service.icon}</div>

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
