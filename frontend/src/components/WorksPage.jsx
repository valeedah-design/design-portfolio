import React, { useState } from 'react';
import './WorksPage.css';

const worksData = {
  'Digital Designs': {
    'App Designs': [
      {
        id: 1,
        title: 'FOODQ',
        description: 'Bringing Food and People Together',
        tag: 'Case study',
        image: 'https://customer-assets.emergentagent.com/job_work-gallery-139/artifacts/7uckbj7f_iPhone%2016%20Pro%20mockup%20natural%20titanium.png',
        bgColor: 'green'
      },
      {
        id: 2,
        title: 'CCJournal',
        description: 'Find your career and passion',
        image: 'https://customer-assets.emergentagent.com/job_work-gallery-139/artifacts/hmaa12tg_jjjjj.png',
        bgColor: 'black'
      },
      {
        id: 3,
        title: 'The Guardian',
        description: 'Redesign of the news app',
        image: 'https://customer-assets.emergentagent.com/job_work-gallery-139/artifacts/zyxmw9wv_jjjjjjj.png',
        tags: ['Case study', 'Redesign'],
        bgColor: 'black'
      },
      {
        id: 4,
        title: 'Compocity',
        description: 'Foodwaste to compost',
        image: 'https://customer-assets.emergentagent.com/job_work-gallery-139/artifacts/d87y6hdm_comp.png',
        bgColor: 'black'
      },
      {
        id: 5,
        type: 'hire-me',
        title: 'This could be your app project',
        bgColor: 'hire'
      }
    ],
    'App Icons': [
      { id: 1, name: 'ADHD', image: 'https://customer-assets.emergentagent.com/job_work-gallery-139/artifacts/y1ednfmg_adhd.png' },
      { id: 2, name: 'BET', image: 'https://customer-assets.emergentagent.com/job_work-gallery-139/artifacts/cnzkwtka_bet.png' },
      { id: 3, name: 'CCJ', image: 'https://customer-assets.emergentagent.com/job_work-gallery-139/artifacts/8s6a6pof_ccj.png' },
      { id: 4, name: 'FOODQ', image: 'https://customer-assets.emergentagent.com/job_work-gallery-139/artifacts/8j5ldjts_foodq.png' }
    ],
    'Web Design': [
      {
        id: 1,
        title: 'Portfolio Website',
        description: 'Personal portfolio showcase',
        tag: 'Web',
        bgColor: 'black'
      },
      {
        id: 2,
        title: 'E-commerce Platform',
        description: 'Modern shopping experience',
        tag: 'Web',
        bgColor: 'black'
      },
      {
        id: 3,
        title: 'SaaS Dashboard',
        description: 'Analytics and insights',
        tag: 'Web',
        bgColor: 'black'
      },
      {
        id: 4,
        type: 'hire-me',
        title: 'This could be your web project',
        bgColor: 'hire'
      }
    ]
  },
  'Research Lab': [
    {
      id: 5,
      title: 'FEAST TO YOUR EYES : Postmortem',
      description: '',
      type: 'text',
      bgColor: 'transparent'
    },
    {
      id: 6,
      title: 'Card sorting experiment on Compocity app users',
      description: '',
      type: 'text',
      bgColor: 'transparent'
    }
  ]
};

