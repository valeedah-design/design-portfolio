import React, { useState } from 'react';
import './WorksPage.css';

const worksData = {
  'App Design': [
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
  const [activeCategory, setActiveCategory] = useState('App Design');

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

      {/* Projects Grid */}
      <div className={`projects-grid ${activeCategory === 'Research Lab' ? 'research-grid' : ''}`}>
        {worksData[activeCategory].map((project) => (
          project.type === 'text' ? (
            <div key={project.id} className="research-card">
              <h3 className="research-title">{project.title}</h3>
            </div>
          ) : (
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
          )
        ))}
      </div>
    </section>
  );
};

export default WorksPage;
