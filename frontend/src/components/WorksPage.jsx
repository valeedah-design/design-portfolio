import React, { useState, useEffect } from 'react';
import './WorksPage.css';
import ContactModal from './ContactModal';

const HireMeCard = ({ title, subtitle, onClick }) => (
  <div
    className="project-card hire-me-card"
    onClick={onClick}
    role="button"
    tabIndex={0}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick();
      }
    }}
  >
    <div className="matrix-rain">
      <div className="matrix-column" style={{ left: '10%', animationDelay: '0s', animationDuration: '3s' }}>01010101</div>
      <div className="matrix-column" style={{ left: '25%', animationDelay: '0.5s', animationDuration: '2.5s' }}>10110010</div>
      <div className="matrix-column" style={{ left: '40%', animationDelay: '1s', animationDuration: '3.5s' }}>11001100</div>
      <div className="matrix-column" style={{ left: '55%', animationDelay: '0.3s', animationDuration: '2.8s' }}>01101110</div>
      <div className="matrix-column" style={{ left: '70%', animationDelay: '0.8s', animationDuration: '3.2s' }}>10011001</div>
      <div className="matrix-column" style={{ left: '85%', animationDelay: '0.2s', animationDuration: '2.7s' }}>11100011</div>
    </div>
    <div className="network-lines">
      <svg className="network-svg" viewBox="0 0 400 300" preserveAspectRatio="none">
        <line x1="50" y1="50" x2="200" y2="150" className="network-line" style={{ animationDelay: '0s' }} />
        <line x1="350" y1="80" x2="200" y2="150" className="network-line" style={{ animationDelay: '0.3s' }} />
        <line x1="100" y1="250" x2="200" y2="150" className="network-line" style={{ animationDelay: '0.6s' }} />
        <line x1="300" y1="250" x2="200" y2="150" className="network-line" style={{ animationDelay: '0.9s' }} />
        <circle cx="50" cy="50" r="3" className="network-node" style={{ animationDelay: '0s' }} />
        <circle cx="350" cy="80" r="3" className="network-node" style={{ animationDelay: '0.3s' }} />
        <circle cx="100" cy="250" r="3" className="network-node" style={{ animationDelay: '0.6s' }} />
        <circle cx="300" cy="250" r="3" className="network-node" style={{ animationDelay: '0.9s' }} />
      </svg>
    </div>
    <div className="hire-me-content">
      <div className="plus-sign-container">
        <div className="star-burst">
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <div className="star" key={deg} style={{ transform: `rotate(${deg}deg)` }}>✦</div>
          ))}
        </div>
        <div className="plus-sign">+</div>
        <div className="plus-glow"></div>
      </div>
      <h3 className="hire-me-title">{title}</h3>
      <p className="hire-me-subtitle">{subtitle}</p>
    </div>
  </div>
);

const WorksPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('Digital Designs');
  const [activeSubsection, setActiveSubsection] = useState('App Designs');
  const [hoveredIcon, setHoveredIcon] = useState(null);
  // Holds the service name when the contact modal is open, null when closed.
  const [enquiryService, setEnquiryService] = useState(null);

  useEffect(() => {
    fetch('/api/projects')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load projects');
        return res.json();
      })
      .then((data) => setProjects(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // Derive categories/subsections from whatever is actually in the data,
  // so adding a new category in the admin panel just works here.
  const categories = [...new Set(projects.map((p) => p.category))];
  if (categories.length === 0) categories.push('Digital Designs');

  const subsectionsForCategory = (category) =>
    [...new Set(projects.filter((p) => p.category === category && p.subsection).map((p) => p.subsection))];

  const projectsFor = (category, subsection) =>
    projects
      .filter((p) => p.category === category && (subsection ? p.subsection === subsection : !p.subsection))
      .sort((a, b) => (a.order || 0) - (b.order || 0));

  const appIcons = projectsFor('Digital Designs', 'App Icons');
  const duplicatedIcons = [...appIcons, ...appIcons, ...appIcons];

  const renderProjectGrid = (list, hireTitle, hireSubtitle, hireService) => (
    <div className="projects-grid">
      {list.map((project) => (
        <div key={project.id} className={`project-card ${project.bgColor || 'black'}`}>
          {project.tag && <span className="project-tag">{project.tag}</span>}
          {project.tags && project.tags.map((tag, idx) => (
            <span key={`${project.id}-tag-${tag}`} className="project-tag" style={{ top: `${12 + idx * 35}px` }}>{tag}</span>
          ))}
          {project.image && (
            <div className="project-image-wrapper">
              <img src={project.image} alt={project.title} className="project-image" />
            </div>
          )}
          <div className="project-info">
            <h3 className="project-title">{project.title}</h3>
            <p className="project-description">{project.description}</p>
          </div>
        </div>
      ))}
      <HireMeCard
        title={hireTitle}
        subtitle={hireSubtitle}
        onClick={() => setEnquiryService(hireService)}
      />
    </div>
  );

  const renderDigitalDesignContent = () => {
    if (activeSubsection === 'App Designs') {
      return renderProjectGrid(
        projectsFor('Digital Designs', 'App Designs'),
        'This could be your app project',
        "Let's create something amazing together",
        'App Design'
      );
    } else if (activeSubsection === 'App Icons') {
      return (
        <>
          <div className="icons-marquee-container">
            <div className="icons-marquee">
              {duplicatedIcons.map((icon, index) => (
                <div
                  key={`${icon.id}-${index}`}
                  className={`icon-item ${hoveredIcon === `${icon.id}-${index}` ? 'hovered' : ''}`}
                  onMouseEnter={() => setHoveredIcon(`${icon.id}-${index}`)}
                  onMouseLeave={() => setHoveredIcon(null)}
                >
                  <img src={icon.image} alt={icon.title} className="icon-image" />
                </div>
              ))}
            </div>
          </div>

          <div className="hire-me-icon-container">
            <div
              className="hire-me-icon"
              onClick={() => setEnquiryService('App Icon Design')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setEnquiryService('App Icon Design');
                }
              }}
            >
              <div className="hire-me-icon-plus">+</div>
              <div className="hire-me-icon-text">Your brand deserves its own spotlight</div>
            </div>
          </div>
        </>
      );
    } else if (activeSubsection === 'Web Design') {
      return renderProjectGrid(
        projectsFor('Digital Designs', 'Web Design'),
        'This could be your web project',
        "Let's build something great together",
        'Web Design'
      );
    }
    return null;
  };

  const renderContent = () => {
    if (activeCategory === 'Digital Designs') {
      const subsections = subsectionsForCategory('Digital Designs');
      return (
        <>
          <div className="subsection-tabs">
            {subsections.map((subsection) => (
              <button
                key={subsection}
                className={`subsection-tab ${activeSubsection === subsection ? 'active' : ''}`}
                onClick={() => setActiveSubsection(subsection)}
              >
                {subsection}
              </button>
            ))}
          </div>

          <div className="subsection-content">
            {renderDigitalDesignContent()}
          </div>
        </>
      );
    }

    // Any other category (e.g. Research Lab) renders as a simple text grid
    return (
      <div className="research-grid">
        {projectsFor(activeCategory, null).map((project) => (
          <div key={project.id} className="research-card">
            <h3 className="research-title">{project.title}</h3>
          </div>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <section id="works" className="works-section">
        <h1 className="works-title">\works</h1>
        <p style={{ color: 'rgba(255,255,255,0.6)' }}>Loading projects...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section id="works" className="works-section">
        <h1 className="works-title">\works</h1>
        <p style={{ color: 'rgba(255,255,255,0.6)' }}>Couldn't load projects right now.</p>
      </section>
    );
  }

  return (
    <section id="works" className="works-section">
      <h1 className="works-title">\works</h1>

      <div className="category-tabs">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-tab ${activeCategory === category ? 'active' : ''}`}
            onClick={() => {
              setActiveCategory(category);
              const firstSub = subsectionsForCategory(category)[0];
              if (firstSub) setActiveSubsection(firstSub);
            }}
          >
            {category}
            {activeCategory === category && <div className="tab-indicator"></div>}
          </button>
        ))}
      </div>

      <div className="works-content">
        {renderContent()}
      </div>

      {enquiryService && (
        <ContactModal
          service={enquiryService}
          onClose={() => setEnquiryService(null)}
        />
      )}
    </section>
  );
};

export default WorksPage;
