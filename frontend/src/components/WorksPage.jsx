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
      { id: 7, name: 'FOODQ', category: 'Food & Social', color: '#39FF14', type: 'icon' },
      { id: 8, name: 'CCJournal', category: 'Career & Education', color: '#00BFFF', type: 'icon' },
      { id: 9, name: 'The Guardian', category: 'News & Media', color: '#FF6B6B', type: 'icon' },
      { id: 10, name: 'Compocity', category: 'Sustainability', color: '#4ECDC4', type: 'icon' },
      { id: 11, name: 'MindFlow', category: 'Productivity', color: '#FFD93D', type: 'icon' },
      { id: 12, name: 'SnapFit', category: 'Health & Fitness', color: '#FF6FB5', type: 'icon' },
      { id: 13, name: 'EcoTrack', category: 'Environment', color: '#95E1D3', type: 'icon' },
      { id: 14, name: 'SoundWave', category: 'Music & Audio', color: '#A8E6CF', type: 'icon' }
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
            <div className="icons-grid">
              {worksData['Digital Designs']['App Icons'].map((project) => (
                <div
                  key={project.id}
                  className="icon-frame"
                  onMouseEnter={() => setHoveredIcon(project.id)}
                  onMouseLeave={() => setHoveredIcon(null)}
                >
                  <div className={`frame-3d ${hoveredIcon === project.id ? 'hovered' : ''}`}>
                    <div 
                      className="icon-display"
                      style={{ background: `linear-gradient(135deg, ${project.color}DD, ${project.color}AA)` }}
                    >
                      <div className="icon-placeholder">
                        <div className="icon-shape" style={{ borderColor: project.color }}></div>
                      </div>
                    </div>
                    <div className="frame-border"></div>
                    <div className="corner corner-tl"></div>
                    <div className="corner corner-tr"></div>
                    <div className="corner corner-bl"></div>
                    <div className="corner corner-br"></div>
                    <div className="frame-glow"></div>
                  </div>
                  <div className="icon-info">
                    <h3 className="icon-name">{project.name}</h3>
                    <p className="icon-category">{project.category}</p>
                  </div>
                </div>
              ))}
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
