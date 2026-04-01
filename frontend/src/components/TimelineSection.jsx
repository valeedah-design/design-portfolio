import React, { useState } from 'react';
import './TimelineSection.css';

const timelineData = [
  {
    id: 1,
    type: 'year',
    year: 1996,
    position: 'center'
  },
  {
    id: 2,
    type: 'event',
    title: 'Landed on earth',
    coordinates: '11.0430°N, 75.9273°E',
    position: 'right',
    dotColor: 'green'
  },
  {
    id: 3,
    type: 'year',
    year: 1996,
    position: 'center'
  },
  {
    id: 4,
    type: 'event',
    title: 'Relocated to Riyadh, Saudi Arabia',
    coordinates: '11.0430°N, 75.9273°E',
    position: 'right',
    dotColor: 'green'
  },
  {
    id: 5,
    type: 'year',
    year: 1999,
    position: 'center'
  },
  {
    id: 6,
    type: 'event',
    title: 'First day at School',
    coordinates: '11.0430°N, 75.9273°E',
    position: 'left',
    dotColor: 'white'
  },
  {
    id: 7,
    type: 'year',
    year: 2012,
    position: 'center'
  },
  {
    id: 8,
    type: 'event',
    title: 'Relocated to India',
    coordinates: '11.0430°N, 75.9273°E',
    position: 'right',
    dotColor: 'green'
  },
  {
    id: 9,
    type: 'year',
    year: 2013,
    position: 'center'
  },
  {
    id: 10,
    type: 'event',
    title: 'Graduated senior higher secondary',
    coordinates: '11.0430°N, 75.9273°E',
    position: 'left',
    dotColor: 'white'
  },
  {
    id: 11,
    type: 'year',
    year: 2014,
    position: 'center'
  },
  {
    id: 12,
    type: 'event',
    title: 'Got my driving license',
    coordinates: '11.0430°N, 75.9273°E',
    position: 'right',
    dotColor: 'green'
  },
  {
    id: 13,
    type: 'year',
    year: 2014,
    position: 'center'
  },
  {
    id: 14,
    type: 'event',
    title: 'Started Bachelors in University',
    coordinates: '11.0430°N, 75.9273°E',
    position: 'left',
    dotColor: 'white'
  },
  {
    id: 15,
    type: 'year',
    year: 2018,
    position: 'center'
  },
  {
    id: 16,
    type: 'event',
    title: 'Graduated from Bachelors',
    coordinates: '11.0430°N, 75.9273°E',
    position: 'left',
    dotColor: 'white'
  },
  {
    id: 17,
    type: 'year',
    year: 2018,
    position: 'center'
  },
  {
    id: 18,
    type: 'event',
    title: 'Site Supervision Engineer',
    company: 'TC One Builders',
    coordinates: '11.0430°N, 75.9273°E',
    position: 'left',
    dotColor: 'white'
  },
  {
    id: 19,
    type: 'year',
    year: 2019,
    position: 'center'
  },
  {
    id: 20,
    type: 'event',
    title: 'Business Development Associate',
    company: 'Think & Learn Pvt Ltd',
    coordinates: '12.4997°N, 74.9870°E',
    position: 'left',
    dotColor: 'white'
  },
  {
    id: 21,
    type: 'year',
    year: 2020,
    position: 'center'
  },
  {
    id: 22,
    type: 'event',
    title: 'Moved to Napoli, Italy',
    coordinates: '40.8522°N, 14.2681°E',
    position: 'right',
    dotColor: 'green'
  },
  {
    id: 23,
    type: 'year',
    year: 2020,
    position: 'center'
  },
  {
    id: 24,
    type: 'event',
    title: 'Started Pursuing Master degree',
    company: 'University of Naples Federico II',
    coordinates: '40.8522°N, 14.2681°E',
    position: 'left',
    dotColor: 'white'
  },
  {
    id: 25,
    type: 'year',
    year: 2022,
    position: 'center'
  },
  {
    id: 26,
    type: 'event',
    title: 'Student',
    company: 'Apple Developer Academy',
    coordinates: '40.8359°N, 14.3039°E',
    position: 'left',
    dotColor: 'white'
  },
  {
    id: 27,
    type: 'year',
    year: 2024,
    position: 'center'
  },
  {
    id: 28,
    type: 'event',
    title: 'Relocated to Budapest, Hungary',
    coordinates: '47.4979°N, 19.0402°E',
    position: 'right',
    dotColor: 'green'
  },
  {
    id: 29,
    type: 'year',
    year: 2024,
    position: 'center'
  },
  {
    id: 30,
    type: 'event',
    title: 'UX Designer-Intern',
    company: 'Company HQ',
    coordinates: '47.4764°N, 19.0359°E',
    position: 'left',
    dotColor: 'white'
  },
  {
    id: 31,
    type: 'year',
    year: 2024,
    position: 'center'
  },
  {
    id: 32,
    type: 'event',
    title: 'Graduated in Masters',
    company: 'University of Naples Federico II',
    coordinates: '40.8522°N, 14.2681°E',
    position: 'left',
    dotColor: 'white'
  },
  {
    id: 33,
    type: 'year',
    year: 2025,
    position: 'center'
  },
  {
    id: 34,
    type: 'event',
    title: 'UX Designer',
    company: 'Flowerwork',
    coordinates: '47.4764°N, 19.0359°E',
    position: 'left',
    dotColor: 'white'
  },
  {
    id: 35,
    type: 'year',
    year: 2025,
    position: 'center'
  },
  {
    id: 36,
    type: 'event',
    title: 'PhD in ESTIMO',
    company: 'University of Naples Federico II',
    coordinates: '40.8522°N, 14.2681°E',
    position: 'left',
    dotColor: 'white'
  }
];

const TimelineSection = () => {
  const [hoveredItem, setHoveredItem] = useState(null);

  return (
    <section id="timeline" className="timeline-section">
      <h1 className="timeline-title">\Timeline</h1>
      <div className="timeline-container">
        <div className="timeline-line"></div>
        
        {timelineData.map((item, index) => {
          if (item.type === 'year') {
            return (
              <div
                key={item.id}
                className="timeline-year-marker"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="year-blob">
                  {item.year}
                </div>
              </div>
            );
          } else {
            return (
              <div
                key={item.id}
                className={`timeline-event ${item.position}`}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`event-dot ${item.dotColor} ${hoveredItem === item.id ? 'hovered' : ''}`}></div>
                <div className="event-connector"></div>
                <div className="event-content">
                  <h3 className="event-title">{item.title}</h3>
                  {item.company && (
                    <p className="event-company">{item.company}</p>
                  )}
                  {item.coordinates && (
                    <p className="event-coordinates">{item.coordinates}</p>
                  )}
                </div>
              </div>
            );
          }
        })}
      </div>
    </section>
  );
};

export default TimelineSection;