const WorksPage = () => {
  const [activeCategory, setActiveCategory] = useState('Digital Designs');
  const [activeSubsection, setActiveSubsection] = useState('App Designs');
  const [hoveredIcon, setHoveredIcon] = useState(null);
  
  // Duplicate icons for seamless infinite loop
  const appIcons = worksData['Digital Designs']['App Icons'];
  const duplicatedIcons = [...appIcons, ...appIcons, ...appIcons];

  const renderDigitalDesignContent = () => {
    if (activeSubsection === 'App Designs') {
      return (
        <div className="projects-grid">
          {worksData['Digital Designs']['App Designs'].map((project) => (
            project.type === 'hire-me' ? (
              <div key={project.id} className="project-card hire-me-card">
                <div className="matrix-rain">
                  <div className="matrix-column" style={{left: '10%', animationDelay: '0s', animationDuration: '3s'}}>01010101</div>
                  <div className="matrix-column" style={{left: '25%', animationDelay: '0.5s', animationDuration: '2.5s'}}>10110010</div>
                  <div className="matrix-column" style={{left: '40%', animationDelay: '1s', animationDuration: '3.5s'}}>11001100</div>
                  <div className="matrix-column" style={{left: '55%', animationDelay: '0.3s', animationDuration: '2.8s'}}>01101110</div>
                  <div className="matrix-column" style={{left: '70%', animationDelay: '0.8s', animationDuration: '3.2s'}}>10011001</div>
                  <div className="matrix-column" style={{left: '85%', animationDelay: '0.2s', animationDuration: '2.7s'}}>11100011</div>
                </div>
                <div className="network-lines">
                  <svg className="network-svg" viewBox="0 0 400 300" preserveAspectRatio="none">
                    <line x1="50" y1="50" x2="200" y2="150" className="network-line" style={{animationDelay: '0s'}} />
                    <line x1="350" y1="80" x2="200" y2="150" className="network-line" style={{animationDelay: '0.3s'}} />
                    <line x1="100" y1="250" x2="200" y2="150" className="network-line" style={{animationDelay: '0.6s'}} />
                    <line x1="300" y1="250" x2="200" y2="150" className="network-line" style={{animationDelay: '0.9s'}} />
                    <circle cx="50" cy="50" r="3" className="network-node" style={{animationDelay: '0s'}} />
                    <circle cx="350" cy="80" r="3" className="network-node" style={{animationDelay: '0.3s'}} />
                    <circle cx="100" cy="250" r="3" className="network-node" style={{animationDelay: '0.6s'}} />
                    <circle cx="300" cy="250" r="3" className="network-node" style={{animationDelay: '0.9s'}} />
                  </svg>
                </div>
                <div className="hire-me-content">
                  <div className="plus-sign-container">
                    <div className="star-burst">
                      <div className="star" style={{transform: 'rotate(0deg)'}}>✦</div>
                      <div className="star" style={{transform: 'rotate(45deg)'}}>✦</div>
                      <div className="star" style={{transform: 'rotate(90deg)'}}>✦</div>
                      <div className="star" style={{transform: 'rotate(135deg)'}}>✦</div>
                      <div className="star" style={{transform: 'rotate(180deg)'}}>✦</div>
                      <div className="star" style={{transform: 'rotate(225deg)'}}>✦</div>
                      <div className="star" style={{transform: 'rotate(270deg)'}}>✦</div>
                      <div className="star" style={{transform: 'rotate(315deg)'}}>✦</div>
                    </div>
                    <div className="plus-sign">+</div>
                    <div className="plus-glow"></div>
                  </div>
                  <h3 className="hire-me-title">{project.title}</h3>
                  <p className="hire-me-subtitle">Let's create something amazing together</p>
                </div>
              </div>
            ) : (
              <div 
                key={project.id} 
                className={`project-card ${project.bgColor}`}
              >
                {project.tag && <span className="project-tag">{project.tag}</span>}
                {project.tags && project.tags.map((tag, index) => (
                  <span key={index} className="project-tag" style={{top: `${12 + (index * 35)}px`}}>{tag}</span>
                ))}
                <div className="project-image-wrapper">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="project-image"
                  />
                </div>
                <div className="project-info">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                </div>
              </div>
            )
          ))}
        </div>
      );
    } else if (activeSubsection === 'App Icons') {
      return (
        <div className="icons-marquee-container">
          <div className="icons-marquee">
            {duplicatedIcons.map((icon, index) => (
              <div
                key={`${icon.id}-${index}`}
                className={`icon-item ${hoveredIcon === `${icon.id}-${index}` ? 'hovered' : ''}`}
                onMouseEnter={() => setHoveredIcon(`${icon.id}-${index}`)}
                onMouseLeave={() => setHoveredIcon(null)}
              >
                <img 
                  src={icon.image} 
                  alt={icon.name}
                  className="icon-image"
                />
              </div>
            ))}
          </div>
        </div>
      );
    } else if (activeSubsection === 'Web Design') {
      return (
        <div className="projects-grid">
          {worksData['Digital Designs']['Web Design'].map((project) => (
            project.type === 'hire-me' ? (
              <div key={project.id} className="project-card hire-me-card">
                <div className="matrix-rain">
                  <div className="matrix-column" style={{left: '10%', animationDelay: '0s', animationDuration: '3s'}}>01010101</div>
                  <div className="matrix-column" style={{left: '25%', animationDelay: '0.5s', animationDuration: '2.5s'}}>10110010</div>
                  <div className="matrix-column" style={{left: '40%', animationDelay: '1s', animationDuration: '3.5s'}}>11001100</div>
                  <div className="matrix-column" style={{left: '55%', animationDelay: '0.3s', animationDuration: '2.8s'}}>01101110</div>
                  <div className="matrix-column" style={{left: '70%', animationDelay: '0.8s', animationDuration: '3.2s'}}>10011001</div>
                  <div className="matrix-column" style={{left: '85%', animationDelay: '0.2s', animationDuration: '2.7s'}}>11100011</div>
                </div>
                <div className="network-lines">
                  <svg className="network-svg" viewBox="0 0 400 300" preserveAspectRatio="none">
                    <line x1="50" y1="50" x2="200" y2="150" className="network-line" style={{animationDelay: '0s'}} />
                    <line x1="350" y1="80" x2="200" y2="150" className="network-line" style={{animationDelay: '0.3s'}} />
                    <line x1="100" y1="250" x2="200" y2="150" className="network-line" style={{animationDelay: '0.6s'}} />
                    <line x1="300" y1="250" x2="200" y2="150" className="network-line" style={{animationDelay: '0.9s'}} />
                    <circle cx="50" cy="50" r="3" className="network-node" style={{animationDelay: '0s'}} />
                    <circle cx="350" cy="80" r="3" className="network-node" style={{animationDelay: '0.3s'}} />
                    <circle cx="100" cy="250" r="3" className="network-node" style={{animationDelay: '0.6s'}} />
                    <circle cx="300" cy="250" r="3" className="network-node" style={{animationDelay: '0.9s'}} />
                  </svg>
                </div>
                <div className="hire-me-content">
                  <div className="plus-sign-container">
                    <div className="star-burst">
                      <div className="star" style={{transform: 'rotate(0deg)'}}>✦</div>
                      <div className="star" style={{transform: 'rotate(45deg)'}}>✦</div>
                      <div className="star" style={{transform: 'rotate(90deg)'}}>✦</div>
                      <div className="star" style={{transform: 'rotate(135deg)'}}>✦</div>
                      <div className="star" style={{transform: 'rotate(180deg)'}}>✦</div>
                      <div className="star" style={{transform: 'rotate(225deg)'}}>✦</div>
                      <div className="star" style={{transform: 'rotate(270deg)'}}>✦</div>
                      <div className="star" style={{transform: 'rotate(315deg)'}}>✦</div>
                    </div>
                    <div className="plus-sign">+</div>
                    <div className="plus-glow"></div>
                  </div>
                  <h3 className="hire-me-title">{project.title}</h3>
                  <p className="hire-me-subtitle">Let's build something great together</p>
                </div>
              </div>
            ) : (
              <div 
                key={project.id} 
                className={`project-card ${project.bgColor}`}
              >
                {project.tag && <span className="project-tag">{project.tag}</span>}
                <div className="project-info">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                </div>
              </div>
            )
          ))}
        </div>
      );
    }
  };

  const renderContent = () => {
    if (activeCategory === 'Digital Designs') {
      return (
        <>
          {/* Subsection Tabs for Digital Designs */}
          <div className="subsection-tabs">
            {Object.keys(worksData['Digital Designs']).map((subsection) => (
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
    } else {
      // Research Lab
      return (
        <div className="research-grid">
          {worksData['Research Lab'].map((project) => (
            <div key={project.id} className="research-card">
              <h3 className="research-title">{project.title}</h3>
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <section id="works" className="works-section">
      <h1 className="works-title">\works</h1>

      {/* Category Tabs */}
      <div className="category-tabs">
        {Object.keys(worksData).map((category) => (
          <button
            key={category}
            className={`category-tab ${activeCategory === category ? 'active' : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
            {activeCategory === category && <div className="tab-indicator"></div>}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="works-content">
        {renderContent()}
      </div>
    </section>
  );
};

export default WorksPage;
