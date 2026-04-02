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
        image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=800&fit=crop',
        bgColor: 'green'
      },
      {
        id: 2,
        title: 'CCJournal',
        description: 'Find your career and passion',
        image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=800&fit=crop',
        bgColor: 'black'
      },
      {
        id: 3,
        title: 'The Guardian',
        description: 'Redesign of the news app',
        image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&h=800&fit=crop',
        bgColor: 'black'
      },
      {
        id: 4,
        title: 'Compocity',
        description: 'Foodwaste to compost',
        image: 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=600&h=800&fit=crop',
        bgColor: 'black'
      }
    ],
    'App Icons': [
      { id: 1, name: 'ADHD', image: 'https://customer-assets.emergentagent.com/job_work-gallery-139/artifacts/y1ednfmg_adhd.png' },
      { id: 2, name: 'BET', image: 'https://customer-assets.emergentagent.com/job_work-gallery-139/artifacts/cnzkwtka_bet.png' },
      { id: 3, name: 'CCJ', image: 'https://customer-assets.emergentagent.com/job_work-gallery-139/artifacts/8s6a6pof_ccj.png' },
      { id: 4, name: 'FOODQ', image: 'https://customer-assets.emergentagent.com/job_work-gallery-139/artifacts/8j5ldjts_foodq.png' }
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
  const [hoveredIcon, setHoveredIcon] = useState(null);
  
  // Duplicate icons for seamless infinite loop
  const appIcons = worksData['Digital Designs']['App Icons'];
  const duplicatedIcons = [...appIcons, ...appIcons, ...appIcons];

  const renderContent = () => {
    if (activeCategory === 'Digital Designs') {
      return (
        <>
          {/* App Designs Section */}
          <div className="subsection">
            <h2 className="subsection-title">App Designs</h2>
            <div className="projects-grid">
              {worksData['Digital Designs']['App Designs'].map((project) => (
                <div 
                  key={project.id} 
                  className={`project-card ${project.bgColor}`}
                >
                  {project.tag && <span className="project-tag">{project.tag}</span>}
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
              ))}
            </div>
          </div>

          {/* App Icons Section */}
          <div className="subsection">
            <h2 className="subsection-title">App Icons</h2>
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
