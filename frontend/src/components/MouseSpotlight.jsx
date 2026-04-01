import React, { useEffect, useState } from 'react';
import './MouseSpotlight.css';

const MouseSpotlight = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      className="mouse-spotlight"
      style={{
        left: `${mousePosition.x}px`,
        top: `${mousePosition.y}px`,
      }}
    />
  );
};

export default MouseSpotlight;
