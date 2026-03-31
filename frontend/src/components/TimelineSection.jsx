import React, { useState } from 'react';
import './TimelineSection.css';

const timelineData = [
  {
    id: 1,
    year: 1996,
    title: 'Landed on earth',
    coordinates: '11.0430°N, 75.9273°E',
    position: 'right'
  },
  {
    id: 2,
    year: 1999,
    title: 'First day at School',
    coordinates: '11.0430°N, 75.9273°E',
    position: 'left'
  },
  {
    id: 3,
    year: 1996,
    title: 'Relocated to Riyadh, Saudi Arabia',
    coordinates: '11.0430°N, 75.9273°E',
    position: 'right'
  },
  {
    id: 4,
    year: 2013,
    title: 'Graduated senior higher secondary',
    coordinates: '11.0430°N, 75.9273°E',
    position: 'left'
  },
  {
    id: 5,
    year: 2013,
    title: 'Relocated to India',
    coordinates: '11.0430°N, 75.9273°E',
    position: 'right'
  },
  {
    id: 6,
    year: 2014,
    title: 'Got my driving license',
    coordinates: '11.0430°N, 75.9273°E',
    position: 'right'
  },
  {
    id: 7,
    year: 2014,
    title: 'Started Bachelors in University',
    coordinates: '11.0430°N, 75.9273°E',
    position: 'left'
  }
];

const TimelineSection = () => {
  const [hoveredItem, setHoveredItem] = useState(null);

  return (
    <section id="timeline" className="timeline-section">
      <div className="timeline-container">
        <div className="timeline-line"></div>
        
        {timelineData.map((item, index) => (
          <div
            key={item.id}
            className={`timeline-item ${item.position}`}
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <div className="timeline-marker">
              <div className={`marker-shape ${hoveredItem === item.id ? 'hovered' : ''}`}>
                {item.year}
              </div>
            </div>
            
            <div className="timeline-content">
              <div className="timeline-connector"></div>
              <div className="event-details">
                <h3 className="event-title">{item.title}</h3>
                <p className="event-coordinates">{item.coordinates}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TimelineSection;