import React, { useState } from 'react';
import './TimelineSection.css';

const timelineData = [
  {
    id: 1,
    year: 1996,
    title: 'Landed on earth',
    coordinates: '11.0430°N, 75.9273°E',
    position: 'right',
    type: 'milestone'
  },
  {
    id: 2,
    year: 1996,
    title: 'Relocated to Riyadh, Saudi Arabia',
    coordinates: '11.0430°N, 75.9273°E',
    position: 'right',
    type: 'milestone'
  },
  {
    id: 3,
    year: 1999,
    title: 'First day at School',
    coordinates: '11.0430°N, 75.9273°E',
    position: 'left',
    type: 'milestone'
  },
  {
    id: 4,
    year: 2013,
    title: 'Relocated to India',
    coordinates: '11.0430°N, 75.9273°E',
    position: 'right',
    type: 'milestone'
  },
  {
    id: 5,
    year: 2013,
    title: 'Graduated senior higher secondary',
    coordinates: '11.0430°N, 75.9273°E',
    position: 'left',
    type: 'milestone'
  },
  {
    id: 6,
    year: 2014,
    title: 'Got my driving license',
    coordinates: '11.0430°N, 75.9273°E',
    position: 'right',
    type: 'milestone'
  },
  {
    id: 7,
    year: 2014,
    title: 'Started Bachelors in University',
    coordinates: '11.0430°N, 75.9273°E',
    position: 'left',
    type: 'milestone'
  },
  {
    id: 8,
    year: 2018,
    title: 'Site Supervision Engineer',
    company: 'TC One Builders',
    coordinates: '11.0430°N, 75.9273°E',
    position: 'left',
    type: 'work'
  },
  {
    id: 9,
    year: 2019,
    title: 'Graduated from university',
    coordinates: '11.0430°N, 75.9273°E',
    position: 'left',
    type: 'milestone'
  },
  {
    id: 10,
    year: 2019,
    title: 'Business Development Associate',
    company: 'Think & Learn Pvt Ltd',
    position: 'left',
    type: 'work'
  },
  {
    id: 11,
    year: 2020,
    title: 'Federico II',
    position: 'center',
    type: 'section'
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
            className={`timeline-item ${item.position} ${item.type || ''}`}
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
                {item.company && (
                  <p className="event-company">{item.company}</p>
                )}
                {item.coordinates && (
                  <p className="event-coordinates">{item.coordinates}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TimelineSection;