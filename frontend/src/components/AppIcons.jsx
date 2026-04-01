import React, { useState } from 'react';
import './AppIcons.css';

// Placeholder data - replace with your actual icons
const iconsData = [
  { id: 1, name: 'FOODQ', category: 'Food & Social', color: '#39FF14' },
  { id: 2, name: 'CCJournal', category: 'Career & Education', color: '#00BFFF' },
  { id: 3, name: 'The Guardian', category: 'News & Media', color: '#FF6B6B' },
  { id: 4, name: 'Compocity', category: 'Sustainability', color: '#4ECDC4' },
  { id: 5, name: 'MindFlow', category: 'Productivity', color: '#FFD93D' },
  { id: 6, name: 'SnapFit', category: 'Health & Fitness', color: '#FF6FB5' },
  { id: 7, name: 'EcoTrack', category: 'Environment', color: '#95E1D3' },
  { id: 8, name: 'SoundWave', category: 'Music & Audio', color: '#A8E6CF' }
];

const AppIcons = () => {
  const [hoveredIcon, setHoveredIcon] = useState(null);

  return (
    <section id="app-icons" className="app-icons-section">
      <h1 className="icons-title">\app_icons</h1>
      <p className="icons-subtitle">Designed with passion, pixel by pixel</p>

      <div className="icons-grid">
        {iconsData.map((icon) => (
          <div
            key={icon.id}
            className="icon-frame"
            onMouseEnter={() => setHoveredIcon(icon.id)}
            onMouseLeave={() => setHoveredIcon(null)}
          >
            {/* 3D Frame Container */}
            <div className={`frame-3d ${hoveredIcon === icon.id ? 'hovered' : ''}`}>
              {/* Icon Display Area */}
              <div 
                className="icon-display"
                style={{ background: `linear-gradient(135deg, ${icon.color}DD, ${icon.color}AA)` }}
              >
                <div className="icon-placeholder">
                  <div className="icon-shape" style={{ borderColor: icon.color }}></div>
                  {/* Replace this with actual icon image: */}
                  {/* <img src={icon.imageUrl} alt={icon.name} className="icon-image" /> */}
                </div>
              </div>

              {/* Frame Border */}
              <div className="frame-border"></div>
              
              {/* Corner Accents */}
              <div className="corner corner-tl"></div>
              <div className="corner corner-tr"></div>
              <div className="corner corner-bl"></div>
              <div className="corner corner-br"></div>

              {/* Glow Effect */}
              <div className="frame-glow"></div>
            </div>

            {/* Icon Info */}
            <div className="icon-info">
              <h3 className="icon-name">{icon.name}</h3>
              <p className="icon-category">{icon.category}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AppIcons;
